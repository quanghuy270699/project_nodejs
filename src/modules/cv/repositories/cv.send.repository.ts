import { Repository, EntityRepository } from 'typeorm';
import { CvJob } from '../cv.job.entity';

@EntityRepository(CvJob)
export class CVJobRepository extends Repository<CvJob> {
  
}