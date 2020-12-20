package main

import "fmt"
// same as python 
func main()  {
	m1 := make(map[string]int)
	m1["key1"] = 1
	m1["key2"] = 2

	nm := map[string]int {
		"key3": 3,
		"key4": 4,
	}

	fmt.Printf("Map m1 => %v nad Map nm => %v", m1, nm)
}