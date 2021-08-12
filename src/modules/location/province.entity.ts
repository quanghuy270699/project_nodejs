import { BaseEntity, Column, Entity, OneToMany, JoinColumn, ManyToOne, OneToOne, Index, PrimaryGeneratedColumn } from "typeorm";
import { RecruitmentEntity } from "../recruitment/recruitment.entity";
import { UserProfile } from "../user-account/user.profile.entity";
import { MDistrict } from "./district.entity";
import { MWard } from "./ward.entity";

@Index("m_province_province_id_index", ["province_id"], {})
@Entity("m_province")
export class MProvince extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "ids"})
  ids: number;

  @Column("int", { name: "province_id", nullable: true })
  province_id: number | null;

  @Column("varchar", { name: "province_name", nullable: true, length: 200 })
  province_name: string | null;

  @Column("varchar", { select: false, name: "province_type", nullable: true, length: 200 })
  province_type: string | null;

  @Column("text", { select: false, name: "note", nullable: true })
  note: string | null;

  @Column("int", { select: false, name: "country_id", nullable: true })
  country_id: number | null;

  @Column("double", { select: false, name: "longitude", nullable: true, precision: 22 })
  longitude: number | null;

  @Column("double", { select: false, name: "latitude", nullable: true, precision: 22 })
  latitude: number | null;

  @ManyToOne(type =>RecruitmentEntity, recruit => recruit.province, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'province_id', referencedColumnName: 'province_id'})
  Recruitment: RecruitmentEntity;

  @ManyToOne(type =>UserProfile, userprofile => userprofile.mProvince, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'province_id', referencedColumnName: 'province_id'})
  userProfile: UserProfile;



}