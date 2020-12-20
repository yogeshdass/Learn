package main

import "fmt"

func main() {
	name := "yogesh"

	fmt.Println("NAME :", name)

	updateName(&name)
	fmt.Println(" updated NAME :", name)
}

func updateName(c *string) string {
	*c = "valeria"
	fmt.Println("NAME :", *c)
	return *c
}
