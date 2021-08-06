import { Repository, EntityRepository } from 'typeorm';
import { JobCompany } from '../job.company.entity';
@EntityRepository(JobCompany)
export class JobCompanyRepository extends Repository<JobCompany> {
}