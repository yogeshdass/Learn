// concurrency -> composition independently executing processes, it is about dealing alot of shit at once
//parallelism -> simlutaneous exec of code, doing alot of shit at once
/*
goroutines runs on threads, schduled by go runtime

goroutines are lightweight, go manages goroutines, less cpu switches,works similiar to aync , not a single thread, should use single threaded

go concurrency model is CSP (communicating sequential process), or Actor model , where actor pass messeages to each other using channels

*/

package main

import (
	"fmt"
	"time"
	"sync"
	"runtime"
)

func main()  {

	// To make it parallel instead of concurrency use runtim package and define GOMAXPROCS(), thats it
	runtime.GOMAXPROCS(2) // it will create 2 thread to run the goroutines

	var waitGrp sync.WaitGroup
	waitGrp.Add(2)
 // go runs the functions parallely , 1st one sleeps and second one works and notify the waitgroup that is  done, then 1st one prints amd notifies that its done, as there is nothing to wait main exits.
	go func() {
		defer waitGrp.Done()

		time.Sleep(5 * time.Second)
		fmt.Println("hello")
	}()

	go func() {
		defer waitGrp.Done()
		fmt.Println("test")
	}()

	waitGrp.Wait()
}