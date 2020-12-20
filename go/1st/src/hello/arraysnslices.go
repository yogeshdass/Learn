/*
slices are references to the actual value of array elments
Slices are dynamic
Array is fixed length
*/

package main

import (
	"fmt"
	"strconv"
)

func main() {

	//	myCourses := make([]string, 5)
	//	mySubs :=  []string{"doker", "python"}
	mySlice := make([]int, 1, 4)
	fmt.Printf("Length is : %d and Capacity is : %d", len(mySlice), cap(mySlice))

	fmt.Printf("Length is : "+strconv.Itoa(len(mySlice))+" and Capacity is :"+strconv.Itoa(cap(mySlice)))

	for i := 1; i < 17; i++ {
		mySlice = append(mySlice, i)
		fmt.Printf("\n capacity is : %d", cap(mySlice))
	}

	fmt.Printf("\n Final Slices : %v", mySlice)
}
