# Nestjs Northwind Arquitectura Hexagonal

El siguiente proyecto tiene por finalidad implementar una aplicación basada en la base de datos NorthWind utilizando una arquitectura hexagonal con un enfoque a ejemplos prácticos y búscando escenarios realistas de arquitectura de software y microservicios. La explicación de la implementación de los códigos, patrones de diseño y casos de uso 
lo puedes encontrar en los siguientes links:

[Arquitectura hexagonal con Nestjs Part I](https://nullpointer-excelsior.github.io/posts/implementando-hexagonal-con-nestjs-part1/)


## Ejecución del proyecto

Para levantar la base de datos de Northwind debes tener instalado docker y docker-compose
```bash
#!/bin/bash
cd northwind-db/
docker-compose up -d
# verify northwind-db container status
docker ps -a
```


para levantar la aplicación te recomiendo nodejs 14 en adelante si tienes nvm mucho mejor
```bash
#!/bin/bash

#Node virtual environment
nvm use 14
npm install
npm run start:dev
```

Si la aplicación levanto exitosamente crear el siguiente archivo `newProduct.json`

```json
{
  "name": "Quesito la vaquita",
  "price": 2990,
  "categoryId": 1,
  "supplierId": 1
}
```
y realizamos la siguiente petición con curl y jq para ver de forma formateada la salida

```bash
curl -s -X POST -d "$(cat newProduct.json)" -H "Content-Type: application/json" http://localhost:3000/product | jq
```

puedes ir cambiando los valores de supplierId o categoryid para ver como se comporta en los errores 



