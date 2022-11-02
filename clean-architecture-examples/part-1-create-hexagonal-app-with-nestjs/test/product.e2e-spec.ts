import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductApplication } from '../src/core/application/ProductApplication';
import { CreateProductRequest } from '../src/infraestructure/http-server/model/create-product.request';
import { ProductApplicationError } from '../src/core/shared/error/ProductApplicationError';
import { PRODUCT_APPLICATION } from '../src/core/core.module';

function ProductCreatorMock(fn: any) {
  return {
    createProduct: fn
  } as ProductApplication
}

describe('ProductController (e2e)', () => {

  let app: INestApplication;

  it('/product (POST) with Product created OK', async () => {
    const mock = ProductCreatorMock(
      jest.fn().mockResolvedValue(1)
    )
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PRODUCT_APPLICATION)
      .useValue(mock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const body: CreateProductRequest = {
      name: 'dummy',
      categoryId: 1,
      supplierId: 1
    }
    return request(app.getHttpServer())
      .post('/product')
      .send(body)
      .expect(201)
      .expect({
        status: 201,
        message: 'Product(id=1) created OK'
      });
  });

  it('/product (POST) thows 400 invalid category id', async () => {

    const errorMessage = 'Category(id=100) Invalid'
    
    const mock = ProductCreatorMock(jest.fn().mockRejectedValue(new ProductApplicationError(errorMessage)))
    
    const body: CreateProductRequest = {
      name: 'dummy',
      categoryId: 100,
      supplierId: 100
    }

    const expected = {
      status: HttpStatus.BAD_REQUEST,
      message: errorMessage
    }

    const moduleFixture: TestingModule = await Test
      .createTestingModule({ imports: [AppModule] })
      .overrideProvider(PRODUCT_APPLICATION)
      .useValue(mock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    return request(app.getHttpServer())
      .post('/product')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(expected);

  });

  it('/product (POST) thows 400 invalid supplier id', async () => {

    const errorMessage = 'Supplier(id=100) Invalid'
    
    const mock = ProductCreatorMock(jest.fn().mockRejectedValue(new ProductApplicationError(errorMessage)))
    
    const body: CreateProductRequest = {
      name: 'dummy',
      categoryId: 1,
      supplierId: 100
    }

    const expected = {
      status: HttpStatus.BAD_REQUEST,
      message: errorMessage
    }
  
    const moduleFixture: TestingModule = await Test
      .createTestingModule({ imports: [AppModule] })
      .overrideProvider(PRODUCT_APPLICATION)
      .useValue(mock)
      .compile();
  
    app = moduleFixture.createNestApplication();
    await app.init();
  
    return request(app.getHttpServer())
      .post('/product')
      .send(body)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(expected);

  });

  afterAll(async () => {
    await app.close();
  });

});

