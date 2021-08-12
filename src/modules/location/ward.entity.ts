import { BaseEntity, Column, Entity, OneToMany, OneToOne, ManyToOne, JoinColumn, Index, PrimaryGeneratedColumn } from "typeorm";
import { UserProfile } from "../user-account/user.profile.entity";
import { MDistrict } from "./district.entity";
import { MProvince } from "./province.entity";

@Index("m_ward_district_id_index", ["district_id"], {})
@Index("m_ward_province_id_index", ["province_id"], {})
@Index("m_ward_ward_id_index", ["ward_id"], {})
@Entity("m_ward")
export class MWard extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "ward_id", nullable: true })
  ward_id: number | null;

  @Column("int", { select: false, name: "district_id", nullable: true })
  district_id: number | null;

  @Column("int", { select: false, name: "province_id", nullable: true })
  province_id: number | null;

  @Column("varchar", { name: "ward_name", nullable: true, length: 200 })
  ward_name: string | null;

  @Column("varchar", { select: false,  name: "ward_type", nullable: true, length: 200 })
  ward_type: string | null;

  @Column("int", { select: false, name: "sorted", nullable: true })
  sorted: number | null;

  @Column("double", { select: false, name: "longitude", nullable: true, precision: 22 })
  longitude: number | null;

  @Column("double", { select: false, name: "latitude", nullable: true, precision: 22 })
  latitude: number | null;

  @Column("varchar", { select: false, name: "note", nullable: true, length: 20 })
  note: string | null;

  @ManyToOne(() => MDistrict)
  @JoinColumn({ name: 'district_id'})
  district: MDistrict;

  @ManyToOne(type =>UserProfile, userprofile => userprofile.mWard, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ward_id',referencedColumnName: 'ward_id' })
  userProfile: UserProfile;

  // @OneToOne(type => MDistrict, mdistrict => mdistrict.mWard, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'district_id' })
  // mDictrict: MDistrict

  // @OneToOne(type => MProvince, province => province.mWard, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'province_id' })
  // mProvince: MProvince
}