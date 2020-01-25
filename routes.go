package main

import "github.com/gorilla/mux"

func (srv *server) Routes() {
	handler := mux.NewRouter()
	handler.HandleFunc("/", srv.LogRequest(srv.HandleStaticTemplate("static/index.html"))).Methods("GET")
	handler.HandleFunc("/scripts/{filename}", srv.LogRequest(srv.ServeDirectory("static/scripts"))).Methods("GET")
	handler.HandleFunc("/stylesheets/{filename}", srv.LogRequest(srv.ServeDirectory("static/stylesheets"))).Methods("GET")
	srv.Server.Handler = handler
}
