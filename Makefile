SOURCE=$(wildcard *.go)
.PHONY: validate
validate:
	go mod download
	go mod tidy
	go vet $(SOURCE)
	go test -cover $(SOURCE)
.PHONY: build
build:
	go build -o taskall $(SOURCE)
