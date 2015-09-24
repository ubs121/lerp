// Copyright 2013 ubs121
package rpc

import (
	//"compress/gzip"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"net/http"
	//"strings"
	"memex/db"
	"memex/rpc"
	"log"
	"time"
)

const (
	UrlPrefix string = "/user"
)

var (
	_sessions map[string]*Session
)

type (
	Args struct {
		Username string
		Password string
		Type     string ",omitempty"
	}

	User struct {
		Id          string `json:"_id,omitempty" bson:"_id,omitempty"`
		Password    string "Password,omitempty"
		Name        string "Name,omitempty"
		Description string "Description,omitempty"
		Role        string "Role,omitempty"
		Company     string "Company,omitempty"
		Dept        string "Dept,omitempty"
	}
	Session struct {
		Id         string "_id"
		User       string
		Date       time.Time
		RemoteAddr string
	}
)

func Init() {
	_sessions = make(map[string]*Session)
}

func Ping(w http.ResponseWriter, r *http.Request) {
	rpc.WriteJson(r, w, "pong", nil)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var err error
	args := Args{}
	rpc.ReadJson(r, &args)

	var u User
	err = db.GetJson("user", args.Username, &u)

	var ss *Session
	// TODO: SHA1 encoding @see: GenIdFroTriple
	// TODO: IP check
	if err == nil && u.Password == args.Password {
		// create session
		ss = &Session{}
		ss.Id, err = GenUUID()
		ss.User = args.Username
		//ss.UserData = u
		ss.RemoteAddr = r.RemoteAddr
		ss.Date = time.Now()

		// нэг хэрэглэгч зөвхөн нэг холболт тогтоохыг зөвшөөрнө
		//db.PutJson("session", ss.Id, ss) баазад хийх шаардлагагүй

		// TODO: өмнөх холболтыг шалгах
		//TODO: expire session

		_sessions[ss.Id] = ss
	} else {
		err = errors.New("Нэвтрэх боломжгүй!")
	}

	rpc.WriteJson(r, w, ss, err)
}

/// Хэрэглэгчийг шалгаж, мэдээллийг буцаах
func Check(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("Token")

	if ss, ok := _sessions[token]; !ok {
		rpc.WriteJson(r, w, nil, errors.New("Нэвтрэх боломжгүй!"))
	} else {
		rpc.WriteJson(r, w, ss, nil)
	}

}

/// хүсэлт шалгах, log бичих
func Validate(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Add("Access-Control-Allow-Methods", rpc.HttpMethods)
			w.Header().Add("Access-Control-Allow-Headers", r.Header.Get("Access-Control-Request-Headers"))
			return
		}

		println("request...")

		// log бичих
		log.Printf("%s %s %s\n", r.RemoteAddr, r.Method, r.URL)

		// дараахаас бусад хүсэлтийг шалгана
		if r.URL.String() != "/user/login" && r.URL.String() != "/user/check" {
			var ss *Session
			var ok bool

			token := r.Header.Get("Token")

			if ss, ok = _sessions[token]; !ok {
				rpc.WriteJson(r, w, nil, errors.New("Access denied!"))
				return
			}

			//@see: http://blog.golang.org/context

			// хэрэглэгчийн ID, Company-г нэмж дамжуулах
			r.Header.Set("User", ss.User)
			// TODO: Нэр байхгүй бол ажилтны нэрийг олох
			//r.Header.Set("Name", ss.UserData.Name)
			//r.Header.Set("Company", ss.UserData.Company)

		}

		handler.ServeHTTP(w, r)

		// TODO: QUIC ашиглах

		// FIXME: gzip ашиглахаар бага хэмжээтэй хариуны хэмжээ нь буруу очоод байгаа бололтой!
		/*
			if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
				println("gzipping...")
				// gzip
				w.Header().Set("Content-Encoding", "gzip")
				gz := gzip.NewWriter(w)
				defer gz.Close()

				handler.ServeHTTP(rpc.GzipResponseWriter{Writer: gz, ResponseWriter: w}, r)
			} else {
				handler.ServeHTTP(w, r)
			}*/

	})
}

func GenUUID() (string, error) {
	uuid := make([]byte, 16)
	n, err := rand.Read(uuid)
	if n != len(uuid) || err != nil {
		return "", err
	}
	// TODO: verify the two lines implement RFC 4122 correctly
	uuid[8] = 0x80 // variant bits see page 5
	uuid[4] = 0x40 // version 4 Pseudo Random, see page 7

	return hex.EncodeToString(uuid), nil
}

/// Эрх шалгах perm|+|-
func Permission(w http.ResponseWriter, r *http.Request) {

	rpc.WriteJson(r, w, "OK", nil)
}

/// Нууц үг солих
func ChangePwd(w http.ResponseWriter, r *http.Request) {

	rpc.WriteJson(r, w, "OK", nil)
}

func Register() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/user/ping", Ping)
	mux.HandleFunc("/user/login", Login)
	mux.HandleFunc("/user/check", Check)
	mux.HandleFunc("/user/perm", Permission)
	mux.HandleFunc("/user/pwd", ChangePwd)

	return mux
}
