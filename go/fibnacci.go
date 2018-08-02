package main

import (
	"fmt"
)

func fibonacci() func() int {
	index := 0
	fib := [100]int{0, 1}
	return func() int {
		fib[index + 2] = fib[index] + fib[index + 1]
		num := fib[index]
		index++
		return num
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}


