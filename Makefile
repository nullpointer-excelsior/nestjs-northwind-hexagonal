
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

	

