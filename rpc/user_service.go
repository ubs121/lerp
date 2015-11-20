// Copyright 2013 ubs121
package rpc

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"io"
	"lerp/db"
	"net/http"
	"time"
)

var (
	_sessions map[string]*Session
)

type (
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
		Id         string    `json:"_id"`
		User       string    `json:"user"`
		UserName   string    `json:"name"`
		UserRole   []string  `json:"roles"`
		Perms      []string  `json:"perms"`
		Company    string    `json:company`
		Dept       string    `json:dept`
		Date       time.Time `json:"date"`
		RemoteAddr string    `json:"remoteAddr"`
	}
	Args struct {
		Username string
		Password string
		Type     string ",omitempty"
	}
	gzipResponseWriter struct {
		io.Writer
		http.ResponseWriter
	}
)

func Ping(w http.ResponseWriter, r *http.Request) {
	WriteResponse(r, w, "pong", nil)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var err error
	args := Args{}
	if err = ParseRequest(r, &args); err != nil {
		WriteResponse(r, w, nil, errors.New("Username, password missing!"))
		return
	}

	c := db.C("User")
	q := c.FindId(args.Username)

	var ss Session
	var u User
	err = q.One(&u)

	// TODO: SHA1 encoding
	if err == nil && u.Password == args.Password {
		// create session
		ss.Id, err = GenUUID()
		ss.User = args.Username
		ss.UserName = u.Name
		ss.UserRole = []string{u.Role}
		ss.RemoteAddr = r.RemoteAddr
		ss.Company = u.Company
		ss.Date = time.Now()

		// ss.Perms TODO: эрхүүдийг олох

		c = db.C("UserSession")

		if err = c.Insert(ss); err == nil {
			_sessions[ss.Id] = &ss
		}
	} else {
		err = errors.New("Access denied!")
	}

	WriteResponse(r, w, ss, err)
}

/// Хэрэглэгчийг шалгаж, мэдээллийг буцаах
func Check(w http.ResponseWriter, r *http.Request) {
	ss, err := GetSession(r)
	WriteResponse(r, w, ss, err)
}

/// Нууц үг солих
func ChangePwd(w http.ResponseWriter, r *http.Request) {
	var err error
	args := Args{}
	if err = ParseRequest(r, &args); err != nil {
		WriteResponse(r, w, nil, errors.New("Username, password missing!"))
		return
	}

	c := db.C("User")
	q := c.FindId(r.Header.Get("User"))

	var u User

	if err = q.One(&u); err == nil {
		u.Password = args.Password
		err = c.UpdateId(r.Header.Get("User"), u)
	}

	WriteResponse(r, w, "OK", err)
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

/// хүсэлт шалгах, log бичих
func Validate(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Add("Access-Control-Allow-Methods", HttpMethods)
			w.Header().Add("Access-Control-Allow-Headers", r.Header.Get("Access-Control-Request-Headers"))
			return
		}

		// дараахаас бусад хүсэлтийг шалгана
		if r.URL.String() != "/user/login" {
			var ss *Session
			var err error
			if ss, err = GetSession(r); err != nil {
				WriteResponse(r, w, nil, errors.New("Access denied!"))
				return
			}

			// хэрэглэгчийн ID, Company-г нэмж дамжуулах
			r.Header.Set("User", ss.User)
			// TODO: Нэр байхгүй бол ажилтны нэрийг олох
			r.Header.Set("Name", ss.UserName)
			//r.Header.Set("Company", ss.UserData.Company)
			rs, _ := json.Marshal(ss.UserRole)
			r.Header.Set("Role", string(rs))
		}

		handler.ServeHTTP(w, r)

		// TODO: QUIC ашиглах

		// gzip ашиглахаар бага хэмжээтэй хариуны хэмжээ нь буруу очоод байгаа бололтой!
		/*
			if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
				// gzip
				w.Header().Set("Content-Encoding", "gzip")
				gz := gzip.NewWriter(w)
				defer gz.Close()

				handler.ServeHTTP(gzipResponseWriter{Writer: gz, ResponseWriter: w}, r)
			} else {
				handler.ServeHTTP(w, r)
			}*/

	})
}

/// хүсэлтийн session мэдээлэл авах
func GetSession(r *http.Request) (*Session, error) {
	var (
		ss    *Session
		ok    bool
		token string
	)
	token = r.Header.Get("Token")

	// санах ойгоос шалгах
	if ss, ok = _sessions[token]; ok {
		return ss, nil
	}

	/*
		c := db.C("UserSession")
		q := c.FindId(token)

		if err = q.One(&ss); err == nil {
			_sessions[token] = ss
			return ss, nil
		}*/

	return nil, errors.New("Access denied!")
}

func RegisterUserService(mux *http.ServeMux) {
	mux.HandleFunc("/user/ping", Ping)
	mux.HandleFunc("/user/login", Login)
	mux.HandleFunc("/user/check", Check)
	mux.HandleFunc("/user/changepwd", ChangePwd)
}
