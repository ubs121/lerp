COUNT

curl -H "Content-Type: application/json" -H "Token:1234567890"  -d "{\"jsonrpc\": \"2.0\",\"id\":\"1\", \"method\":\"db.Count\", \"params\":{\"Collection\":\"Job\", \"Query\": {\"name\":\"Шинжээч\"} }  }" http://localhost:8080/rpc

{"result":{"Count":19},"error":null,"id":1}


FIND

curl -H "Content-Type: application/json" -H "Token:1234567890"  -d "{\"id\":\"1\", \"method\":\"db.Find\", \"params\":{\"Collection\":\"Job\", \"Query\": {\"name\":\"Хөгжүүлэгч\"}, \"Limit\":1 }}" http://localhost:8080/rpc


SAVE
curl -H "Content-Type: application/json" -H "Token:1234567890" 
-d  "{\"id\":\"1\", \"method\":\"db.Insert\", \"params\":[{\"Collection\":\"Job\", \"Data\": {\"name\":\"Test121\"} }]}" http://localhost:8080/rpc

{"result":null,"error":null,"id":1}