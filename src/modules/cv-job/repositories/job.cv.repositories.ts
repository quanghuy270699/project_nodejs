import { Repository, EntityRepository } from 'typeorm';
import { CVJobEntity } from '../job.cv.entity';

@EntityRepository(CVJobEntity)
export class JobCVRepository extends Repository<CVJobEntity> {
  
}