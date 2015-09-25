package main

import (
	"flag"
	"fmt"
	"github.com/barakmich/glog"
	"github.com/bradfitz/http2"
	"log"
	"net/http"
	"os"
	"runtime"

	"lerp/rpc"
)

func main() {
	var (
		tripleFile = flag.String("triples", "", "Triple File to load.")
		configFile = flag.String("config", "", "Path to an explicit configuration file.")
	)
	flag.Parse()

	// No command? It's time for usage.
	if len(os.Args) == 1 {
		Usage()
		os.Exit(1)
	}

	// програмын тохиргоо ачаалах
	conf.Load("app.json")

	db.Open()
	defer db.Close()

	switch cmd {
	case "meta":
	case "load":
		cmd := os.Args[1]
		newargs := make([]string, 0)
		newargs = append(newargs, os.Args[0])
		newargs = append(newargs, os.Args[2:]...)
		os.Args = newargs

		bucket := os.Args[1]
		for i := 2; i < len(os.Args); i++ {
			db.Load(bucket, os.Args[i])
		}
	case "repl":
		// TODO: repl
	case "http":
		user.Init()

		// register services
		userRtr := user.Register()
		dbRtr := db.Register()

		var srv http.Server
		srv.Addr = ":4430"

		// handlers
		http.Handle(user.UrlPrefix+"/", user.Validate(userRtr))
		http.Handle(db.UrlPrefix+"/", user.Validate(dbRtr))
		http.Handle("/web", http.StripPrefix("/web", http.FileServer(http.Dir("web"))))

		http2.ConfigureServer(&srv, &http2.Server{})

		go func() {
			log.Fatal(srv.ListenAndServeTLS("server.crt", "server.key"))
		}()

		println("Lerp is started...")

		//log.Fatal(http.ListenAndServe(":"+conf.Conf["MainPort"], nil))

	default:
		fmt.Println("No command", cmd)
		flag.Usage()
	}

}


func Usage() {
	fmt.Println("Lerp\n")
	fmt.Println("Хэрэглэх заавар:")
	fmt.Println("  memex КОМАНД [flags]\n")
	fmt.Println("Командууд:")
	fmt.Println("  init\tХоосон бааз үүсгэнэ.")
	fmt.Println("  load\tФайлыг (*.nt, *.n3) бааз руу оруулна.")
	fmt.Println("  http\tВэб серверийг эхлүүлнэ.")
	fmt.Println("  repl\tХарилцах горимд шилжинэ.")
	fmt.Println("\nФлагууд:")
	flag.Parse()
	flag.PrintDefaults()
}
