package main

import (
	"database/sql"
	"encoding/json"
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

func (srv *server) RemoveOrganisation() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
		}
		name := r.Form.Get("name")
		organisation := r.Form.Get("organisation")
		requestStr := fmt.Sprintf("DELETE FROM organisations WHERE name = '%s' AND organisation = '%s';", name, organisation)
		log.Println(requestStr)
		_, err = srv.DB.Query(requestStr)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
		}
		w.WriteHeader(http.StatusOK)
	}
}

func (srv *server) RemoveTask() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
		}
		username := r.Form.Get("username")
		organisation := r.Form.Get("organisation")
		taskname := r.Form.Get("taskname")
		assignee := r.Form.Get("assignee")
		description := r.Form.Get("description")
		requestStr := fmt.Sprintf("DELETE FROM tasks WHERE username = '%s' AND organisation = '%s' AND taskname = '%s' AND assignee = '%s' AND description = '%s';",
			username, organisation, taskname, assignee, description)
		log.Println(requestStr)
		_, err = srv.DB.Query(requestStr)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
		}
		w.WriteHeader(http.StatusOK)
	}
}

func (srv *server) AddOrganisation() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		name := r.Form.Get("name")
		organisation := r.Form.Get("organisation")
		rows, err := srv.DB.Query(fmt.Sprintf("SELECT * FROM organisations WHERE name = '%s' AND organisation = '%s';", name, organisation))
		i := 0
		defer rows.Close()
		for rows.Next() {
			i += 1
		}
		if i == 0 {
			requestStr := fmt.Sprintf("INSERT INTO organisations(name, organisation) VALUES ('%s', '%s');", name, organisation)
			log.Println(requestStr)
			_, err = srv.DB.Query(requestStr)
			if err != nil {
				log.Println(err)
				w.WriteHeader(http.StatusBadRequest)
			}
		}
		w.WriteHeader(http.StatusOK)
	}
}

func (srv *server) AddTask() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		username := r.Form.Get("username")
		organisation := r.Form.Get("organisation")
		taskname := r.Form.Get("taskname")
		assignee := r.Form.Get("assignee")
		description := r.Form.Get("description")
		rows, err := srv.DB.Query(fmt.Sprintf("SELECT * FROM tasks WHERE username = '%s' AND organisation = '%s' AND taskname = '%s' AND assignee = '%s' AND description = '%s';",
			username, organisation, taskname, assignee, description))
		i := 0
		defer rows.Close()
		for rows.Next() {
			i += 1
		}
		if i == 0 {
			requestStr := fmt.Sprintf("INSERT INTO tasks(username, organisation, taskname, assignee, description) VALUES ('%s', '%s', '%s', '%s', '%s');", username, organisation, taskname, assignee, description)
			log.Println(requestStr)
			_, err = srv.DB.Query(requestStr)
			if err != nil {
				log.Println(err)
				w.WriteHeader(http.StatusBadRequest)
			}
		}
		w.WriteHeader(http.StatusOK)
	}
}

type userOrganisationEntry struct {
	Id           int    `json:"id"`
	Name         string `json:"name"`
	Organisation string `json:"organisation"`
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
		i := 0
		for rows.Next() {
			err := rows.Scan(&organisation)
			if err != nil {
				log.Println(err)
				w.WriteHeader(http.StatusBadRequest)
				return
			}
			organisationEntries = append(organisationEntries,
				userOrganisationEntry{
					Id:           i,
					Name:         name,
					Organisation: organisation,
				})
			i += 1
		}
		v, err := json.Marshal(organisationEntries)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		log.Println(string(v))
		fmt.Fprintln(w, string(v))
		w.WriteHeader(http.StatusOK)
	}
}

type userTaskEntry struct {
	Id           int    `json:"id"`
	Username     string `json:"assignedBy"`
	Organisation string `json:"organisation"`
	Assignee     string `json:"assignedTo"`
	Taskname     string `json:"name"`
	Description  string `json:"message"`
}

// 	id: 1,
// 	assignedTo: "Mark",
// 	assignedBy: "Quinn",
// 	name: "Finish SQL",
// 	message: "Complete the dashboard and connect to front-end",

func (srv *server) ShowTasks() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		assignee := r.Form.Get("assignee")
		log.Println(assignee)
		requestStr := fmt.Sprintf("SELECT username, organisation, taskname, description FROM organisations WHERE assignee = '%s';", assignee)
		log.Println(requestStr)
		rows, err := srv.DB.Query(requestStr)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		var username, organisation, taskname, description string
		var taskEntries []userTaskEntry
		defer rows.Close()
		i := 0
		for rows.Next() {
			err := rows.Scan(&username, &organisation, &taskname, &description)
			if err != nil {
				log.Println(err)
				w.WriteHeader(http.StatusBadRequest)
				return
			}
			taskEntries = append(taskEntries,
				userTaskEntry{
					Id:           i,
					Username:     username,
					Organisation: organisation,
					Assignee:     assignee,
					Taskname:     taskname,
					Description:  description,
				})
			i += 1
		}
		v, err := json.Marshal(taskEntries)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		log.Println(string(v))
		fmt.Fprintln(w, string(v))
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
