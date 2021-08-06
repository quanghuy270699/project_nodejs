import { BaseEntity, Column, Entity, OneToOne, Index, PrimaryGeneratedColumn } from "typeorm";
import { MDistrict } from "./district.entity";
import { MWard } from "./ward.entity";

@Index("m_province_province_id_index", ["province_id"], {})
@Entity("m_province")
export class MProvince extends BaseEntity{
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "province_id", nullable: true })
  province_id: number | null;

  @Column("varchar", { name: "province_name", nullable: true, length: 200 })
  province_name: string | null;

  @Column("varchar", { name: "province_type", nullable: true, length: 200 })
  province_type: string | null;

  @Column("text", { name: "note", nullable: true })
  note: string | null;

  @Column("int", { name: "country_id", nullable: true })
  country_id: number | null;

  @Column("double", { name: "longitude", nullable: true, precision: 22 })
  longitude: number | null;

  @Column("double", { name: "latitude", nullable: true, precision: 22 })
  latitude: number | null;

  // @OneToOne(type => MDistrict, district => district.mProvince, { cascade: true, nullable: false, eager: true })
  // mDistrict: MDistrict;

  // @OneToOne(type =>MWard, mward => mward.mProvince, { cascade: true, nullable: false, eager: true })
  // mWard: MWard;
}