package main

import "github.com/gorilla/mux"

func (srv *server) Routes() {
	handler := mux.NewRouter()
	handler.HandleFunc("/", srv.LogRequest(srv.HandleStaticTemplate("static/login.html"))).Methods("GET")
	handler.HandleFunc("/organisation", srv.LogRequest(srv.HandleStaticTemplate("static/organisation.html"))).Methods("GET")
	handler.HandleFunc("/dashboard", srv.LogRequest(srv.HandleStaticTemplate("static/dashboard.html"))).Methods("GET")
	handler.HandleFunc("/scripts/{filename}", srv.LogRequest(srv.ServeDirectory("static/scripts"))).Methods("GET")
	handler.HandleFunc("/stylesheets/{filename}", srv.LogRequest(srv.ServeDirectory("static/stylesheets"))).Methods("GET")
	// handler.HandleFunc("/addOrganisation", srv.LogRequest(srv.AddOrganisation())).Methods("POST")
	// handler.HandleFunc("/removeOrganisation", srv.LogRequest(srv.RemoveOrganisation())).Methods("POST")
	handler.HandleFunc("/showOrganisations", srv.LogRequest(srv.ShowOrganisations())).Methods("POST")
	srv.Server.Handler = handler
}
