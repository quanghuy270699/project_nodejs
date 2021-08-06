import { Repository, EntityRepository } from 'typeorm';
import { JobCareer } from '../job.career.entity';

@EntityRepository(JobCareer)
export class JobCareerRepository extends Repository<JobCareer> {
  
}