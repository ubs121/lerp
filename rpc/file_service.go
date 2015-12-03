// Copyright 2013 ubs121
package rpc

import (
	"github.com/gorilla/mux"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

const (
	FileMethods string = "POST, GET, DELETE, OPTIONS"
)

func Upload(w http.ResponseWriter, r *http.Request) {

	var (
		body []byte
		err  error
	)
	defer r.Body.Close()

	vars := mux.Vars(r)

	dir, file := filepath.Split(filepath.Join(conf.Conf["FileHome"], vars["path"]))

	log.Printf("File upload %s\n", vars["path"])

	if _, e := os.Stat(dir); os.IsNotExist(e) {
		err = os.MkdirAll(dir, 0700)
	}

	if err == nil {
		body, err = ioutil.ReadAll(r.Body)
		err = ioutil.WriteFile(dir+file, body, 0700)
	}

	rpc.WriteJson(r, w, "OK", err)
}

func serveFile(w http.ResponseWriter, r *http.Request, fs http.FileSystem, name string) {
	f, err := fs.Open(name)
	if err != nil {
		// TODO expose actual error?
		http.NotFound(w, r)
		return
	}
	defer f.Close()

	d, err1 := f.Stat()
	if err1 != nil {
		// TODO expose actual error?
		http.NotFound(w, r)
		return
	}

	// serverContent will check modification time
	http.ServeContent(w, r, d.Name(), d.ModTime(), f)
}

func Download(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	log.Printf("File get %s\n", vars["path"])

	dir, file := filepath.Split(filepath.Join(conf.Conf["FileHome"], vars["path"]))

	serveFile(w, r, http.Dir(dir), file)
}

func Delete(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	filePath := conf.Conf["FileHome"] + "/" + vars["path"]
	log.Printf("File delete %s ", vars["path"])

	err = os.Remove(filePath)

	rpc.WriteJson(r, w, "OK", err)
}

func Options(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Methods", FileMethods)
	w.Header().Add("Access-Control-Allow-Headers", r.Header.Get("Access-Control-Request-Headers"))
	return
}

func Register() *mux.Router {

	UrlPrefix := "/file"
	// create router
	rtr := mux.NewRouter()
	s := rtr.PathPrefix(UrlPrefix).Subrouter()
	s.HandleFunc("/{path:.+}", Download).Methods("GET")
	s.HandleFunc("/{path:.+}", Upload).Methods("POST")
	s.HandleFunc("/{path:.+}", Delete).Methods("DELETE")
	s.HandleFunc("/{path:.+}", Delete).Methods("OPTIONS")

	// file serving
	//http.Handle("/file/", http.StripPrefix("/file/", http.FileServer(http.Dir(conf.Conf["FileHome"]))))

	return rtr

}
