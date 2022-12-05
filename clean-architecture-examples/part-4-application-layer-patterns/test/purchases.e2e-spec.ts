import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateOrderRequest } from '../src/infraestructure/http-server/model/create-order.request';
import { PurchaseUseCases } from '../src/core/application/services/services/PurchaseUseCases';



describe('Purchases (e2e)', () => {

  let app: INestApplication;

  it('/purchase/order (POST) with Order created OK', async () => {

    const valueresponse = {
      customerId: '1',
      employeeId: 1,
      freight: 1,
      orderDate: '2022-11-27T16:27:08.113Z',
      orderDetails: [],
      requiredDate: '2022-11-27T16:27:08.113Z',
      shipAddress: 'los alerces',
      shipCity: 'santiago',
      shipCountry: 'chile',
      shipName: 'xxx',
      shippedDate: '2022-11-27T16:27:08.113Z',
      shipperId: 1,
      shipPostalCode: '00000',
      shipRegion: 'metropolitana'
    }

    const mock = {
      createOrder: jest.fn().mockResolvedValue(valueresponse)
    }

    const moduleFixture: TestingModule = await Test
      .createTestingModule({ imports: [AppModule] })
      .overrideProvider(PurchaseUseCases)
      .useValue(mock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const post: CreateOrderRequest = {
      customerId: '1',
      employeeId: 1,
      freight: 1,
      orderDetails: [],
      requiredDate: new Date(),
      shipAddress: 'los alerces',
      shipCity: 'santiago',
      shipCountry: 'chile',
      shipName: 'xxx',
      shippedDate: new Date(),
      shipperId: 1,
      shipPostalCode: '00000',
      shipRegion: 'metropolitana'
    }
    return request(app.getHttpServer())
      .post('/purchase/order')
      .send(post)
      .expect(201)
      .expect(valueresponse);
  });


  afterAll(async () => {
    await app.close();
  });

});

