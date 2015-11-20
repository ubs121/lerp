package rpc

import (
	"lerp/db"
	"net/http"
	"gopkg.in/mgo.v2/bson"
)

type (
	DataRequest struct {
		Id         string
		Collection string
		Query      bson.M
		Sort       []string
		Select     []string
		Rank       bool
		Skip       int
		Limit      int
		Data       bson.M
	}

	FindReply struct {
		Data  []bson.M
		Count int
	}
)

// нэг мөр хайх, энэ хэрэгтэй юу?
func FindOne(w http.ResponseWriter, r *http.Request) {
	args := DataRequest{}
	ParseRequest(r, &args)
	resp, err := db.FindOne(args.Collection, args.Query, args.Select)
	WriteResponse(r, w, resp, err)
}

// олон мөр хайх
func Find(w http.ResponseWriter, r *http.Request) {
	args := DataRequest{}
	ParseRequest(r, &args)

	var resp FindReply

	// TODO: injection шалгалт - onFind(args.Query, w, r)

	n, err := db.Count(args.Collection, args.Query)
	resp.Count = n

	// 25 мөрөөр хязгаарлах
	if args.Limit > 25 {
		args.Limit = 25
	}

	// TODO: _tag хайлт бол тухайн tag-н rank-г нэмэх

	resp.Data, err = db.Find(args.Collection, args.Query, args.Select, args.Sort, args.Skip, args.Limit)

	WriteResponse(r, w, resp, err)
}

func RegisterDataService(mux *http.ServeMux) {

	mux.HandleFunc("/db/find", Find)
	mux.HandleFunc("/db/findOne", FindOne)
}
