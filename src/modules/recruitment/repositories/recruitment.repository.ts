import { Repository, EntityRepository } from 'typeorm';
import { RecruitmentEntity } from '../recruitment.entity';
@EntityRepository(RecruitmentEntity)
export class RecruitmentRepository extends Repository<RecruitmentEntity> {
}