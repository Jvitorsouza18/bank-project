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

    create: () => {
      return 'token';
    },

    findOne: () => {
      return {
        name: 'User',
        balance: '2000',
        madeTransactions: [],
        receivedTransactions: [],
      };
    },

    login: () => {
      return {
        statusCode: 201,
        message: 'Login success!',
        token: 'token',
      };
    },

    loginValidation: () => {
      return 'token';
    },
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

  afterAll((done) => {
    done();
  });

  beforeAll((done) => {
    done();
  });

  it('get all users route should be defined', async () => {
    await request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect(service.findAll());
  });

  it('create user route should return a token', async () => {
    await request(app.getHttpServer())
      .post('/user/create')
      .expect(201)
      .expect({ token: service.create() });
  });

  it('find user by id route should be defined', async () => {
    await request(app.getHttpServer())
      .get('/user/1')
      .expect(200)
      .expect(service.findOne());
  });

  it('login route should be defined', async () => {
    jest.spyOn(service, 'loginValidation');

    await request(app.getHttpServer())
      .get('/login')
      .expect(200)
      .expect(service.login());
  });
});
