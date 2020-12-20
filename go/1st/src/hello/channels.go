/*
channels can be :

Buffered : make(chan int, 5) with size and number of buffers, no lockup, goroutines puts data on channel and return, and other goroutines collect it, it will put data on and on and when the channel is full it goroutines get locked and wait for channel to be freed

unbuffered : make(chan int) but dont define its size, or number of bufferes in the channel. one goroutine put  data on a channel and wait for other goroutine to collect it. sending goutine locks until data collected and then unlocks to its work, kind of sync behaviour
*/
