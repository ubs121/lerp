package db

import (
	"encoding/json"
	"errors"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"io"
	"log"
	"time"
)

const (
	DbName     string = "lerp"
	TABLE_TAGS        = "tags"
	TABLE_P           = "p"
)

type (
	P struct {
		Id      string    `bson:"_id"`
		Name    string    `bson:"name"`
		About   string    `bson:"about"`
		Price   float64   `bson:"price"`
		Photo   string    `bson:"photo"`
		Views   int       `bson:views`
		Buynum  int       `bson:buynum`
		Rank    float64   `bson:rank`
		AddTime time.Time `bson:"addtime"`
		Tags    []string  `bson:_tags`
	}

	TAG struct {
		Id     string  `bson:"_id"`
		Name   string  `bson:"tag"`
		Parent string  `bson:"parent"`
		Rank   float64 `bson:"rank"`
	}
)

var (
	mgoSession *mgo.Session
	_db        *mgo.Database
)

func Open(dbHost string) {
	if mgoSession == nil {
		var err error
		if mgoSession, err = mgo.Dial(dbHost); err != nil {
			panic(errors.New(dbHost + " Өгөгдлийн сантай холбогдоход алдаа гарлаа!"))
		}

		mgoSession.SetSafe(&mgo.Safe{})
		// Optional. Switch the session to a monotonic behavior.
		mgoSession.SetMode(mgo.Monotonic, true)
	}

	_db = mgoSession.Clone().DB(DbName)
}

func DB() *mgo.Database {
	// TODO: create _tags index
	return _db
}

func C(col string) *mgo.Collection {
	return _db.C(col)
}

func Count(col string, query bson.M) (int, error) {
	return _db.C(col).Find(query).Count()
}

func FindOne(col string, query bson.M, proj []string) (bson.M, error) {
	q := _db.C(col).Find(query)

	// select
	if proj != nil && len(proj) > 0 {
		q.Select(_makeSel(proj...))
	}

	var resp bson.M
	err := q.One(&resp)
	return resp, err
}

// Id-аар хайх
func FindId(col string, id interface{}) (bson.M, error) {
	q := _db.C(col).FindId(id)

	var resp bson.M
	err := q.One(&resp)
	return resp, err
}

// олон мөр хайх
func Find(col string, query bson.M, proj []string, sort []string, skip int, limit int) ([]bson.M, error) {
	q := _db.C(col).Find(query)

	// select
	if proj != nil && len(proj) > 0 {
		q.Select(_makeSel(proj...))
	}

	// skip
	if skip > 0 {
		q.Skip(skip)
	}

	// limit
	if limit > 0 {
		q.Limit(limit)
	}

	// sort
	if len(sort) > 0 {
		q.Sort(sort...)
	}

	var resp []bson.M
	err := q.All(&resp)
	return resp, err
}

// obj["updated"] = time.Now().String()[:19]
// obj["updatedBy"] = r.Header.Get("User")
//onSave(vars["collection"], obj, w, r)
// TODO: foreign key талбарууд шинэчилэх
// tags шинэчилэх
// UpdateTags(obj)

func Insert(col string, obj bson.M) error {
	return _db.C(col).Insert(obj)
}

func Save(col string, obj bson.M) error {
	// TODO: implement save
	return nil
}

func Update(col string, obj bson.M) error {
	// TODO: implement update
	return nil
}

// delete by id
func Delete(col string, id string) error {
	return _db.C(col).RemoveId(id)
}

func _makeSel(proj ...string) (r bson.M) {
	r = make(bson.M, len(proj))
	for _, s := range proj {
		r[s] = 1
	}
	return
}

func Aggregate(col string, pipeline bson.M) ([]bson.M, error) {
	pipe := _db.C(col).Pipe(pipeline)

	var resp []bson.M
	err := pipe.All(&resp)
	return resp, err
}

func MapReduce(col string, query bson.M, m string, r string) ([]bson.M, error) {
	q := _db.C(col).Find(query)

	var resp []bson.M
	_, err := q.MapReduce(&mgo.MapReduce{
		Map:    m,
		Reduce: r,
	}, &resp)
	return resp, err
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
// func Report(w http.ResponseWriter, r *http.Request) {
// 	var err error
// 	args := JsArgs{}
// 	rpc.ReadJson(r, &args)
//
// 	// call stored js
// 	var runResult bson.M
// 	var resp []bson.M
//
// 	err = _db.Run(bson.D{
// 		{"eval", args.Src},
// 		{"args", []bson.M{args.Params}},
// 		{"nolock", true},
// 	},
// 		&runResult)
//
// 	if err == nil {
//
// 		// боловсруулалтын дараах үр дүнг уншиж буцаах
// 		c := _db.C(runResult["retval"].(string))
// 		q := c.Find(bson.M{})
//
// 		if args.Params["Sort"] != nil {
// 			q.Sort([]string{args.Params["Sort"].(string)}...)
// 		}
//
// 		err = q.All(&resp)
// 	}
//
// 	rpc.WriteJson(r, w, resp, err)
// }

// TODO: import csv
func ImportCsv(colName string, data []byte) error {
	// var lines = csvString.split('\n');
	// var headerLine = lines[0];
	// var fields = headerLine.split(',');
	//
	// for (var i = 1; i < lines.length; i++) {
	//   var line = lines[i];
	//
	//   // The csvString that comes from the server has an empty line at the end,
	//   // need to ignore it.
	//   if (line.length == 0) {
	//     continue;
	// }

	return nil
}

// import json
func ImportJson(colName string, data []byte) error {
	var jsonArray []bson.M

	if err := json.Unmarshal(data, &jsonArray); err == nil {
		c := _db.C(colName)

		for _, o := range jsonArray {
			//UpdateTags(o)

			if err := c.Insert(o); err != nil {
				log.Printf("%v: %v", o, err)
			}
		}
	} else {
		log.Printf("DATA FORMAT ERROR: %v", err)
		return err
	}

	return nil
}

// json export
func ExportJson(colName string, w io.Writer) error {
	// TODO: json export implementation

	return nil
}

func Close() {
	mgoSession.Close()
}
