package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"sync"
	"text/template"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type server struct {
	*http.Server
	*sql.DB
}

func NewServer() *server {
	connStr := "postgres://postgres:password@192.168.132.125/taskall"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	srv := &server{
		Server: &http.Server{
			Addr:    ":8083",
			Handler: mux.NewRouter(),
		},
		DB: db,
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

// func (srv *server) AddOrganisation() http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		err := r.ParseForm()
// 		if err != nil {
// 			log.Println(err)
// 			w.WriteHeader(http.StatusBadRequest)
// 		}
// 		name := r.Form.Get("name")
// 		organisation := r.Form.Get("organisation")
// 		row, err := srv.DB.Query("INSERT INTO ")
// 		if err != nil {
// 			log.Println(err)
// 			w.WriteHeader(http.StatusBadRequest)
// 		}
// 		w.WriteHeader(http.StatusOK)
// 	}
// }

type userOrganisationEntry struct {
	Name         string
	Organisation string
}

func (srv *server) ShowOrganisations() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		name := r.Form.Get("name")
		log.Println(name)
		requestStr := fmt.Sprintf("SELECT organisation FROM organisations WHERE name = '%s';", name)
		log.Println(requestStr)
		rows, err := srv.DB.Query(requestStr)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		var organisation string
		var organisationEntries []userOrganisationEntry
		defer rows.Close()
		for rows.Next() {
			err := rows.Scan(&organisation)
			if err != nil {
				log.Println(err)
				w.WriteHeader(http.StatusBadRequest)
				return
			}
			organisationEntries =
				append(organisationEntries,
					userOrganisationEntry{
						Name:         name,
						Organisation: organisation,
					})
		}
		log.Println(organisationEntries)
		w.WriteHeader(http.StatusOK)
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
