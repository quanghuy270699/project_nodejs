import { Repository, EntityRepository } from 'typeorm';
import { FieldsCareer } from '../fields.career.entity';

@EntityRepository(FieldsCareer)
export class FieldsCareerRepository extends Repository<FieldsCareer> {
  
}