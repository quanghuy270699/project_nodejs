import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobCompany } from "../recruitment/job.company.entity";
import { RecruitmentEntity } from "../recruitment/recruitment.entity";
import { User } from "../user-account/user.entity";
import { CVJobEntity } from "./job.cv.entity";


@Entity("cv_career")
export class JobCareer {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "career_name", nullable: true, length: 255 })
  career_name: string | null;

  @Column("varchar", { name: "descript", nullable: true, length: 255 })
  descript: string | null;

  @Column("datetime", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created_date: Date | null;

  @Column("int", { name: "active_flag", nullable: true, default: () => "'1'" })
  active_flag: number | null;

  @OneToOne(type => CVJobEntity, cVJobEntity => cVJobEntity.jobCarrer, { onDelete: 'CASCADE' })
  cVJobEntity: CVJobEntity

  @OneToOne(type => RecruitmentEntity, jobCompany => jobCompany.jobCareer, { onDelete: 'CASCADE' })
  jobsEntity: RecruitmentEntity
}
