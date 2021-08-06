import { BaseEntity, Column, JoinColumn,
  OneToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { JobCareer } from "../cv-job/job.career.entity";
import { JobCompany } from "./job.company.entity";

@Entity("recruitment", { schema: "cds_db_app" })
export class RecruitmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("int", { name: "active_flag", nullable: true, default: () => "'1'" })
  active_flag: number | null;

  @Column("datetime", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created_date: Date | null;

  @Column("datetime", { name: "updated_date", nullable: true })
  updated_date: Date | null;

  @Column("datetime", {
    name: "posted_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  posted_date: Date | null;

  @Column("varchar", { name: "level_id", nullable: true })
  level_id: string | null;

  @Column("int", { name: "career_id", nullable: true })
  career_id: number | null;

  @Column("varchar", { name: "user_id", nullable: true })
  user_id: string | null;

  @Column({ type: "simple-array", name: "description", nullable: true })
  description: string[] | null;

  @Column("varchar", { name: "require_degree", nullable: true, length: 1000 })
  require_degree: string | null;

  @Column("varchar", { name: "job_type", nullable: true, length: 50 })
  job_type: string | null;

  @Column("varchar", { name: "require_amount", nullable: true, length: 50 })
  require_amount: string | null;

  @Column("int", { name: "require_age_start", nullable: true })
  require_age_start: number | null;

  @Column("int", { name: "require_age_end", nullable: true })
  require_age_end: number | null;

  @Column("int", {
    name: "require_gender",
    nullable: true,
    comment: "- 0 nữ, 1 - nam",
  })
  
  @Column("int", { name: "require_gender", nullable: true })
  require_gender: number | null;

  @Column({type: "simple-array",
    name: "require_experience",
    nullable: true,
  })
  require_experience: string[] | null;

  @Column({type: "simple-array",
  name: "employee_benefits",
  nullable: true,
  })
  employee_benefits: string[] | null;

  @Column("varchar", {
    name: "require_time",
    nullable: true,
    comment: "- 0 partime, 1 - fulltime",
    length: 255,
  })
  require_time: string | null;

  @Column("int", { name: "salary_min", nullable: true })
  salary_min: number | null;

  @Column("int", { name: "salary_max", nullable: true })
  salary_max: number | null;

  @Column("datetime", { name: "expired_date", nullable: true })
  expired_date: string | null;

  @Column("int", { name: "province_id", nullable: true })
  province_id: number | null;

  @Column("int", { name: "district_id", nullable: true })
  district_id: number | null;

  @Column("int", { name: "ward_id", nullable: true })
  ward_id: number | null;


  @OneToOne(type => JobCareer, jobCareer => jobCareer.jobsEntity, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'career_id', referencedColumnName: 'id'})
  jobCareer: JobCareer;

  // @OneToOne(type => JobCompany, jobCompany => jobCompany.jobsEntity, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  // @JoinColumn({ name: 'job_career', referencedColumnName: 'id'})
  // JobCompany: JobCompany;

  @OneToOne(type => JobCompany, jobCompany => jobCompany.RecruitmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
  JobCompany: JobCompany
}
