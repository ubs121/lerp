package rpc

import (
	"log"
	"net"

	"golang.org/x/net/context"
)
)

// server is used to implement hellowrld.GreeterServer.
type HelloServer struct{}

// SayHello implements helloworld.GreeterServer
func (s *HelloServer) SayHello(ctx context.Context, in *HelloRequest) (*HelloReply, error) {
	return &HelloReply{Message: "Hello " + in.Name}, nil
}
