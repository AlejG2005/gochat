package main

import (
	"fmt"
	"io"
	"net/http"
)

var chatApi = "https://chat.joelsiervas.online"

func getMessages(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get(chatApi + "/messages")
	if err != nil {
		http.Error(w, "Error fetching messages", 500)
		return
	}
	defer resp.Body.Close()

	io.Copy(w, resp.Body)
}

func postMessage(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Post(chatApi+"/messages", "application/json", r.Body)
	if err != nil {
		http.Error(w, "Error posting message", 500)
		return
	}
	defer resp.Body.Close()

	io.Copy(w, resp.Body)
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("static")))
	http.HandleFunc("GET /api/messages", getMessages)
	http.HandleFunc("POST /api/messages", postMessage)

	fmt.Println("Server running on port 8000")
	http.ListenAndServe(":8000", nil)
}

