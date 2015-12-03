// Copyright (c) 2015, ubs121
package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"hash/fnv"
	"io/ioutil"
	"os"
	"regexp"
	"strings"
	"time"
)

const (
	ROOT_FOLDER = "."
	DB_HOST     = "localhost"
	DB_NAME     = "lerp"
	timeLayout  = "2006-01-02 15:04:05"
)

var (
	totalBooks int
	mgoSession *mgo.Session
	_db        *mgo.Database
	_col       *mgo.Collection
	sepRgx     = regexp.MustCompile(`[,\.\r\n\t\s\(\)\:]`)
	tagFields  = []string{"_id", "нэр", "ангилал", "формат", "тухай", "зохиогч", "орчуулагч", "хэл"}
)

// баазын холболт үүсгэх
func openDb() {
	if mgoSession == nil {
		var err error
		if mgoSession, err = mgo.Dial(DB_HOST); err != nil {
			panic(errors.New("Өгөгдлийн сантай холбогдоход алдаа гарлаа!"))
		}
		mgoSession.SetSafe(&mgo.Safe{})
		// Optional. Switch the session to a monotonic behavior.
		mgoSession.SetMode(mgo.Monotonic, true)
	}

	_db = mgoSession.Clone().DB(DB_NAME)
	_col = _db.C("Ном")
}

/*  Ном бүртгэх, дараах талбаруудаар бүртгэнэ
<pre>
	_id - ISBN дугаар буюу үл давхцах ID
	нэр - номын нэр
	ангилал - түүх|уран зохиол|намтар|зөвлөмж|гарын авлага|хэл|мэдээллийн технологи|шинжлэх ухаан|голомт
	хавтас - ном байрлаж буй хавтас
	файл - эхлэл файл
	формат = markdown|html|mobi|pdf|epub|image|audio
	зураг - Нүүрний зураг
	огноо - ном нийтлэгдсэн огноо
	tags - түлхүүр үгс
	тухай - номын тухай товч тайлбар
	хувилбар - хувилбар буюу хэд дэх хэвлэлт
	зохиогч
	орчуулагч
	хэл - ном бичигдсэн хэл
	индекс - Гарчигийн индекс (Table of contents)
	хуудас - хуудасны тоо
</pre>
*/
func importBook(path string, f os.FileInfo) {
	if !f.IsDir() {
		return
	}

	id := makeId(f.Name())

	b := bson.M{
		"_id":     id,
		"нэр":     f.Name(),
		"хавтас":  path, // TODO: ROOT_FOLDER хэсгийг урдаас нь хасах
		"created": f.ModTime().Format(timeLayout),
	}

	if fileExists(path + "/Ном.json") {
		// json ном
		dat, err := ioutil.ReadFile(path + "/Ном.json")
		if err == nil {
			var jsonObj bson.M
			if err = json.Unmarshal(dat, &jsonObj); err == nil {
				id = jsonObj["_id"].(string)
				for k, v := range jsonObj {
					b[k] = v
				}
			}

		}
	} else if fileExists(path + "/SUMMARY.md") {
		// markdown ном
		b["формат"] = "markdown"
		b["файл"] = "SUMMARY.md"
	} else if fileExists(path + "/index.html") {
		// html ном
		b["формат"] = "html"
		b["файл"] = "index.html"
	} else {
		cover := getCover(path)

		if "" != cover {
			b["зураг"] = cover

			files, _ := ioutil.ReadDir(path)
			index := []bson.M{}

			for _, f1 := range files {
				if strings.HasPrefix(f1.Name(), "cover") {
					continue
				}

				if b["формат"] == nil {
					if strings.HasSuffix(f1.Name(), ".pdf") {
						b["формат"] = "pdf"
						b["файл"] = f1.Name()
					} else if strings.HasSuffix(f1.Name(), ".epub") {
						b["формат"] = "epub"
						b["файл"] = f1.Name()
					} else if strings.HasSuffix(f1.Name(), ".mobi") {
						b["формат"] = "mobi"
						b["файл"] = f1.Name()
					} else if strings.HasSuffix(f1.Name(), ".mp3") {
						b["формат"] = "audio"
						b["файл"] = f1.Name()
					} else if strings.HasSuffix(f1.Name(), ".wma") {
						b["формат"] = "audio"
						b["файл"] = f1.Name()
					}
				}

				if !strings.HasPrefix(f1.Name(), ".") {
					index = append(index, bson.M{"нэр": f1.Name(), "файл": f1.Name()})
				}
			}

			b["индекс"] = index

			//  формат нь тодорхой бус ном байна
			if b["формат"] == nil {
				b["формат"] = "unknown"
			}
		}

	}

	// ном мөн байна
	if b["формат"] != nil {
		totalBooks++
		parts := strings.Split(path, "/")
		if len(parts) > 0 {
			b["ангилал"] = parts[0]
		}

		if b["зураг"] == nil {
			// нүүрний зураг бий эсэхийг шалгах
			cover := getCover(path)
			if "" != cover {
				b["зураг"] = cover
			} else {
				// хавтас доторхи эхний файлыг зураг болгон авах уу?
			}
		}

		// баазад шалгах
		q := _col.FindId(id)
		var o bson.M
		err := q.One(&o)

		// tag үүсгэх
		tags := createTags(b)

		if err == nil && o != nil { // байгаа бол засна
			if o["_tags"] != nil {
				b["_tags"] = mergeTags(tags, o["_tags"].([]interface{}))
			} else {
				b["_tags"] = tags
			}
			delete(b, "_id")
			_col.UpdateId(id, b)
		} else { // байхгүй бол оруулна
			b["_tags"] = tags
			_col.Insert(b)
		}

	} else { // ном биш, ердийн хавтас байна
		files, _ := ioutil.ReadDir(path)
		for _, f1 := range files {
			importBook(path+"/"+f1.Name(), f1)
		}
	}
}

func makeId(s string) string {
	if strings.Contains(s, " ") || strings.Contains(s, ",") {
		h := fnv.New32a()
		h.Write([]byte(s))

		return fmt.Sprint(h.Sum32())
		//return strings.Replace(s, " ", "_", -1)
	}
	return s
}

func fileExists(path string) bool {
	if _, err := os.Stat(path); err == nil {
		return true
	}
	return false
}

// нүүрний зураг бий эсэхийг шалгах
func getCover(path string) string {
	files, _ := ioutil.ReadDir(path)
	for _, f := range files {
		if strings.HasPrefix(f.Name(), "cover") {
			// TODO: зургийн өртгөтгөл мөн эсэхийг шалгах
			return f.Name()
		}
	}

	return ""
}

/// номын мэдээллээс tags үүсгэнэ
func createTags(b bson.M) []string {
	tags := []string{}

	for k, _ := range b {
		if isTagField(k) && b[k] != nil {

			vals := sepRgx.Split(b[k].(string), -1)

			for _, s := range vals {
				tags = append(tags, strings.ToLower(s))
			}

		}
	}

	return tags
}

func mergeTags(a []string, b []interface{}) []string {
	c := make([]string, len(a))

	for _, v := range a {
		if !sliceContains(c, v) {
			c = append(c, v)
		}
	}

	for _, v := range b {
		if !sliceContains(c, v.(string)) {
			c = append(c, v.(string))
		}
	}

	return c
}

func sliceContains(s []string, t string) bool {
	for _, v := range s {
		if t == v {
			return true
		}
	}
	return false
}

func isTagField(f string) bool {
	for _, el := range tagFields {
		if el == f {
			return true
		}
	}
	return false
}

func main() {
	openDb()

	totalBooks = 0
	// TODO: эхлэх хавтасыг заах
	files, _ := ioutil.ReadDir("./")
	for _, f := range files {
		importBook(f.Name(), f)
	}

	fmt.Println("Нийт ", totalBooks, "ном бүртгэлээ")
}
