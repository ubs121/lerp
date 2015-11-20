package main

import (
	"flag"
	"fmt"
	"lerp/rpc"
	"lerp/db"
	"log"
	"net/http"
	"os"
)

func main() {
	var (
		configFile = flag.String("config", "", "Path to an explicit configuration file.")
	)
	flag.Parse()

	// No command? It's time for usage.
	if len(os.Args) == 1 {
		Usage()
		os.Exit(1)
	}

	// TODO: load config
	log.Println(configFile)

	cmd:=os.Args[1]

	// connect to database
	log.Println("db connect...")

	db.Open("127.0.0.1")
	defer db.Close()

	switch cmd {
	case "meta":
	case "load":
		// cmd := os.Args[1]
		// newargs := make([]string, 0)
		// newargs = append(newargs, os.Args[0])
		// newargs = append(newargs, os.Args[2:]...)
		// os.Args = newargs
		//
		// bucket := os.Args[1]
		// for i := 2; i < len(os.Args); i++ {
		// 	db.Load(bucket, os.Args[i])
		// }
	case "repl":
		// TODO: repl
	case "http":
		// register services
		mux := http.NewServeMux()
		mux.HandleFunc("/", Welcome)
		rpc.RegisterDataService(mux)

		log.Println("Lerp is started...")

		//http.Handle("/file", http.StripPrefix("/file", http.FileServer(http.Dir("file"))))


		http.ListenAndServeTLS(":3000", "cert.pem", "key.pem", mux)


	default:
		fmt.Println("No command", cmd)
		flag.Usage()
	}

}

func Welcome(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte("Hello from Lerp.\n"))
}

func Usage() {
	fmt.Println("Lerp\n")
	fmt.Println("Usage:")
	fmt.Println("  lerp command [flags]\n")
	fmt.Println("Commands:")
	fmt.Println("  init\tХоосон бааз үүсгэнэ.")
	fmt.Println("  load\tФайлыг (*.nt, *.n3) бааз руу оруулна.")
	fmt.Println("  http\tStarts http service.")
	fmt.Println("  repl\tХарилцах горимд шилжинэ.")
	fmt.Println("\nФлагууд:")
	flag.Parse()
	flag.PrintDefaults()
}
