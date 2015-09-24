package file

import (
	"os"
	"testing"
)

func TestQuery(t *testing.T) {

	filePath := "../test/res/Job/"

	if _, e := os.Stat(filePath); os.IsNotExist(e) {
		// TODO: error check
		e = os.MkdirAll(filePath, 0700)

		if e != nil {
			panic(e)
		}
	}
}