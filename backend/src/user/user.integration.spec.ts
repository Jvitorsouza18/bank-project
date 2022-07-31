import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('UserController', () => {
  let app: INestApplication;

  const service = {
    findAll: () => [
      {
        name: 'name',
        email: 'email',
      },
    ],
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(service)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('should be defined', () => {
    request(app.getHttpServer()).get('/users').expect(200).expect({
      data: service.findAll(),
    });
  });
});
