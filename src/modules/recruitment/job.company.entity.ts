import { BaseEntity, Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { JobCareer } from "../cv-job/job.career.entity";
import { User } from "../user-account/user.entity";
import { FieldsCareer } from "./fields.career.entity";
import { RecruitmentEntity } from "./recruitment.entity";

@Entity("job_company", { schema: "cds_db_app" })
export class JobCompany extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "company_name", nullable: true, length: 255 })
  company_name: string | null;

  @Column("varchar", { name: "user_id", nullable: true })
  user_id: string | null;

  @Column("varchar", { name: "cover_url", nullable: true, length: 255 })
  cover_url: string | null;

  @Column({type: "simple-array", name: "description", nullable: true })
  description: string[] | null;

  @Column("varchar", { name: "location", nullable: true, length: 255 })
  location: string | null;

  @Column("varchar", { name: "size", nullable: true, length: 255 })
  size: string | null;

  @Column("varchar", { name: "fields_career", nullable: true})
  fields_career: number | null;

  @Column("datetime", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created_date: Date | null;

  @Column("datetime", { name: "updated_date", nullable: true })
  updated_date: Date | null;

  @Column("int", { name: "active_flag", nullable: true, default: () => "'1'" })
  active_flag: number | null;

  @Column({type: "simple-array", name: "intro", nullable: true})
  intro: string[] | null;

  @Column({type: "simple-array", name: "core_values", nullable: true })
  core_values: string[] | null;

  @Column("varchar", { name: "logo_url", nullable: true, length: 255 })
  logo_url: string | null;

  @Column("varchar", { name: "website", nullable: true, length: 45 })
  website: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 45 })
  email: string | null;

  @Column("varchar", { name: "phone_number", nullable: true, length: 45 })
  phone_number: string | null;

  @Column("varchar", { name: "tax_id", nullable: true, length: 45 })
  tax_id: string | null;


  @OneToOne(type => RecruitmentEntity, recruitmentEntity => recruitmentEntity.JobCompany, { cascade: true, nullable: false, eager: true })
  RecruitmentEntity: RecruitmentEntity;

  @OneToOne(type => FieldsCareer, fieldsCareer => fieldsCareer.jobCompany, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'fields_career', referencedColumnName: 'id'})
  FieldsCareer: FieldsCareer;

  @OneToOne(type => User, user => user.jobCompany, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
  User: User
}