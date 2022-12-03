
create-product:
	cat newProduct.json
	curl -s -X POST -d "$(cat newProduct.json)" -H "Content-Type: application/json" http://localhost:3000/product | jq

create-example:
	rm -fR clean-architecture-examples/$(e)
	mkdir -p clean-architecture-examples/$(e)
	cp .env clean-architecture-examples/$(e)/
	cp .prettierrc clean-architecture-examples/$(e)/
	cp nest-cli.json clean-architecture-examples/$(e)/
	cp newProduct.json clean-architecture-examples/$(e)/
	cp -R northwind-db clean-architecture-examples/$(e)/
	cp package.json clean-architecture-examples/$(e)/
	cp -R src clean-architecture-examples/$(e)/
	cp -R test clean-architecture-examples/$(e)/
	cp tsconfig.build.json clean-architecture-examples/$(e)/
	cp tsconfig.json clean-architecture-examples/$(e)/


class:
	echo 'export class $(c) {\n\n\tconstructor() {}\n\n }' > $(p)/$(c).ts;
	code $(p)/$(c).ts

# unit-test:
# 	echo "describe('$(c) tests', () =>{\n\n" >> $(p)/$(c).spec.ts;
#     echo "\tit('', () => {" >> $(p)/$(c).spec.ts;
#     echo " " >> "$(p)/$(c).spec.ts";
#     echo "\t})" >> $(p)/$(c).spec.ts;
# 	echo "})" >> $(p)/$(c).spec.ts;
# 	code $(p)/$(c).ts
	
create-order:
	time curl -s -X POST -d '$(shell cat order.json)' -H "Content-Type: application/json" http://localhost:3000/purchase/order | jq

get-orders:
	time curl -s  "http://localhost:3000/purchase/order?page=1&size=10" | jq

up-infraestructure:
	docker start northwind-db
	docker start southwind-db