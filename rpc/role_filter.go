// Copyright 2013 ubs121
package db

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
	"strings"
)

var (
	role2comp = map[string][]string{
		"hr.1": []string{"company1"}}
)

/**
	Өгөгдөл хайх хүсэлт дээр дүрийн шүүлт хийh
**/
func onFind(q bson.M, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	col := vars["collection"]
	var role []string

	err := json.Unmarshal([]byte(r.Header.Get("Role")), &role)
	if err != nil {
		// TODO: access denied error
		println("------ Role error! ", err.Error())
	}

	if contains(role, "admin") || contains(role, "holding") {
		// admin, холдинг хэрэглэгч бүгдийг харна (шүүлт байхгүй)
	} else {

		switch col {
		// бүх хүн харах (өөрсдийн компанийн мэдээлэл)
		case "Employee", "Dept", "Job", "PlusGroup", "Post", "Event", "Survey", "SurveyFeedback", "File", "Page":
			rl := hasHrRole(role)
			if rl != "" {
				filterByCompany(q, role2comp[rl])
			} else {
				filterByCompany(q, []string{r.Header.Get("Company")})
			}

		// дунд нууцлалтай мэдээлэл
		case "Attendance", "Appraisal", "Contract", "Leave", "Training":
			rl := hasHrRole(role)
			if rl != "" {
				filterByCompany(q, role2comp[rl])
			} else if contains(role, "manager") {
				// TODO: хэлтэс, нэгжээр шүүх
			} else {
				filterByUser(q, r.Header.Get("User"))
			}

		// зөвхөн hr-т хамаатай
		case "Applicant", "Report":
			rl := hasHrRole(role)
			if rl != "" {
				filterByCompany(q, role2comp[rl])
			} else {
				// FIXME: access denied ?
				filterByUser(q, r.Header.Get("User"))
			}

		// хувь хүний мэдээлэл
		case "Personal", "Career":
			rl := hasHrRole(role)
			if rl != "" {
				filterByCompany(q, role2comp[rl])
			} else {
				q["_id"] = r.Header.Get("User")
			}

		default:
		}
	}

	// debug
	s, _ := json.Marshal(q)
	log.Printf("****** Role filter %s: %s\n", r.Header.Get("Role"), string(s))
}

func filterByCompany(q bson.M, cps []string) {
	q["$or"] = []bson.M{
		bson.M{"Company": bson.M{"$in": cps}},
		bson.M{"Company": ""},
		bson.M{"Company": bson.M{"$exists": false}}}
}

func filterByUser(q bson.M, u string) {
	q["Employee._id"] = u
}

func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func hasHrRole(roles []string) string {
	for _, r := range roles {
		if strings.HasPrefix(r, "hr") {
			return r
		}
	}
	return ""
}

/**
  Өгөгдөл хадгалах үед тохируулга хийнэ
**/
func onSave(cl string, o bson.M, w http.ResponseWriter, r *http.Request) {
	role := []string{}

	err := json.Unmarshal([]byte(r.Header.Get("Role")), role)
	if err != nil {
		// TODO: access denied error
		println("------ Role error! ", err.Error())
	}

}
