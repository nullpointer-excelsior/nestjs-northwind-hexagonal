import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './infraestructure/shared/shared.module';
import { HttpServerModule } from './infraestructure/http-server/http-server.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseSyncService } from './infraestructure/persistence/service/database-sync.service';

@Module({
  imports: [
    SharedModule,
    CoreModule,
    HttpServerModule,
    CqrsModule,
  ], 
  providers:[
    DatabaseSyncService
  ]
})
export class AppModule { 
  constructor(private sync: DatabaseSyncService) {
    this.sync.syncOrders().then(() => {

    })
    this.sync.syncProducts().then(()=>{
      
    })
    this.sync.syncCustomer().then(()=>{
      
    })
    this.sync.syncEmployee().then(()=>{
      
    })
    this.sync.syncShipper().then(()=>{
      
    })
  }
}
