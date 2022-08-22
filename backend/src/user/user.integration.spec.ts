import { Decimal } from '@prisma/client/runtime';
import { IGetAllUsers } from './dto/testInterfaces/IGetAllUsers';

import { UserService } from '../user/user.service';
import { Test } from '@nestjs/testing';

import { UserModule } from './user.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { IGetUserById } from './dto/testInterfaces/IGetUserById';

describe('Users realeted', () => {
  describe('Should pass when', () => {
    let app: INestApplication;
    const usersService = new UserService();

    const mockAllUsers: IGetAllUsers[] = [
      {
        name: 'Adran Carnavale',
        email: 'adranzim@email.com',
        id: 'ff88a2a1-1df1-4b50-9131-1ef81614fada',
      },
      {
        name: 'João Victor Fausto',
        email: 'bescoito@email.com',
        id: '6c3bcf2f-44c0-4837-b7bb-76fd29d2d31f',
      },
      {
        name: 'Igor Brendow',
        email: 'nony@email.com',
        id: '257ce681-adff-4fd0-a69b-09cef6dc687a',
      },
      {
        name: 'Carlos Augusto',
        email: 'calo@email.com',
        id: 'f2ba7e8a-761e-4b14-b85e-60fd7a766a21',
      },
      {
        name: 'João Paulo Silva',
        email: 'pasip@email.com',
        id: '15e03351-6721-4ddf-b0a2-7d0624930c0c',
      },
      {
        name: 'Alberto Paz',
        email: 'albertopaz@email.com',
        id: '2a23d904-15c6-4205-a37d-626305662f5a',
      },
      {
        name: 'Caleb Lima',
        email: 'cleb@email.com',
        id: '0ec82872-7d3f-42cc-b038-5bc567b6e57f',
      },
      {
        name: 'Vitor Berlarmino',
        email: 'vitorb@email.com',
        id: '4ec56b91-0c80-4a7c-bb66-107a6edad833',
      },
      {
        name: 'Test',
        email: 'tests1@test.com',
        id: '376bc779-d36b-4696-b6e2-67cff98c8cce',
      },
      {
        name: 'TEST USER',
        email: 'testuser@test.com',
        id: 'f3612a07-19ad-4ab3-8174-bc2e6a695826',
      },
      {
        name: 'TEST USER',
        email: 'testuser2@test.com',
        id: '335931f0-e10c-4124-ab2f-6b6f35d038de',
      },
      {
        name: 'TEST USER 4',
        email: 'testuser4@test.com',
        id: '0ffd502d-d113-47dc-a3fa-7878fdec921d',
      },
      {
        name: 'TRANSACTION TEST USER ',
        email: 'transactiontest@test.com',
        id: '6c1bdde0-f273-4a1a-9a7a-8845b60c2393',
      },
      {
        name: 'Teste Update 3',
        email: 'testuser5@test.com',
        id: 'd7dff03d-22e4-4a92-bc8f-25851a404560',
      },
      {
        name: 'MOCK TEST USER ',
        email: 'mocktest@test.com',
        id: '36484a78-fa4a-4c48-bb90-b7c44f1b2fff',
      },
    ];

    const mockByIdUser: IGetUserById = {
      name: 'Test',
      balance: 0 as unknown as Decimal,
      madeTransactions: [],
      receivedTransactions: [],
      senderPerson: [],
      recipientPerson: [],
    };

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [UserModule],
      })
        .overrideProvider(UserService)
        .useValue(usersService)
        .compile();

      app = moduleRef.createNestApplication();

      await app.init();

      jest.spyOn(usersService, 'findAll').mockResolvedValue(mockAllUsers);
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockByIdUser);

      jest.spyOn(usersService, 'loginValidation').mockResolvedValue('token');
      jest.spyOn(usersService, 'create').mockResolvedValue('token');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('/user returns all users', async () => {
      const response = await request(app.getHttpServer()).get('/user');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAllUsers);
    });

    it('/user/:id returns an user', async () => {
      const response = await request(app.getHttpServer()).get(
        '/user/376bc779-d36b-4696-b6e2-67cff98c8cce',
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockByIdUser);
    });

    it('/login returns a token', async () => {
      const response = await request(app.getHttpServer()).get('/login').send({
        email: 'testuser4@test.com',
        password: '123456',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token: 'token',
        statusCode: 200,
        message: 'Login success!',
      });
    });

    it('/user/create returns user token', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/create')
        .send({
          name: 'Test',
          email: '',
        });

      expect(response.status).toBe(201);
    });
  });
});
