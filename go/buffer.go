package main

import (
	"bytes"
	"fmt"
	"io"
	"os"
)

func main() {
	var b bytes.Buffer

	b.Write([]byte("Fuck"))

	fmt.Fprint(&b, "you!")

	io.Copy(os.Stdout, &b)
}
