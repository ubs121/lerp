// Copyright 2013 ubs121
package hr

import (
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2/bson"
	"lerp/db"
	"memex/rpc"
	"net/http"
)

// Ажлын байр
type (
	Job struct {
		Id                string "_id,omitempty"
		Name              string "name,omitempty"
		ExpectedEmployees int    "expected_employees,omitempty"
		Description       string "description,omitempty"
		Requirements      string "requirements,omitempty"
		DeptId            string "dept_id,omitempty"
		CompanyId         string "company_id,omitempty"
		State             string "state,omitempty"
	}

	// Нэгж
	Dept struct {
		Id        string "_id,omitempty"
		Name      string ",omitempty"
		ParentId  string "parent_id,omitempty"
		CompanyId string "company_id,omitempty"
		ManagerId string "mgr_id,omitempty"
		Notes     string ",omitempty"
	}
)

func Hello(w http.ResponseWriter, r *http.Request) {
	rpc.WriteJson(r, w, "Hello from HR", nil)
}

func MyManager(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	mgr := ""

	// ажилтныг хайж олох
	empCol := db.C("Employee")
	q := empCol.FindId(vars["empId"])
	var emp bson.M
	err = q.One(&emp)

	if err == nil {
		// нэгжийг хайж олох
		deptCol := db.C("Dept")
		q1 := deptCol.FindId(emp["Dept"].(string))
		var dept bson.M
		err = q1.One(&dept)
		if err == nil {
			mgr = dept["Manager"].(string)
		}
	}

	rpc.WriteJson(r, w, mgr, err)
}

// Applicant бүртгэх
func RegApp(w http.ResponseWriter, r *http.Request) {
	var err error
	//vars := mux.Vars(r)

	obj := bson.M{}
	if err = rpc.ReadJson(r, &obj); err != nil {
		rpc.WriteJson(r, w, nil, err)
		return
	}

	c := db.C("Applicant")
	if obj["_id"] == nil {
		obj["_id"] = bson.NewObjectId().Hex()
	}
	obj["RemoteAddr"] = r.RemoteAddr

	err = c.Insert(obj)

	rpc.WriteJson(r, w, "OK", err)
}

func Register() *mux.Router {
	UrlPrefix := "/hr"

	rtr := mux.NewRouter()
	s := rtr.PathPrefix(UrlPrefix).Subrouter()
	s.HandleFunc("/mgr/{empId}", MyManager)
	s.HandleFunc("/app", RegApp)

	return rtr
}
