package main

import (
	"log"
	"net/http"
	"path/filepath"
	"sync"
	"text/template"

	"github.com/gorilla/mux"
)

type server struct {
	*http.Server
}

func NewServer() *server {
	srv := &server{
		Server: &http.Server{
			Addr:    ":8083",
			Handler: mux.NewRouter(),
		},
	}
	srv.Routes()
	return srv
}

func (srv *server) HandleStaticTemplate(paths ...string) http.HandlerFunc {
	var (
		init   sync.Once
		tpl    *template.Template
		tplerr error
	)
	return func(w http.ResponseWriter, r *http.Request) {
		init.Do(func() {
			tpl, tplerr = template.ParseFiles(paths...)
		})
		if tplerr != nil {
			http.Error(w, tplerr.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		tpl.Execute(w, nil)
	}
}

func (srv *server) ServeDirectory(directory string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		path := filepath.Join(directory, vars["filename"])
		log.Printf("Serving file: %s\n", path)
		http.ServeFile(w, r, path)
	}
}

func (srv *server) LogRequest(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s - %s %s\n", r.RemoteAddr, r.Method, r.URL)
		h(w, r)
	}
}
