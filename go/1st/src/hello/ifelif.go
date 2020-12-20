package main

import "fmt"

func main()  {
	//n1 := "1"
	//n2 := "2"

	//if <Statements>; <Expressions> {
	if n1, n2 := 1, 2; n1 < n2 {
		fmt.Println("1st")
	} else if n1 > n2 {
		fmt.Println("2nd")
	} else {
		fmt.Println("else 3rd")
	}
}