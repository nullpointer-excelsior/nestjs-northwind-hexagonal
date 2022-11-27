import { Module } from "@nestjs/common";
import { CoreModule } from "../../core/core.module";
import { CustomerPortfolioController } from "./controllers/customer-portfolio.controller";
import { CompanyController } from "./controllers/company.controller";
import { PurchaseController } from "./controllers/purchase.controller";
import { CatalogController } from "./controllers/catalog.controller";
import { ShipperController } from "./controllers/company-suppliers.controller";

@Module({
    imports: [
        CoreModule,
    ],
    controllers: [
        CatalogController,
        CustomerPortfolioController,
        CompanyController,
        ShipperController,
        PurchaseController
    ],
})
export class HttpServerModule {

}