package main

import (
	"fmt"
	"strings"
)

func main()  {
	module := "letmesee"
	name := "yogesh"
	fmt.Println(converter(module, name))
}

func converter(m, n string) (s1, s2 string) {
	m = strings.Title(m)
	n = strings.ToUpper(n)

	return m, n
}