import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { JobCareer } from "./career.job.entity";
import { CvJob } from "./cv.job.entity";

@Entity("cv")
export class CVEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column("varchar", { name: "cv_name", nullable: true, length: 255 })
  cv_name: string | null;

  @Column("varchar", { name: "full_name", nullable: true, length: 255 })
  full_name: string | null;

  @Column("varchar", { name: "birthday", nullable: true })
  birthday: string | null;

  @Column("int", { name: "gender", nullable: true })
  gender: number | null;

  @Column("varchar", { name: "phone_number", nullable: true, length: 255 })
  phone_number: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("int", { name: "active_flag", nullable: true, default: () => "'1'" })
  active_flag: number | null;

  @Column("timestamp", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created_date: Date | null;

  @Column("datetime", { name: "updated_date", nullable: true })
  updated_date: Date | null;

  @Column({type: "simple-array", name: "education", nullable: true })
  education: string[] | null;

  @Column({type: "simple-array", name: "experience", nullable: true })
  experience: string[] | null;

  @Column({type: "simple-array", name: "skills", nullable: true })
  skills: string[] | null;

  @Column("varchar", { name: "avatar_url", nullable: true, length: 255 })
  avatar_url: string | null;

  @Column("int", { name: "user_id", nullable: true })
  user_id: number | null;

  @Column("int", { name: "career_id", nullable: true })
  career_id: number | null;

  @Column("int", { name: "expected_salary", nullable: true })
  expected_salary: number | null;

  @Column("int", { name: "province_id", nullable: true })
  province_id: number | null;

  @Column("int", { name: "district_id", nullable: true })
  district_id: number | null;

  @Column("int", { name: "ward_id", nullable: true })
  ward_id: number | null;

  @Column("varchar", { name: "degree", nullable: true, length: 255 })
  degree: string | null;

  @Column("varchar", { name: "require_time", nullable: true, length: 255 })
  require_time: string | null;

  @OneToOne(type => JobCareer, jobCareer => jobCareer.cVJobEntity, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'career_id', referencedColumnName: 'id'})
  jobCareer: JobCareer;

  @OneToMany(type => CvJob, cvjob => cvjob.CVEntity, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'id',referencedColumnName: 'cv_id' })
  cvJob: CvJob
}
