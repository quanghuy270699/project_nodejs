import { BaseEntity, Entity, PrimaryColumn, ManyToOne, OneToMany, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { JobCareer } from '../cv/career.job.entity';
import { MDistrict } from '../location/district.entity';
import { MProvince } from '../location/province.entity';
import { MWard } from '../location/ward.entity';
import { FieldsCareer } from '../recruitment/fields.career.entity';
import { User } from './user.entity';

@Entity('app_user_profile')
export class UserProfile extends BaseEntity {
  @PrimaryColumn({ type: 'bigint', name: 'id'})
  id: number;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar' })
  birthday: string;

  @Column({ type: 'int' })
  gender: number;

  @Column({ type: 'int' })
  career_id: number;

  @Column({ type: 'varchar' })
  cccd: string

  @Column({ type: 'varchar'})
  cccd_date: string;

  @Column({ type: 'varchar' })
  cccd_location: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  hometown: string;

  @Column({ type: 'varchar' })
  permanent_address: string;

  @Column({ type: 'varchar' })
  image_face_url: string;

  @Column({ type: 'varchar' })
  image_profile_url: string;

  @Column({ type: 'varchar' })
  image_cccd_front_url: string;

  @Column({ type: 'varchar' })
  image_cccd_back_url: string;

  @Column({ type: 'bool' })
  has_cv: boolean;

  @Column({ type: 'bool' })
  ekyc: boolean;

  @Column({ type: 'bool' })
  is_recruitment: boolean;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  qrcode_url: string;

  @CreateDateColumn({ type: 'date', name: 'email_verified_at' })
  email_verified_at: Date;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updated_at: Date;

  @UpdateDateColumn({ type: 'int', name: 'deleted' })
  deleted: number;

  @Column("int", { name: "province_id", nullable: true })
  province_id: number | null;

  @Column("int", { name: "district_id", nullable: true })
  district_id: number | null;

  @Column("int", { name: "ward_id", nullable: true })
  ward_id: number | null;



  @OneToOne(type => User, user => user.Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  User: User


  @OneToOne(type => JobCareer, jobCareer => jobCareer.userProfile, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'career_id', referencedColumnName: 'id'})
  jobCareer: JobCareer;

  @OneToOne(type => MProvince, mProvince => mProvince.userProfile, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'province_id', referencedColumnName: 'province_id'})
  mProvince?: MProvince

  @OneToOne(type => MDistrict, mDistrict => mDistrict.userProfile, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'district_id',referencedColumnName: 'district_id' })
  mDistrict: MDistrict

  @OneToOne(type => MWard, mWard => mWard.userProfile, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  @JoinColumn({ name: 'ward_id',referencedColumnName: 'ward_id' })
  mWard: MWard


  // @OneToOne(type => FieldsCareer, fieldsCareer => fieldsCareer.jobCompany, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE'})
  // @JoinColumn({ name: 'fields_career', referencedColumnName: 'id'})
  // FieldsCareer: FieldsCareer;
}
