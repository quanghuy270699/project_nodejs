import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobCompany } from "./job.company.entity";
import { User } from "../user-account/user.entity";


@Entity("cv_career")
export class FieldsCareer {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column("varchar", { name: "career_name", nullable: true, length: 255 })
  career_name: string | null;

  @Column("varchar", { select: false,  name: "descript", nullable: true, length: 255 })
  descript: string | null;

  @Column("datetime", {select: false, 
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  created_date: Date | null;

  @Column("int", { select: false, name: "active_flag", nullable: true, default: () => "'1'" })
  active_flag: number | null;

  @OneToOne(type => JobCompany, jobCompany => jobCompany.FieldsCareer, { onDelete: 'CASCADE' })
  jobCompany: JobCompany
}
