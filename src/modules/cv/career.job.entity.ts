import { Column, Entity, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { JobCompany } from "../recruitment/job.company.entity";
import { RecruitmentEntity } from "../recruitment/recruitment.entity";
import { User } from "../user-account/user.entity";
import { UserProfile } from "../user-account/user.profile.entity";
import { CVEntity } from "./cv.entity";


@Entity("cv_career")
export class JobCareer {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "career_name", nullable: true, length: 255 })
  career_name: string | null;

  @Column("varchar", { select: false, name: "descript", nullable: true, length: 255 })
  descript: string | null;

  @Column("datetime", {select: false, 
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created_date: Date | null;

  @Column("int", { select: false, name: "active_flag", nullable: true, default: () => "'1'" })
  active_flag: number | null;

  @OneToOne(type => CVEntity, cVJobEntity => cVJobEntity.jobCareer, { onDelete: 'CASCADE' })
  cVJobEntity: CVEntity

  @ManyToOne(type => UserProfile, userProfile => userProfile.jobCareer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id', referencedColumnName: 'id'})
  userProfile: UserProfile

  @OneToOne(type => RecruitmentEntity, jobCompany => jobCompany.jobCareer, { onDelete: 'CASCADE' })
  jobsEntity: RecruitmentEntity
}
