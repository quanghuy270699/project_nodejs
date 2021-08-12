import { Repository, EntityRepository } from 'typeorm';
import { JobCareer } from '../career.job.entity';

@EntityRepository(JobCareer)
export class JobCareerRepository extends Repository<JobCareer> {
  
}