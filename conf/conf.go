package conf

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
)

var Conf map[string]string

func Load(confFile string) error {
	file, e := ioutil.ReadFile(confFile)
	if e != nil {
		log.Printf("File error: %v\n", e)
		os.Exit(1)
	}
	log.Printf("%s\n", string(file))
	return json.Unmarshal(file, &Conf)
}
