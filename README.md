# Implementando una arquitectura hexagonal con nestjs Parte I

No voy a profundizar en que es una arquitectura hexagonal, ya que tenemos un montón de recursos que te lo explican de forma detallada, pero ojo que cuando hablamos de este tipo de arquitecturas debemos entender los conceptos principales y no cerrarnos a seguir una pauta al 100%, ya que lo importante acá es definir el dominio de tu lógica de negocio como el núcleo de tu aplicación de todas formas acá la típica explicación más resumida posible porque este post es más código y práctica.

## ¿Qué es la arquitectura hexagonal?
Es un tipo de arquitectura de software que busca separar el core lógico de la aplicación (modelo de entidades y casos de uso) y dejarlo en el centro, aislado del exterior y de otras interacciones. Donde las interacciones serán componentes tecnológicos como servicios, bases de datos, UI, APIs, otros sistemas, colas, etc.
finalmente para lograr la conexión entre el core de la aplicación con el resto del sistema se realizara mediante puertos y adaptadores donde los puertos son el contrato definido para poder interactuar con el core y los adaptadores son la implementación lógica de estos es decir
los puertos son interfaces y los adaptadores son las implementaciones.

### Las capas básicas serian las siguientes en esta arquitectura:
* `Domain`: son las entidades, reglas de negocio y puertos que definiremos en nuestra aplicación las reglas y funcionalidades pueden estar encapsuladas en servicios de dominio.
* `Application`: aca definimos los casos de uso y puertos que necesitemos, esta capa se comunica con `domain` y hace uso de las reglas, las entidades y los servicios de dominio definidos. Los casos de uso pueden ser encapsulados en servicios de dominio
* `Infraestructure`: definimos nuestras implementaciones tecnologías configuraciones del framework, bases de datos, api rest y también acá implementamos la lógica de los adaptadores que se encargaran de comunicar la capa `infraestructure `con `application` o con `domain`

# ¿De verdad nos resulta útil esta arquitectura? ¿o mejor seguimos jugando al programador ninja?
Una arquitectura hexagonal es autoexplicativa y define una separación de la lógica de negocio de la implementación tecnológica, para sistemas que sabemos que a futuro necesiten ser escalables y mantenibles, pensar en este tipo de soluciones nos alejara de crear monstruos difíciles de corregir o de mejorar funcionalidades sin que otra parte del sistema falle sin saber qué sucedió.
Por último, no es solo aplicar patrones sofisticados de software ni la última moda de los libros de ingeniería, sino de que aplicaras los principios SOLID y podrás obtener una mejor forma de testear los casos de uso y reglas de negocio.

### Veamos el siguiente ejemplo de una típica arquitectura en capas la que aparece en tutoriales y en la mayoría de las aplicaciones simples funciona perfecto

```bash
 .
├──  controllers
│   └──  ProductController.ts
├──  model
│   └──  Product.ts
├──  repositories
│   └──  ProductRepository.ts
└──  services
    └──  ProductService.ts
```

En esta estructura podemos a simple vista decir que es una API de productos, pero no sabemos de qué se trata esa API, ¿es RESTful? ¿Es SOAP? O es un MVC también de seguro, la lógica está en la clase service, pero esto tampoco se explica por si solo para aplicaciones pequeñas este enfoque es suficiente, solo vemos el código fuente y listo, ¿pero en aplicaciones grandes en donde puede que no solo uses una base de datos? Y te integres con servicios como cache u otra estrategia de microservicios, podemos ordenar las capas de la aplicación y definir bien los servicios y separar responsabilidades, pero aún tendremos un problema que es el alto acoplamiento entre la lógica del negocio con el framework o librería implementada en el proyecto. Esto nos obliga a seguir las definiciones del framework o librería para hacer funcionar la aplicación, pero en realidad debe ser al revés el framework debe acoplarse a nuestras necesidades y no nosotros, entonces acá entra en juego los principios SOLID y las buenas prácticas de ingeniería.

### Ahora veamos una estructura de una arquitectura hexagonal



```bash
├──  core
│   ├──  application
│   │   ├──  ProductCreator.ts
│   │   └──  ProductSearcher.ts
│   └──  domain
│       ├──  entities
│       │   └──  Product.ts
│       ├──  ports
│       │   └──  repositories
│       │       └──  ProductRepository.ts
│       └──  services
│           └──  ProductService.ts
└──  infraestructure
    ├──  adapters
    │   └──  PostgresProductRepository.ts
    ├──  database
    │   └──  postgres
    │       └──  orm
    └──  http-server
        └──  api
            ├──  jwt
            ├──  model
            └──  restcontrollers
```

A simple vista ya entendemos la aplicación y la mayoría de su implementación tecnológica.
Partimos desde la capa `core` en esta encontramos el dominio con una entidad Producto y un ServiceProduct que sería un servicio de dominio y una carpeta llamada `ports` la cual expone la interfaz ProductRepository de como las capas superiores se comunicaran con el dominio y la implementación de esta es hecha por `infrasestructure/adapters` y como apreciamos existe un implementación PostgresProductRepository.
El dominio está definido ahora la capa superior de esta es llamada `application` la cual contiene los casos de uso, en esta ocasión vemos 2 casos de uso bastante descriptivos puede darse el caso que en vez de funciones creemos una clase ServiceApplication que contenga los casos de usos definidos como métodos.
la siguiente capa es `infraestructure` la cual se comunica con la cap `core` mediante los adaptadores dependiendo del framework la forma de instanciar los componentes de la capa core cambiaran, pero generalmente debemos crear componentes con el principio de inyección de dependencias.
En nuestra capa `infraestructure` podemos ver el módulo `database` donde se encuentra toda la lógica de conexión a postgres y finalmente vemos la capa `http-server` la cual contiene una api rest encapsulando toda la lógica http.

## Ejemplo con northwind database: Caso de uso crear productos

Como vimos, la arquitectura hexagonal se centra en el dominio del negocio como núcleo y todo lo relacionado con aspectos tecnológicos, librerías, frameworks o estrategias está separado pero comunicados con el concepto de puertos y adapters. Muy bien, ahora crearemos un ejemplo muy parecido a la estructura anterior basada en un proyecto con Nestjs


### Nos transformamos en product owner y describimos nuestro problema de negocio
 
 Crearemos un servicio encargado de crear productos en la base de datos Northwind. Northwind es muy utilizada por Microsoft en ejemplos,
Hablando brevemente sobre Northwind es un modelo de productos, órdenes de compras y empleados de una compañía que realizan las órdenes en esta primera iteración de nuestra implementación nos enfocaremos en los siguientes casos de usos.

* Creación de productos mediante un endpoint REST
* Validación de producto con categoría y proveedor válidos

Esta aplicación será una API Rest encargada de mantener los productos de la base de datos Northwind con el tiempo ira iterando con nuevas enseñanzas sobre arquitectura hexagonal.

## Iniciando el projecto Nestjs

```bash

nvm use 14
npm i -g @nestjs/cli
nest new nestjs-northwind-hexagonal
cd nestjs-northwind-hexagonal

``````

Ahora generaremos los siguientes módulos:

* `core`: Contendrá los submódulos
    * `domain`: Entidades, Servicios y Puertos de dominio
    * `application`: Casos de uso que se comunicaran con la capa inferior, es decir, la de dominio
* `infraestructure`: Implementará lógicas de los adaptadores encargados de comunicarse con la capa de dominio y application (core module)


```bash
nest g module core
nest g module infraestructure
```

## Creando la capa de dominio

Generaremos la siguiente estructura en la capa de dominio:
* entities: entidades relacionadas para la creación de un producto
* ports/inbound: acá se encuentran los puertos de entrada representan piezas de software que interactúan con el dominio y pueden cambiar el estado del dominio
* ports/outbound: representan los puertos de salida que interactúan con el mundo exterior es decir fuera de la capa de dominio y se relacionan con tecnologías o sistemas en este ejemplo son repositorios así que los adaptadores que implementen estas interfaces se comunicaran con alguna base de datos o método de persistencia cosa que el dominio no le interesa saber
* services: estos son los servicios de dominios eran las implementaciones de 'ports/inbound'son piezas de software que interactúan con las entidades y definen reglas de negocio también definiremos los tests unitarios.


```bash
 domain
├──  entities
│   ├──  Category.ts
│   ├──  Product.ts
│   └──  Supplier.ts
├──  ports
│   ├──  inbound
│   │   ├──  CategoryService.ts
│   │   ├──  ProductService.ts
│   │   └──  SupplierService.ts
│   └──  outbound
│       ├──  CategoryRepository.ts
│       ├──  ProductRepository.ts
│       └──  SupplierRepository.ts
└──  services
    ├──  CategoryDomainService.spec.ts
    ├──  CategoryDomainService.ts
    ├──  ProductDomainService.spec.ts
    ├──  ProductDomainService.ts
    ├──  SupplierDomainService.spec.ts
    └──  SupplierDomainService.ts
```

Generaremos la siguiente estructura en la capa de application:

* ProductApplication.ts: este componente será el contrato de como la capa de infraestructura se comunica con los casos de uso en esta ocasión esta clase contienen el método `createProduct()`
* services: contendrá la implementación de los servicios de aplicación y sus correspondientes test unitarios

```bash
 application
├──  ProductApplication.ts
└──  services
    ├──  ProductApplicationService.spec.ts
    └──  ProductApplicationService.ts
```
### Definición de entidades
```typescript

export class Category {
    categoryId: number;
    categoryName: string;
    description: string;
    picture: string;
}

export class Supplier {
    supplierId: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    homepage: string;    
}

export class Product {

    productId: number;
    productName: string;
    category: Category;
    supplier: Supplier;
    quantityPerUnit: number;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    discontinued: boolean;

    static create(name: string, category: Category, supplier: Supplier) {
        const product = new Product()
        product.productName = name
        product.category = category
        product.supplier = supplier
        product.discontinued = false
        product.quantityPerUnit = 0
        product.unitPrice = 0
        product.unitsInStock = 0
        product.unitsOnOrder = 0
        return product
    }

}
```
### Definición de Puertos

```typescript
// inbound ports
export interface CategoryService {
    findById(id: number): Promise<Category>;
    findAll(): Promise<Category[]>;
}

export interface SupplierRepository {
    findById(id: number): Promise<Supplier>;
}

export interface ProductService {
    save(product: Product): Promise<Product>;
    validateProductPrice(product: Product): boolean;
}
// outbound ports
export interface CategoryRepository {
    findById(id: number): Promise<Category>;
    findAll(): Promise<Category[]>
}

export interface SupplierRepository {
    findById(id: number): Promise<Supplier>;
}

export interface ProductRepository {
    save(product: Product): Promise<Product>;
}
```

### Definción de Servicios

Acá implementamos los contratos definidos en `ports/inbound` e inyectamos mediante su constructor los repositorios, entonces encapsulamos la lógica de negocio en la capa de dominio y no lo relacionamos con ningún ente externo como podrían ser anotaciones de Frameworks o librerías si necesitamos utilizar algo así solo debemos definir la funcionalidad como puertos

```typescript
export class ProductDomainService implements ProductService {

    constructor(private repository: ProductRepository) {}

    async save(product: Product): Promise<Product> {
        if (this.validateProductPrice(product)) {
            return this.repository.save(product)
        }
        throw new ProductServiceError('Product price cannot be negative or equal to zero')
    }

    validateProductPrice(product: Product): boolean {
        return product.unitPrice > 0
    }

}

export class CategoryDomainService implements CategoryService {

    constructor(private repository: CategoryRepository) {}

    findById(id: number): Promise<Category> {
        return this.repository.findById(id)
    }

    findAll(): Promise<Category[]> {
        return this.repository.findAll()
    }

}

export class SupplierDomainService implements SupplierService {

    constructor(private repository: SupplierRepository) {}

    findById(id: number): Promise<Supplier> {
        return this.repository.findById(id)
    }

}
```
### Definición de la capa application

Acá definimos el caso de uso, una opción también válida es reemplazar el nombre ProductApplication por algo más descriptivo como ProductCreator o algo de este estilo, pero lo importante acá es definir esta interfaz como punto de entrada para poder usar el caso de uso es importante que sea una interfaz también ya que facilita el reemplazo en las pruebas unitarias.

```typescript 
export interface ProductApplication {
    createProduct(newProduct: NewProductDTO): Promise<number>
}
```
### Implementación del caso de uso

Como podemos ver nuestro caso de uso tienen una lógica de validación algo más compleja que el servicio de dominio mientras un servicio de dominio se encarga de validaciones de negocio de su entidad relacionada, un servicio de aplicación o caso de uso puede hacer invocaciones a distintos servicios fuera del scope de la entidad en este caso estas validaciones con servicios de dominio de otras entidades es a modo de ejemplo, pero describe perfectamente la idea.

```typescript 
export class ProductApplicationService implements ProductApplication {

    constructor(
        private product: ProductService,
        private category: CategoryService,
        private supplier: SupplierService,
    ) { }

    async createProduct(newProduct: NewProductDTO) {
        const category = await this.category.findById(newProduct.categoryId)
        if (!category) {
            throw new ProductApplicationError(`Categoría no encontrada id=${newProduct.categoryId}`)
        }
        const supplier = await this.supplier.findById(newProduct.supplierId)
        if (!supplier) {
            throw new ProductApplicationError(`Proveedor no encontrado id=${newProduct.supplierId}`)
        }
        const entity = Product.create(newProduct.name, category, supplier)
        const saved = await this.product.save(entity)
        return saved.productId
    }

}
```
## Arquitectura hexagonal y la facilidad de los test unitarios

Al aplicar arquitectura hexagonal en nuestro proyecto los test unitarios suelen ser más simples de implementar, si se te da el caso en que aún te cuesta realizar un test unitario por dependencias o problemas de falseado de componentes puede que necesites refactorizar tus piezas de software y ver si se cumple el principio de responsabilidad única.

### test unitarios sobre ProductService

A continuación preparamos unos test unitarios sobre nuestro componente ProductDomainService los test son sencillos, pero validan el comportamiento deseado por las reglas de negocio.

```typescript
function ProductrepositoryMock(product: Product): ProductRepository {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe('ProductDomainService', () => {

    let service: ProductService = null

    it('should call ProductRepository.save()"', async () => {
        const repositoryMock =  ProductrepositoryMock(({ productId: 1} as Product))
        service = new ProductDomainService(repositoryMock)
        await service.save({ productId: 1, unitPrice: 100} as Product)
        expect(repositoryMock.save).toBeCalled()
    });

    it('should return true productService.validateProductPrice() when unitPrice is greater than 0 "', async () => {
        const repositoryMock =  ProductrepositoryMock(({ productId: 1} as Product))
        service = new ProductDomainService(repositoryMock)
        const result = service.validateProductPrice({ productId: 1, unitPrice: 100} as Product)
        expect(result).toBe(true)
    });

    it('should throw ProductServiceError when unitPrice is negative or zero"', async () => {
        const repositoryMock =  ProductrepositoryMock(({ productId: 1} as Product))
        service = new ProductDomainService(repositoryMock)
        await expect(service.save({ productId: 1, unitPrice: 0 } as Product)).rejects.toThrow(ProductServiceError)
        await expect(service.save({ productId: 1, unitPrice: -10 } as Product)).rejects.toThrow(ProductServiceError)
    });

})
```
## Capa de infraestructuctura

Generamos la siguiente estructura:

* `adapters`: serán las implementaciones de los puertos definidos en nuestra capa de dominio
* `http-server`: definiremos toda la lógica de nuestro servidor http en este caso solo tendremos un endpoint y un filtro http para controlar los errores en este módulo emplearemos Nestjs
* `northwind-database`: en este módulo tendremos la conexión a la base de datos Northwind y en esta parte estarán las entidades de base de datos no confundir con entidades de dominio son cosas distintas a pesar de que el modelo de la base de datos representa el negocio estas entidades están más relacionadas con TypeOrm que nada.

```bash
 infraestructure
├──  adapters
│   ├──  category.repository.adapter.ts
│   ├──  product.repository.adapter.ts
│   └──  supplier.repository.adapter.ts
├──  http-server
│   ├──  controllers
│   │   └──  product.controller.ts
│   ├──  exception-filters
│   │   └──  product-exception.filter.ts
│   └──  model
│       ├──  app.response.ts
│       └──  create-product.request.ts
├──  infraestructure.module.ts
├──  northwind-database
│   ├──  entities
│   │   ├──  category.entity.ts
│   │   ├──  product.entity.ts
│   │   └──  supplier.entity.ts
│   └──  northwind-database.module.ts
└──  shared
    └──  AppLogger.ts

```

## Iniciando la integración con Northwind

Para levantar la base de datos necesitar tener instalado docker y docker-compose ahora iniciamos nuestra base de datos de Northwind con docker-compose y un script del esquema de Northwind encontrados en el siguiente repositorio: [URL REPO] nos dirigimos al directorio northwind-db/ y ejecutamos:

```bash
# up database
docker-compose up -d 
# show running containers
docker ps 
```
Si todo salió bien tendremos la base de datos northwind con postgres como motor, ahora instalamos las librerías necesarias para conectarnos a la base de datos.

```bash
npm install --save @nestjs/typeorm typeorm pg
```
Como habíamos señalado en una arquitectura hexagonal, todas las interacciones fuera de nuestra lógica core deben hacerse en la capa infraestructure la cual es la que interactúa con el mundo exterior, entonces generaremos el siguiente submódulo de infraestructure.

```bash
nest g module infraestructure/northwind-database
```

Dentro de este módulo crearemos las entidades de base de datos que mapean las estructura de tablas del modelo, estas entidades no son los mismos que las entidades de capa de dominio son conceptos distintos en hexagonal, ya que Las entidades de dominio reflejan el modelo de negocio mientras que las entidades de base de datos reflejan las tablas y relaciones y algunos casos estos modelos no son iguales.

### Entidades de base de datos

A continuación definiremos las entidades de base de datos con sus correspondientes decoradores.

```typescript
@Entity({ name: 'products'})
export class ProductEntity {
    @PrimaryGeneratedColumn({name: 'product_id'})
    productId: number;
    @Column({ name: 'product_name'})
    productName: string;
    @Column({ name: 'quantity_per_unit'})
    quantityPerUnit: number;
    @Column({ name: 'unit_price'})
    unitPrice: number;
    @Column({ name: 'units_in_stock'})
    unitsInStock: number;
    @Column({ name: 'units_on_order'})
    unitsOnOrder: number;
    @Column({ default: false })
    discontinued: boolean;
    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: "category_id" })
    category: CategoryEntity;
    @ManyToOne(() => SupplierEntity)
    @JoinColumn({ name: "supplier_id" })
    supplier: SupplierEntity;
    
}

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn({ name: 'category_id' })
    categoryId: number;
    @Column({ name: 'category_name' })
    categoryName: string;
    @Column()
    description: string;
    @Column()
    picture: string;
    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
}

@Entity({ name: 'suppliers' })
export class SupplierEntity {
    @PrimaryGeneratedColumn({ name: 'supplier_id' })
    supplierId: number;
    @Column({ name: 'company_name' })
    companyName: string;
    @Column({ name: 'contact_name' })
    contactName: string;
    @Column({ name: 'contact_title' })
    contactTitle: string;
    @Column({ name: 'address' })
    address: string;
    @Column({ name: 'city' })
    city: string;
    @Column({ name: 'postal_code' })
    postalCode: string;
    @Column({ name: 'country' })
    country: string;
    @Column({ name: 'phone' })
    phone: string;
    @Column({ name: 'homepage' })
    homepage: string;
    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
}
```

El siguiente paso es inyectar el módulo de TypeOrm a NorthwindDatabaseModule. Agregamos las credenciales y definimos las entidades a utilizar con esto nuestro módulo está terminado.

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { SupplierEntity } from './entities/supplier.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'northwind',
            password: 'northwind',
            database: 'northwind',
            entities: [
                ProductEntity,
                CategoryEntity,
                SupplierEntity
            ],
            synchronize: false,
            logging:['query']
        }),
    ]
})
export class NorthwindDatabaseModule { }
```

## Definiendo los Adapters para los puertos de nuestra capa de dominio

Ahora como ya tenemos la persistencia lista, implementaremos los puertos de nuestra capa de dominio:

```typescript
@Injectable()
export class CategoryRepositoryAdapter implements CategoryRepository {

    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) { }
    
    async findById(id: number): Promise<Category> {
        return this.repository.findOneBy({ categoryId: id })
    }

    async findAll(): Promise<Category[]> {
        return this.repository.find()
    }
}

@Injectable()
export class SupplierRepositoryAdapter implements SupplierRepository {

    constructor(@InjectRepository(SupplierEntity) private repository: Repository<SupplierEntity>) { }

    async findById(id: number): Promise<Supplier> {
        return this.repository.findOneBy({ supplierId: id })
    }

}

@Injectable()
export class ProductRepositoryAdapter implements ProductRepository {

    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) { }

    async save(p: Product) {
        return this.repository.save(p)
    }

}
```

## Definiendo el módulo http-server

Ahora definiremos el módulo dehttp-server haciendo uso de Nestjs

### Modelo
```typescript
export interface AppResponse {
    status: number;
    message: string;
    data?: any
}
export interface CreateProductRequest {
    name: string;
    categoryId: number;
    supplierId: number;
}
```
### Exception Filter

Definiremos un exception filter para poder controlar las excepciones de una forma centralizada y sin tener que delegar esta responsabilidad de definir una respuesta a nuestros servicio de dominio o de aplicación, que lo haga el framework nos ahorraremos trycatch innecesarios.

```typescript
@Catch(ProductApplicationError)
export class ProductCreatorFilter implements ExceptionFilter {

    catch(exception: ProductApplicationError, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>()

        Logger.error(`ProductController (${request.method}) at {${request.path}} error: ${exception.message}`)

        response
            .status(HttpStatus.BAD_REQUEST)
            .json({
                status: HttpStatus.BAD_REQUEST,
                message: exception.message
            });

    }

}

```
### Controlador punto de entrada que invocara a ProductApplicationService

Ahora definimos en controlador que será el punto de entrada para poder crear el producto, este endpoint recibe un nombre de producto, una, id de categoría y un, id de proveedor. Esta clase hace uso de la anotación `@UseFilter()` Para poder emplear el filtro de excepciones que habíamos definido ahora la inyección de nuestro servicio lo hacemos mediante el constructor y la anotación `@Inject(PRODUCT_APPLICATION)` Necesitamos inyectar nuestro servicio de esta manera, ya que los servicio de dominio y de aplicación que definimos debemos crearlos mediante custom provider una opción que nos da Nestjs en escenario más complejos para la inyección de dependencias.

```typescript
@Controller('/product')
@UseFilters(ProductCreatorFilter)
export class ProductController {

    constructor(@Inject(PRODUCT_APPLICATION) private application: ProductApplication) {}

    @Post()
    async createProduct(@Body() request: CreateProductRequest): Promise<AppResponse> {
        
        AppLogger.log(`(POST) Create product`, request)
        const productId = await this.application.createProduct(request) 
        
        return {
            status: 201,
            message: `Product(id=${productId}) created OK`
        }

    }
}

```

El core de nuestra arquitectura hexagonal esta completo, definimos pruebas unitarias que validan las lógicas de negocio propuestas, y pudimos implementar un enfoque mas descriptivo de nuestra aplicación.

## ¿Que se viene despúes de tener nuestras capas domain, application e infraestructure?

 Ahora nos queda configurar los módulos `core`, `infraestructure` y `northwind-database`, para ello necesitamos definir CustomProviders y Módulos dinámicos de Nestjs, estos son temas avanzados dentro el framework que los abordaré en otro post con mayor detalle les dejaré el repositorio con el código donde podrán revisar la configuración, pero se vienen cosas más avanzadas donde explicaremos a fondo estas funcionalidades y que podemos hacer.

# Ejecución del proyecto

```bash
npm run start:dev
```
si la aplicaion pudo ejecutarse

crear el siguiente archivo `newProduct.json`

```json
{
  "name": "Quesito la vaquita",
  "categoryId": 1,
  "supplierId": 1
}
```
y realizamos la siguiente peticion con curl y jq para ver de forma formateada la salida

```bash
curl -s -X POST -d "$(cat newProduct.json)" -H "Content-Type: application/json" http://localhost:3000/product | jq
```

puedes ir cambiando los valores de supplierId o categoryid para ver como se comporta en los errores 

