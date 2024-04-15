import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entities/role.entity';
import type { RolesEnum } from './enum/role.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    public repository: Repository<Roles>,
  ) {}

  async findByName(name: RolesEnum): Promise<Roles> {
    return this.repository.findOne({ where: { name } });
  }

  async findByNames(names: RolesEnum[]): Promise<Roles[]> {
    return this.repository.find({
      where: names.map((name) => ({ name })),
    });
  }
}
