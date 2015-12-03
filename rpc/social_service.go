// Copyright 2013 ubs121
package plus

import (
	"archive/zip"
	"errors"
	"fmt"
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"lerp/db"
	"memex/rpc"
	"log"
	"net/http"
	"time"
)

type (
	Post struct {
		Id          string    "_id,omitempty"
		Name        string    "Name,omitempty"
		Text        string    "Text,omitempty"
		Type        string    "Type,omitempty"
		To          []string  "To,omitempty"
		Date        string    "Date,omitempty"
		Attachment  string    "Attachment,omitempty"
		Likes       []Like    "Likes,omitempty"
		Commentable bool      "Commentable,omitempty"
		Comments    []Comment "Comments,omitempty"
		User        string    "User,omitempty"
		// TODO: бусад үйл явдал, асуулга талбарууд нэмэгдэнэ
	}
	Like struct {
		User string "User,omitempty"
		Date string "Date,omitempty"
	}
	Comment struct {
		User string "User,omitempty"
		Text string "Text,omitempty"
		Date string "Date,omitempty"
	}
	PlusGroup struct {
		Id          string   "_id,omitempty"
		Name        string   "Name,omitempty"
		Description string   "Description,omitempty"
		Image       string   "Image,omitempty"
		Company     string   "Company,omitempty"
		Followers   []string "Followers,omitempty"
	}
	Event struct {
		Id           string   "_id,omitempty"
		Name         string   "Name,omitempty"
		Type         string   "Type,omitempty"
		DateStart    string   "DateStart,omitempty"
		DateEnd      string   "DateEnd,omitempty"
		MainSpeaker  string   "MainSpeaker,omitempty"
		Subscription bool     "Subscription,omitempty"
		Participants []IdName "Participants,omitempty"
		Company      string   "Company,omitempty"
	}

	IdName struct {
		Id   string "_id,omitempty"
		Name string "Name,omitempty"
	}
	SurveyFeedback struct {
		Survey  string   "Survey,omitempty"
		User    string   "User,omitempty"
		Date    string   "Date,omitempty"
		Answers []bson.M "Answers,omitempty"
	}
)

// мэдээ тоолох
// TODO: replace with db.MapReduce
func PostCount(w http.ResponseWriter, r *http.Request) {
	var err error
	args := bson.M{}
	if err = rpc.ReadJson(r, &args); err != nil {
		rpc.WriteJson(r, w, nil, errors.New("Invalid JSON!"))
	}

	c := db.C("Post")

	mr := &mgo.MapReduce{
		Map:    "function() { if (!this.Type) { emit('news', 1) } else { emit(this.Type, 1) } }",
		Reduce: "function(key, values) { return Array.sum(values);   }",
	}
	var result []bson.M
	_, err = c.Find(nil).MapReduce(mr, &result)

	rpc.WriteJson(r, w, result, err)

}

/// +1 on the post
func Plus1(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	c := db.C("Post")
	q := c.FindId(vars["postId"])

	var post Post
	err = q.One(&post)

	aLike := Like{User: r.Header.Get("User"), Date: time.Now().String()[:19]}

	if err == nil {
		if len(post.Likes) == 0 {
			post.Likes = []Like{aLike}
		} else {
			// байхгүй бол нэмэх (like), байгаа бол хасах (dislike)
			var i int = 0
			var exists bool
			for ; i < len(post.Likes); i++ {
				if post.Likes[i].User == r.Header.Get("User") {
					exists = true
					break
				}
			}
			if exists {
				post.Likes = append(post.Likes[:i], post.Likes[i+1:]...)
				aLike.User = "" // notify a dislike
			} else {
				post.Likes = append(post.Likes, aLike)

			}

		}

		err = c.UpdateId(post.Id, post)
	}

	rpc.WriteJson(r, w, aLike, err)
}

/// add comment
func DoComment(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)
	args := bson.M{}
	if err = rpc.ReadJson(r, &args); err != nil {
		rpc.WriteJson(r, w, nil, errors.New("Invalid JSON!"))
	}

	c := db.C("Post")
	q := c.FindId(vars["postId"])

	var post Post
	err = q.One(&post)

	if err == nil {
		aCmt := Comment{User: r.Header.Get("User"), Date: time.Now().String()[:19], Text: args["Text"].(string)}

		if len(post.Comments) == 0 {
			post.Comments = []Comment{aCmt}
		} else {
			post.Comments = append(post.Comments, aCmt)
		}

		err = c.UpdateId(post.Id, post)
	}

	rpc.WriteJson(r, w, "OK", err)
}

func FollowGroup(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	c := db.C("PlusGroup")
	q := c.FindId(vars["groupId"])

	var pg PlusGroup
	err = q.One(&pg)

	if err == nil {
		if len(pg.Followers) == 0 {
			pg.Followers = []string{r.Header.Get("User")}
		} else {
			pg.Followers = append(pg.Followers, r.Header.Get("User"))
		}

		err = c.UpdateId(pg.Id, pg)
	}

	rpc.WriteJson(r, w, "OK", nil)
}

func UnfollowGroup(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	c := db.C("PlusGroup")
	q := c.FindId(vars["groupId"])

	var pg PlusGroup
	err = q.One(&pg)

	if err == nil {
		if len(pg.Followers) > 0 {
			for i := 0; i < len(pg.Followers); i++ {
				if pg.Followers[i] == r.Header.Get("User") {
					// remove all occurences
					pg.Followers = append(pg.Followers[:i], pg.Followers[i+1:]...)
				}
			}

			err = c.UpdateId(pg.Id, pg)
		}

	}

	rpc.WriteJson(r, w, "OK", nil)
}

func UpdateGroups(w http.ResponseWriter, r *http.Request) {
	// TODO: албан (нэгж) болон албан бус группүүд
	// TODO: employee tag юунд ашиглах вэ? Survey, Plus post ?
	rpc.WriteJson(r, w, "Done !", nil)
}

func Subscribe(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	c := db.C("Event")
	q := c.FindId(vars["eventId"])
	resp := "OK"

	var ev Event
	err = q.One(&ev)

	if err == nil {
		p := IdName{Id: r.Header.Get("User"), Name: r.Header.Get("Name")}
		if len(ev.Participants) == 0 {
			ev.Participants = []IdName{p}
			err = c.UpdateId(ev.Id, ev)
		} else {
			// өмнө бүртгүүлсэн эсэхийг шалгах
			i := 0
			for i < len(ev.Participants) {
				if ev.Participants[i].Id == r.Header.Get("User") {
					break
				}
				i++
			}

			if i >= len(ev.Participants) {
				ev.Participants = append(ev.Participants, p)
				err = c.UpdateId(ev.Id, ev)
			} else {
				// давхардсан
				resp = "Dup"
			}

		}

	}

	rpc.WriteJson(r, w, resp, nil)
}

func UnSubscribe(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	c := db.C("Event")
	q := c.FindId(vars["eventId"])

	var ev Event
	err = q.One(&ev)

	if err == nil {
		if len(ev.Participants) > 0 {
			for i := 0; i < len(ev.Participants); i++ {
				if ev.Participants[i].Id == r.Header.Get("User") {
					// remove all occurences
					ev.Participants = append(ev.Participants[:i], ev.Participants[i+1:]...)
				}
			}

			err = c.UpdateId(ev.Id, ev)
		}

	}

	rpc.WriteJson(r, w, "OK", nil)
}

func SaveFeedback(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	var obj SurveyFeedback
	if err = rpc.ReadJson(r, &obj); err != nil {
		rpc.WriteJson(r, w, nil, err)
		return
	}

	c := db.C("SurveyFeedback")

	// асуултын тоогоор мөр үүсгэж бичих
	for _, ans := range obj.Answers {
		a := bson.M{}
		a["_id"] = bson.NewObjectId().Hex()
		a["User"] = r.Header.Get("User")
		a["Survey"] = vars["surveyId"]
		a["Question"] = ans["Question"]
		a["Answer"] = ans["Answer"]
		c.Insert(a)
	}

	// OK - амжилттай
	// DUP - давхардсан
	// LIMIT - хариулах хязгаарт хүрсэн
	rpc.WriteJson(r, w, "OK", err)
}

func ZipBanner(w http.ResponseWriter, r *http.Request) {
	var err error
	var rdr *zip.ReadCloser
	vars := mux.Vars(r)

	// extract zip
	rdr, err = zip.OpenReader(vars["file"])
	if err != nil {
		log.Fatal(err)
	}
	defer rdr.Close()

	// Архив дахь файлуудаар давтаж агуулгыг хэвлэх
	for _, f := range rdr.File {
		fmt.Printf("'%s' файлын агуулга:\n", f.Name)

		/*
			        folder := conf.Conf["FileHome"] + "/Banner"
					filePath := folder + "/" + vars["file"]

					if _, e := os.Stat(folder); os.IsNotExist(e) {
						err = os.MkdirAll(folder, 0700)
					}

			        rc, err := f.Open()
			        if err != nil {
			           log.Fatal(err)
			        }
			        defer rc.Close()

			        d, err := os.Create(filePath)
					if err != nil {
						return err
					}
					if _, err := io.Copy(d, s); err != nil {
						d.Close()
						return err
					}
					return d.Close()

				    _, err = io.Copy(os.Stdout, rc)
			        if err != nil {
			            log.Fatal(err)
			        }*/

	}

	rpc.WriteJson(r, w, "OK", err)
}

func Register() *mux.Router {
	UrlPrefix := "/plus"
	// create router
	rtr := mux.NewRouter()
	s := rtr.PathPrefix(UrlPrefix).Subrouter()
	s.HandleFunc("/postcount", PostCount)
	s.HandleFunc("/like/{postId}", Plus1)
	s.HandleFunc("/comment/{postId}", DoComment)
	s.HandleFunc("/follow/{groupId}", FollowGroup)
	s.HandleFunc("/unfollow/{groupId}", UnfollowGroup)
	s.HandleFunc("/updateGroups", UpdateGroups)
	s.HandleFunc("/subscribe/{eventId}", Subscribe)
	s.HandleFunc("/unsubscribe/{eventId}", UnSubscribe)
	s.HandleFunc("/survey/feedback/{surveyId}", SaveFeedback)
	s.HandleFunc("/zipbanner/{file}", ZipBanner)

	return rtr
}
