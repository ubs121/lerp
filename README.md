# lerp

Lerp  (Light ERP) is a generic app server written in Go with MongoDB back-end.

version: 0.0.1

## Objective

* Go backed app server
* Schema-less data, MongoDB storage
* Generic web components using Polymer.js
* Бүх төрлийн мэдээллийг хадгалах, хайх боломжтой байна


# How to Run

## Generate self signed certificate

generate_cert --host localhost

## Compiling

```sh
$ go build cmd/lerp.go
```


## Run (serve http)

```sh
$ ./lerp http
```

# Project structure

Хавтасын бүтэц нь дараах байдалтай харагдана.

```
doc               Documentation, developer guide, user guide etc.
cmd               Executables, utils
rpc               RPC services
user              User module
app 			  Web front-end using Polymer.js
file              File, resource exchange module
db                Data layer
data              Demo data


```

## Browser requirement

Google Chrome 40+, Mozilla Firefox


# TODO:

* conf модулийг config -оор солих
* http://getawesomeness.com/get/go
* http://nicolewhite.github.io/
* https://github.com/davidmeza1/doctopics
* http://maurizzzio.github.io/greuler/


# Roadmap

* Граф өгөгдлийн сан дэмжинэ. Knowledge Graph based Database
	* http://worrydream.com/refs/Bush%20-%20Memex%20Revisited.pdf
	* http://www.freebase.com/
	* http://neo4j.com/blog/nasa-lesson-learned-database-using-neo4j-linkurious/

* Wiki дэлгэцийг эхэлж ажилд оруулах

* Plus
	Post, Panel дотоод дизайныг өөрчлөх: post buruu toolj bgaag zasax
	Post: хайлт нэмэх.

* Тайлан
	Tailangiin zagvar: Цагийн хүснэгт хоцорсон цаг тооцox. Xocorson, turuulj garsan tsag

* banner
	iframe.src="plus/zip_banner/lerp_banner.zip"
	Banner placeholder xiix


* File
	Parent, tataj bolox esexiig toxiruulax

* User
	Django mayagiin admin page xeregtei
