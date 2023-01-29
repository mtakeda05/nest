import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './interfaces/owner.interface';
import { isTest } from '../../shared/utils';

@Injectable()
export class OwnerRepository {
  constructor(@InjectModel('Owner') private readonly ownerModel: Model<Owner>) { }

  async create(ownerDto: CreateOwnerDto) {
    const newOwner = new this.ownerModel(ownerDto);
    return await newOwner.save();
  }

  async findAll() {
    // exclude mongo id.
    return await this.ownerModel.find({}, { _id: 0 }).exec();
  }

  // this is not found by mongo id but by unqiue string id.
  async findOne(id: string) {
    return await this.ownerModel.findOne({id}).exec();
  }

  async findOneById(_id: mongoose.Types.ObjectId) {
    return await this.ownerModel.findById(_id).exec();
  }

  async update(ownerDto: UpdateOwnerDto) {
    return await this.ownerModel.findOneAndUpdate({id: ownerDto.id}, ownerDto, { new: true }).exec();
  }

  async delete(id: string) {
    return await this.ownerModel.findOneAndDelete({id}).exec();
  }

  async clean() {
    if (isTest()) {
      return await this.ownerModel.deleteMany({}).exec();
    }
  }
}
