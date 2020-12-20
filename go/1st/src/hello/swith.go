package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main()  {

	switch "docker" {
	case "linux": 
		fmt.Println("Linux")
	case "unix":
		fmt.Println("Unix")
	default:
		fmt.Println("shit OS")	
	}

	switch tmpNum := random(); tmpNum {
	case 0, 2, 4, 6, 8:
		fmt.Println("eben")
	case 1, 3, 5, 7, 9:
		fmt.Println("odd")
	}	
}

func random() int {
	rand.Seed(time.Now().Unix())
	return rand.Intn(10)
}