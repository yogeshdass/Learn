package main

import (
	"fmt"
)

func main()  {
	bestFinish := bestLeagueFinishes(1,2,3,4,5,6)
	fmt.Println(bestFinish)
}
// n args to funcs
// range funtion returns index pos and data, so we discard the pos if not need
func bestLeagueFinishes(f ...int) int {
	for _, i := range f {
		fmt.Println(i)
	}
	return 0
}