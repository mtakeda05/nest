import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { OwnerModule } from '../owner.module';
import { OwnerService } from '../owner.service';
import { OwnerController } from '../owner.controller';
import { INestApplication } from '@nestjs/common';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import * as mongodb from 'mongodb';

describe('OwnerController', () => {
  let app: INestApplication;
  let ownerService: OwnerService;
  let ownerController: OwnerController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, OwnerModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    ownerController = module.get<OwnerController>(OwnerController);
    ownerService = module.get<OwnerService>(OwnerService);
  });

  afterAll(async () => {
    await ownerService.clean();
    await app.close();
  });

  describe('create', () => {
    it('should return created owner', async () => {
      const createOwnerDto: CreateOwnerDto = { id: '', name: 'John Doe', email: 'johndoe@test.com', customers: [] };
      const result = await ownerController.create(createOwnerDto);
      const createdOwner = await ownerService.findOne(result.id);

      const properties = ["id", "name", "email", "customers"];
      const filteredObject = Object.assign({}, ...properties.map(key => ({[key]: createdOwner[key]})));

      expect(filteredObject).toEqual({
        id: result.id,
        name: 'John Doe',
        email: 'johndoe@test.com',
        customers: []
      });
    });
  });

  describe('update', () => {
    let id = '';
    it('should fail to update owner', async () => {
      const createOwnerDto: CreateOwnerDto = { id: '', name: 'Jane Doe', email: 'janedoe@test.com', customers: [] };
      const result = await ownerController.create(createOwnerDto);

      id = result.id;
      const createdOwner = await ownerService.findOne(id);

      const customerId = new mongodb.ObjectId();
      createdOwner.customers.push(customerId);
      try {
        await ownerService.update(createdOwner);
      } catch (e) {
        expect(e.message).toBe('Invalid customer id.');
      }
    });

    it('should return updated owner', async () => {
      const createdOwner = await ownerService.findOne(id);
      createdOwner.name = 'Jane Doe Updated';
  
      await ownerService.update(createdOwner);

      const updatedOwner = await ownerService.findOne(id);

      const properties = ["id", "name", "email", "customers"];
      const filteredObject = Object.assign({}, ...properties.map(key => ({[key]: updatedOwner[key]})));

      expect(filteredObject).toEqual({
        id: id,
        name: 'Jane Doe Updated',
        email: 'janedoe@test.com',
        customers: []
      });
    });
  });
});
