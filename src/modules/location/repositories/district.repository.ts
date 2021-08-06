import { Repository, EntityRepository } from 'typeorm';
import { MDistrict } from '../district.entity';

@EntityRepository(MDistrict)
export class MDistrictRepository extends Repository<MDistrict> {
  
}