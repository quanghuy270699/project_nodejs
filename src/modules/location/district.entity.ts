import { BaseEntity, Column, Entity, JoinColumn, Index, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user-account/user.entity";
import { MProvince } from "./province.entity";
import { MWard } from "./ward.entity";

@Index("m_district_district_id_index", ["district_id"], {})
@Index("m_district_province_id_index", ["province_id"], {})
@Entity("m_district")
export class MDistrict extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "district_id", nullable: true })
  district_id: number | null;

  @Column("int", { name: "province_id", nullable: true })
  province_id: number | null;

  @Column("varchar", { name: "district_name", nullable: true, length: 200 })
  district_name: string | null;

  @Column("varchar", { name: "district_type", nullable: true, length: 200 })
  district_type: string | null;

  @Column("text", { name: "note", nullable: true })
  note: string | null;

  @Column("double", { name: "longitude", nullable: true, precision: 22 })
  longitude: number | null;

  @Column("double", { name: "latitude", nullable: true, precision: 22 })
  latitude: number | null;

  // @OneToOne(type => MProvince, province => province.mDistrict, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'province_id' })
  // mProvince: MProvince

  // @OneToOne(type =>MWard, mward => mward.mDictrict, { cascade: true, nullable: false, eager: true })
  // mWard: MWard;
}