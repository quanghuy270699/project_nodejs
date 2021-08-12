import { BaseEntity, Column, Entity, ManyToOne, JoinColumn, Index, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RecruitmentEntity } from "../recruitment/recruitment.entity";
import { User } from "../user-account/user.entity";
import { UserProfile } from "../user-account/user.profile.entity";
import { MProvince } from "./province.entity";
import { MWard } from "./ward.entity";

@Index("m_district_district_id_index", ["district_id"], {})
@Index("m_district_province_id_index", ["province_id"], {})
@Entity("m_district")
export class MDistrict extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "ids" })
  ids: number;

  @Column("int", { name: "district_id", nullable: true })
  district_id: number | null;

  @Column("int", { select: false, name: "province_id", nullable: true })
  province_id: number | null;

  @Column("varchar", { name: "district_name", nullable: true, length: 200 })
  district_name: string | null;

  @Column("varchar", { select: false, name: "district_type", nullable: true, length: 200 })
  district_type: string | null;

  @Column("text", { select: false, name: "note", nullable: true })
  note: string | null;

  @Column("double", { select: false, name: "longitude", nullable: true, precision: 22 })
  longitude: number | null;

  @Column("double", { select: false, name: "latitude", nullable: true, precision: 22 })
  latitude: number | null;


  // @ManyToOne(() => MProvince)
  // @JoinColumn({ name: 'province_id'})
  // province: MProvince;


  @ManyToOne(type =>RecruitmentEntity, recruit => recruit.district, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'district_id', referencedColumnName: 'district_id'})
  Recruitment: RecruitmentEntity;

  @ManyToOne(type =>UserProfile, userprofile => userprofile.mDistrict, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'district_id',referencedColumnName: 'district_id' })
  userProfile: UserProfile;
}