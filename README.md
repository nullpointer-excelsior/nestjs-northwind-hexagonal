# Arquitectura Hexagonal Sobre La Conocida Northwind con nestjs 

crearemos un ejemplo práctico y lo mas basado en la vida profesional sobre arquitectura hexagonal para lograr esto emplearemos la base de datos northwind montada sobre docker y nuestra aplicación será desarrollada con el framework progresivo Nestjs.

Hablando brevemente sobre la base de datos northwind es un modelo de productos ordenes de compras y empleados de una compañia que realizan las ordenes en esta priemra iteración de nuestra implementación nos enfocaremos en los siguientes casos de usos

* Creación de productos mediante una api REST 
* Filtro de productos por unos filtros definidos mediante una api REST

## Iniciando el projecto Nestjs

```bash

nvm use 14
npm i -g @nestjs/cli
nest new nestjs-northwind-hexagonal
cd nestjs-northwind-hexagonal

``````
