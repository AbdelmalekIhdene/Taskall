package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path"
	"syscall"
	"time"

	"gopkg.in/natefinch/lumberjack.v2"
)

func clean(srv *server, cancel context.CancelFunc) {
	srv.DB.Close()
	cancel()
}

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	home, err := os.UserHomeDir()
	if err != nil {
		return err
	}
	log.SetOutput(&lumberjack.Logger{
		Filename:   path.Join(home, "logs/taskall/access.log"),
		MaxSize:    100,
		MaxBackups: 10,
	})
	srv := NewServer()
	go func() {
		log.Println("Starting up server...")
		if err := srv.Server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()
	done := make(chan os.Signal, 1)
	signal.Notify(done, syscall.SIGINT, syscall.SIGTERM)
	<-done
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer clean(srv, cancel)
	log.Println("Shutting down server...")
	return srv.Server.Shutdown(ctx)
}
