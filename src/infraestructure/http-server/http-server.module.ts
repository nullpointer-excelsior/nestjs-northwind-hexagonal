import { Module } from "@nestjs/common";
import { CoreModule } from "../../core/core.module";
import { CategoryController } from "./controllers/category.controller";
import { CustomerController } from "./controllers/customer.controller";
import { EmployeeController } from "./controllers/employee.controller";
import { OrderController } from "./controllers/order.controller";
import { ProductController } from "./controllers/product.controller";
import { RootController } from "./controllers/root.controller";
import { ShipperController } from "./controllers/shipper.controller";

@Module({
    imports: [
        CoreModule,
    ],
    controllers: [
        RootController,
        ProductController,
        CategoryController,
        CustomerController,
        EmployeeController,
        ShipperController,
        OrderController
    ],
})
export class HttpServerModule {

}