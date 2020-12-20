//stand alone exe not a shared lib
package main

import (
	"fmt" //format package
	"runtime"
	"reflect" //reflection
)

//global scope
var (
	name, course string
	module float64
)
// Shared lib doesnt get a  main function
//no args no return 
func main()  {
	//Println -> capital to expose stuffs outside the package
	fmt.Println("Hola yogesh", runtime.GOOS)
	fmt.Println("Name is ", name, "and is type of ", reflect.TypeOf(name))
	fmt.Println("Module is ", module, "and is type of ", reflect.TypeOf(module))
	// works only in funct , and we are intializing it while declaring it
	name :=  "yogesh"
	module := 3.5
	ptr := &module
	fmt.Println("Module is ", module, "and is type of ", reflect.TypeOf(module))
	fmt.Println("Name is ", name, "and is type of ", reflect.TypeOf(name))

	fmt.Println("Memory address :", &module)
	fmt.Println("Memory address of moduel: ", ptr, "value of module var is ", *ptr)

}