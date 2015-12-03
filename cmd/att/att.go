// Copyright 2013 ubs121
package att

import (
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2/bson"
	"lerp/db"
	"memex/rpc"
	"net/http"
)

// ирц бүртгэх функц
func RegAtt(w http.ResponseWriter, r *http.Request) {
	var err error

	obj := bson.M{}
	if err = rpc.ReadJson(r, &obj); err != nil {
		rpc.WriteJson(r, w, nil, err)
		return
	}

	obj["_id"] = bson.NewObjectId().Hex()
	obj["RemoteAddr"] = r.RemoteAddr

	// TODO: орсон, гарсан эсэхийг ялгаж таних

	// Map EnrollNumber into Employee ID, Name
	empC := db.C("Employee")
	q := empC.Find(bson.M{"CardNo": obj["EnrollNumber"]})
	var emp bson.M
	if err = q.One(&emp); err == nil {
		obj["Employee"] = bson.M{"_id": emp["_id"], "Name": emp["Name"]}
	}

	// Баазад оруулах
	c := db.C("Attendance")
	err = c.Insert(obj)

	rpc.WriteJson(r, w, obj["_id"], err)
}

// Map attendance
func MapEnrollId(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	// ажилтныг олох
	empC := db.C("Employee")
	q := empC.FindId(vars["empId"])

	var emp bson.M
	if err = q.One(&emp); err == nil {
		empRef := bson.M{"_id": emp["_id"], "Name": emp["Name"]}

		// ирцийн өгөгдлийг засах
		c := db.C("Attendance")
		c.UpdateAll(bson.M{"EnrollId": vars["enId"]}, bson.M{"$set": bson.M{"Employee": empRef}})
	}

	rpc.WriteJson(r, w, "OK", err)
}

func Register() *mux.Router {
	UrlPrefix := "/att"
	rtr := mux.NewRouter()
	s := rtr.PathPrefix(UrlPrefix).Subrouter()
	s.HandleFunc("/reg", RegAtt)
	s.HandleFunc("/map/{enId}/{empId}", MapEnrollId)

	return rtr
}
