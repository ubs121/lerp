// Copyright 2013 ubs121
package mongo

import (
	"encoding/json"
	"errors"
	"fmt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"io/ioutil"
	"log"
	"reflect"
	"regexp"
	"strings"
	"time"
)

type (
	DbArgs struct {
		Collection string
		Query      bson.M
		Sort       []string
		Select     bson.M
		Skip       int
		Limit      int
		Data       bson.M
	}

	JsArgs struct {
		Id     string
		Params bson.M
		Src    string
	}

	AggregateArgs struct {
		Collection string
		Pipeline   []bson.D
	}

	MapReduceArgs struct {
		Collection string
		Query      bson.M
		Map        string
		Reduce     string
	}
)

const (
	DbName string = "lerp"
)

var (
	mgoSession *mgo.Session
	_db        *mgo.Database
	Cols       []string = []string{
		"Post", "PlusGroup", "Event", "Survey",
		"Employee", "Contract", "Job", "Dept", "Applicant", "Personal", "Career",
		"Attendance", "Leave", "Appraisal", "Training",
		"File", "Page",
		"Report",
		"User"}
)

func Open() {
	if mgoSession == nil {
		var err error
		if mgoSession, err = mgo.Dial(conf.Conf["DbHost"]); err != nil {
			log.Printf(conf.Conf["DbHost"]+" өгөгдлийн сервертэй холбогдоход алдаа гарлаа!: %v", err)
			panic(errors.New(conf.Conf["DbHost"] + " Өгөгдлийн сантай холбогдоход алдаа гарлаа!"))
		}
		mgoSession.SetSafe(&mgo.Safe{})
		// Optional. Switch the session to a monotonic behavior.
		mgoSession.SetMode(mgo.Monotonic, true)
	}

	_db = mgoSession.Clone().DB(DbName)
}

func C(col string) *mgo.Collection {
	return _db.C(col)
}

func Contains(list []string, elem string) bool {
	for _, t := range list {
		if t == elem {
			return true
		}
	}
	return false
}

func CollectionList(w http.ResponseWriter, r *http.Request) {
	rpc.WriteJson(r, w, Cols, nil)
}

// Бичлэгийн тоо
func Count(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var n int
	var err error

	c := _db.C(vars["collection"])
	q := bson.M{}

	if r.Method == "GET" {
		// n, err = c.Find(q).Count()
	} else {
		args := DbArgs{}
		rpc.ReadJson(r, &args)

		q = args.Query
	}

	// тоолох үйлдэл дээр мөн дүрийн filter хамаатай
	onFind(q, w, r)

	n, err = c.Find(q).Count()

	rpc.WriteJson(r, w, n, err)
}

/// Хайх
func Find(w http.ResponseWriter, r *http.Request) {
	var err error
	// параметр
	vars := mux.Vars(r)
	args := DbArgs{}
	rpc.ReadJson(r, &args)

	c := _db.C(vars["collection"])

	if args.Query == nil {
		args.Query = bson.M{}
	}

	onFind(args.Query, w, r)

	q := c.Find(args.Query)

	// select
	if args.Select != nil {
		q.Select(args.Select)
	}

	// skip
	if args.Skip > 0 {
		q.Skip(args.Skip)
	}

	// limit
	if args.Limit > 0 {
		q.Limit(args.Limit)
	}

	// sort
	if len(args.Sort) > 0 {
		q.Sort(args.Sort...)
	}

	var resp []bson.M
	err = q.All(&resp)

	//log.Printf("db.Find(%v) алдаа: %v", args, err)
	rpc.WriteJson(r, w, resp, err)
}

/// Нэгийг хайх
func FindOne(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)
	args := DbArgs{}
	if err = rpc.ReadJson(r, &args); err != nil {
		rpc.WriteJson(r, w, nil, err)
		return
	}

	c := _db.C(vars["collection"])
	q := c.Find(args.Query)

	// select
	if args.Select != nil {
		q.Select(args.Select)
	}

	var resp bson.M
	err = q.One(&resp)

	rpc.WriteJson(r, w, resp, err)
}

// Id-аар хайх
func FindId(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	c := _db.C(vars["collection"])
	q := c.FindId(vars["id"])

	var resp bson.M
	err = q.One(&resp)

	rpc.WriteJson(r, w, resp, err)
}

func Aggregate(w http.ResponseWriter, r *http.Request) {
	var err error
	var resp []bson.M

	args := AggregateArgs{}
	err = rpc.ReadJson(r, &args)

	if err == nil {
		c := _db.C(args.Collection)
		pipe := c.Pipe(args.Pipeline)

		err = pipe.All(&resp)
	}

	rpc.WriteJson(r, w, resp, err)
}

func MapReduce(w http.ResponseWriter, r *http.Request) {
	var err error
	var resp []bson.M

	args := MapReduceArgs{}
	err = rpc.ReadJson(r, &args)

	if err == nil {

		job := &mgo.MapReduce{
			Map:    args.Map,
			Reduce: args.Reduce,
		}

		c := _db.C(args.Collection)
		_, err = c.Find(args.Query).MapReduce(job, &resp)
	}

	rpc.WriteJson(r, w, resp, err)
}

/// обектын tags талбарыг шинэчилнэ
func UpdateTags(obj bson.M) {
	tags := []string{}
	for k, _ := range obj {
		if obj[k] == nil {
			continue
		}

		if k == "_id" || k == "Type" || k == "LastName" || k == "Company" || k == "Job" || k == "Dept" {
			tags = append(tags, strings.ToLower(obj[k].(string)))
		} else if k == "Employee" { // reference fields
			if reflect.TypeOf(obj[k]).Kind() == reflect.Map {
				obj1 := obj[k].(map[string]interface{})
				if obj1["_id"] != nil {
					tags = append(tags, strings.ToLower(obj1["_id"].(string)))
				}
				if obj1["Name"] != nil {
					tags = append(tags, strings.ToLower(obj1["Name"].(string)))
				}
			}
			/*
				 else {
					tags = append(tags, strings.ToLower(obj[k].(string)))
				}*/
		} else if k == "Name" || k == "FullName" || k == "Notes" || k == "Description" || k == "Text" {
			vals := regexp.MustCompile(`[,\.\r\n\t\s\(\)\:]`).Split(obj[k].(string), -1)
			// strings.Fields(obj[k].(string))
			for _, s := range vals {
				if len(s) > 2 {
					tags = append(tags, strings.ToLower(s))
				}
			}
		} else if strings.HasSuffix(k, "Phone") {
			tags = append(tags, obj[k].(string))
		}
	}

	obj["tags"] = tags
}

func _save(op string, w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)
	obj := bson.M{}
	if err = rpc.ReadJson(r, &obj); err != nil {
		rpc.WriteJson(r, w, nil, err)
		return
	}

	obj["updated"] = time.Now().String()[:19]
	obj["updatedBy"] = r.Header.Get("User")

	onSave(vars["collection"], obj, w, r)

	// TODO: foreign key талбарууд шинэчилэх

	// tags шинэчилэх
	UpdateTags(obj)

	c := _db.C(vars["collection"])

	if op == "save" {
		if obj["_id"] != nil {
			_, err = c.UpsertId(obj["_id"], obj)
		} else {
			obj["_id"] = bson.NewObjectId().Hex()
			err = c.Insert(obj)
		}
	} else if op == "insert" {
		obj["_id"] = bson.NewObjectId().Hex()
		err = c.Insert(obj)
	} else if op == "update" {
		//delete(obj, "_id")
		err = c.UpdateId(obj["_id"], obj)
	}

	rpc.WriteJson(r, w, obj["_id"], err)
}

/// Id-аар шалгаад байхгүй бол Insert, байвал Update
func Save(w http.ResponseWriter, r *http.Request) {
	_save("save", w, r)
}

/// Шинээр нэмэх
func Insert(w http.ResponseWriter, r *http.Request) {
	_save("insert", w, r)
}

/// Засах
func Update(w http.ResponseWriter, r *http.Request) {
	_save("update", w, r)
}

// Id-аар устгах
func Delete(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	c := _db.C(vars["collection"])
	err = c.Remove(bson.M{"_id": vars["id"]})

	rpc.WriteJson(r, w, vars["id"], err)
}

func ExecJS1(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	params := bson.M{}
	rpc.ReadJson(r, &params)

	err, runResult := ExecJS(vars["js"], params)

	rpc.WriteJson(r, w, runResult, err)
}

func ExecJS(id string, params interface{}) (error, bson.M) {
	var runResult bson.M

	err := _db.Run(bson.D{
		{"eval", "function(p) { return " + id + "(p); }"},
		{"args", []interface{}{params}},
		{"nolock", true},
	},
		&runResult)

	return err, runResult
}

/// Тайлан боловсруулах
func Report(w http.ResponseWriter, r *http.Request) {
	var err error
	args := JsArgs{}
	rpc.ReadJson(r, &args)

	// call stored js
	var runResult bson.M
	var resp []bson.M

	err = _db.Run(bson.D{
		{"eval", args.Src},
		{"args", []bson.M{args.Params}},
		{"nolock", true},
	},
		&runResult)

	if err == nil {

		// боловсруулалтын дараах үр дүнг уншиж буцаах
		c := _db.C(runResult["retval"].(string))
		q := c.Find(bson.M{})

		if args.Params["Sort"] != nil {
			q.Sort([]string{args.Params["Sort"].(string)}...)
		}

		err = q.All(&resp)
	}

	rpc.WriteJson(r, w, resp, err)
}

/// индекс үүсгэх
func EnsureIndexes() {
	var c *mgo.Collection

	// нийтлэг талбаруудаар индекс үүсгэх
	for _, cName := range Cols {
		c = _db.C(cName)
		c.EnsureIndexKey("tags")
		c.EnsureIndexKey("State")
		c.EnsureIndexKey("Type")
		c.EnsureIndexKey("Company")

		if cName == "Employee" {
			c.EnsureIndexKey("Job")
			c.EnsureIndexKey("Dept")
			c.EnsureIndexKey("Status")
			c.EnsureIndexKey("CardNo")
		}
	}

	// Attendance unique index
	c = _db.C("Attendance")
	index := mgo.Index{
		Key:        []string{"Date", "EnrollNumber"},
		Unique:     true,
		DropDups:   true,
		Background: true,
	}
	c.EnsureIndex(index)
}

// хавтаснаас өгөгдөл бааз руу ачаална
func LoadJson(folder string) {
	files, _ := ioutil.ReadDir(folder)

	for _, f := range files {
		if f.IsDir() { // sub folder
			LoadJson(folder + "/" + f.Name())
		} else {

			if strings.HasSuffix(f.Name(), ".json") { //  *.json файл
				println("Importing " + folder + "/" + f.Name())
				colName := f.Name()[:len(f.Name())-5]

				data, e := ioutil.ReadFile(folder + "/" + f.Name())
				if e != nil {
					panic(e)
				}

				var jsonArray []bson.M
				if err := json.Unmarshal(data, &jsonArray); err == nil {
					c := _db.C(colName)

					for _, o := range jsonArray {
						UpdateTags(o)

						c.UpsertId(o["_id"], o)
						//c.Insert(o)
					}
				} else {
					fmt.Printf("%s: ERROR: %s", f.Name(), err.Error())
				}
			} else if strings.HasSuffix(f.Name(), ".js") { //  *.js файл
				funcName := f.Name()[:len(f.Name())-3]

				data, e := ioutil.ReadFile(folder + "/" + f.Name())
				if e != nil {
					panic(e)
				}

				c := _db.C("system.js")
				c.UpsertId(funcName,
					bson.M{
						"_id":   funcName,
						"value": bson.JavaScript{Code: string(data)},
					})

			}

		}

	}
}

// заасан хавтаснаас тайлангийн файлууд (rpt-*.html) уншиж баазад оруулна
func LoadReport(folder string) {
	files, _ := ioutil.ReadDir(folder)

	c := _db.C("system.js")

	for _, f := range files {
		s := f.Name()

		if !f.IsDir() && strings.HasPrefix(s, "rpt-") && strings.HasSuffix(s, ".html") {
			rptId := s[:len(s)-5]
			rptId = strings.Replace(rptId, "-", "_", 1)

			if data, e := ioutil.ReadFile(folder + "/" + s); e == nil {

				strHtml := string(data)

				// хамгийн эхний script таагийг сервер функц гэж тооцно
				start := strings.Index(strHtml, "function")
				strHtml = strHtml[start:]
				end := strings.Index(strHtml, "</script>")
				strHtml = strHtml[:end]

				c.UpsertId(rptId, bson.M{
					"_id":   rptId,
					"value": bson.JavaScript{Code: strHtml},
				})
			}

		}
	}
}

func Close() {
	mgoSession.Close()
}

// func Register() *mux.Router {
// 	UrlPrefix := "/db"
//
// 	EnsureIndexes()
//
// 	rtr := mux.NewRouter()
// 	s := rtr.PathPrefix(UrlPrefix).Subrouter()
// 	s.HandleFunc("/cols", CollectionList)
// 	s.HandleFunc("/count/{collection}", Count)
// 	s.HandleFunc("/find/{collection}", Find)
// 	s.HandleFunc("/findId/{collection}/{id:.+}", FindId)
// 	s.HandleFunc("/findOne/{collection}", FindOne)
// 	s.HandleFunc("/aggregate", Aggregate)
// 	s.HandleFunc("/mapreduce", MapReduce)
// 	s.HandleFunc("/save/{collection}", Save)
// 	s.HandleFunc("/delete/{collection}/{id:.+}", Delete)
// 	s.HandleFunc("/insert/{collection}", Insert)
// 	s.HandleFunc("/update/{collection}", Update)
// 	s.HandleFunc("/exec/{js}", ExecJS1)
// 	s.HandleFunc("/report", Report)
//
// 	return rtr
//
// }
