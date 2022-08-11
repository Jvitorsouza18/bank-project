import { Test, TestingModule } from '@nestjs/testing';
import userTest from './testUtils/IdObjetc';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service = new UserService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result = [{ name: 'John Doe', email: 'test@test.com', id: '1' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(controller.findAll()).resolves.toBe(result);
  });

  it('return by id should return one user', async () => {
    const spy = jest.spyOn(service, 'findOne').mockImplementation();
    service.findOne('1');
    expect(spy).toHaveBeenCalled();
  });
});
