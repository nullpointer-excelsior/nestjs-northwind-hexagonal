import { Module } from "@nestjs/common";
import { ProductController } from "./controllers/product.controller";
import { RootController } from "./controllers/root.controller";

@Module({
    controllers: [
        RootController,
        ProductController
    ],
})
export class HttpServerModule {

}