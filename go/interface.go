package main

import (
	"fmt"
)

type notifier interface {
	notify()
}

func sendNotification(n notifier) {
	n.notify()
}

type user struct {
	name  string
	email string
}

func (u *user) notify() {
	fmt.Printf("name:%s\nemail:%s\n", u.name, u.email)
}

func main() {
	userone := user{"Benny", "1026658608@qq.com"}
	sendNotification(&userone)
}
