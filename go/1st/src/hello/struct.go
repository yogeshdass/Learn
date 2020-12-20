package main

import "fmt"

func main()  {
	type metaData struct {
		name string
		age int
		salary float64
	}

	//var structvar metaData
	//it creates a pointer
	//meta :=  new(metaData)

	metainitialize := metaData{
		name: "yogesh",
		age: 30,
		salary: 16.05,
	}
	fmt.Println(metainitialize)
	fmt.Println(metainitialize.name)
}