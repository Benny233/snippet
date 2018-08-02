package main

import (
	"fmt"
	"strings"
)

var words string = "go run practice go go run"

func wordCount(s string) map[string]int {
	slice := strings.Fields(words)
	countsMap := map[string]int{}
	for i := range slice {
		if count,ok := countsMap[slice[i]]; ok {
			countsMap[slice[i]] = count + 1
		}else {
			countsMap[slice[i]] = 1
		}
	}
	return countsMap
}

func main() {
	fmt.Println(wordCount(words))
}


