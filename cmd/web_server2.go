// Copyright 2014 The Go Authors.
// See https://code.google.com/p/go/source/browse/CONTRIBUTORS
// Licensed under the same terms as Go itself:
// https://code.google.com/p/go/source/browse/LICENSE

// +build h2demo

package main

import (
	"flag"
	"github.com/bradfitz/http2"
	"io"
	"log"
	"net/http"
)

func home(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, `<html>
<body>
<h1>Go + HTTP/2</h1>

<p>Welcome to <a href="https://golang.org/">the Go language</a>'s <a
href="https://http2.github.io/">HTTP/2</a> demo & interop server.</p>

<p>Congratulations, <b>you're using HTTP/2 right now</b>.</p>

<p>This server exists for others in the HTTP/2 community to test their HTTP/2 client implementations and point out flaws in our server.</p>

<p> The code is currently at <a
href="https://github.com/bradfitz/http2">github.com/bradfitz/http2</a>
but will move to the Go standard library at some point in the future
(enabled by default, without users needing to change their code).</p>

<p>Contact info: <i>bradfitz@golang.org</i>, or <a
href="https://github.com/bradfitz/http2/issues">file a bug</a>.</p>

<h2>Туршилт</h2>
<ul>
  <li>GET <a href="/reqinfo">/reqinfo</a> to dump the request + headers received</li>
  <li>GET <a href="/clockstream">/clockstream</a> streams the current time every second</li>
  <li>GET <a href="/gophertiles">/gophertiles</a> to see a page with a bunch of images</li>
  <li>GET <a href="/file/gopher.png">/file/gopher.png</a> for a small file (does If-Modified-Since, Content-Range, etc)</li>
  <li>GET <a href="/file/go.src.tar.gz">/file/go.src.tar.gz</a> for a larger file (~10 MB)</li>
  <li>GET <a href="/redirect">/redirect</a> to redirect back to / (this page)</li>
  <li>GET <a href="/goroutines">/goroutines</a> to see all active goroutines in this server</li>
  <li>PUT something to <a href="/crc32">/crc32</a> to get a count of number of bytes and its CRC-32</li>
</ul>

</body></html>`)
}

func main() {

	flag.Parse()

	var srv http.Server
	srv.Addr = ":4430"

	mux2 := http.NewServeMux()
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		mux2.ServeHTTP(w, r)
	})
	mux2.HandleFunc("/", home)

	http2.ConfigureServer(&srv, &http2.Server{})

	go func() {
		log.Fatal(srv.ListenAndServeTLS("server.crt", "server.key"))
	}()

	select {}
}
