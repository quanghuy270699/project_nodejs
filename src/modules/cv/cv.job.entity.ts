import { Column, Entity, ManyToOne, JoinColumn, BaseEntity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { RecruitmentEntity } from "../recruitment/recruitment.entity";
import { CVEntity } from "./cv.entity";

@Entity("cv_job", { schema: "app_cds" })
export class CvJob extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "job_id", nullable: true })
  job_id: number | null;

  @Column("int", { name: "user_id", nullable: true })
  user_id: number | null;

  @Column("int", {
    name: "status",
    nullable: true,
    comment: "trang thai cv",
    default: () => "'0'",
  })
  status: number | null;

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

  @Column("varchar", { name: "note", nullable: true, length: 255 })
  note: string | null;

  @Column("int", { name: "cv_id", nullable: true })
  cv_id: number | null;

  @ManyToOne(type =>CVEntity, cvEntity => cvEntity.cvJob, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cv_id',referencedColumnName: 'id' })
  CVEntity: CVEntity[];

  @OneToOne(type =>RecruitmentEntity, recruitment => recruitment.cvJob, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id', referencedColumnName: 'id' })
  Recruitment: RecruitmentEntity;
}