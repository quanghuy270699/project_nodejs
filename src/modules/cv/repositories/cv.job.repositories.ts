import { Repository, EntityRepository } from 'typeorm';
import { CVEntity } from '../cv.entity';

@EntityRepository(CVEntity)
export class JobCVRepository extends Repository<CVEntity> {
  
}