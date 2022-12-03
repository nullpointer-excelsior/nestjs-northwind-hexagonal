	
create-order:
	time curl -s -X POST -d '$(shell cat order.json)' -H "Content-Type: application/json" http://localhost:3000/purchase/order | jq

get-orders:
	time curl -s  "http://localhost:3000/purchase/order?page=1&size=10" | jq