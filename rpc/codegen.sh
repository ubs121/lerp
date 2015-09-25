proto=$1
protoc -I=. --go_out=plugins=grpc:. $proto
