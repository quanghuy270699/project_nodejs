import { BaseEntity, Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('app_user_profile')
export class UserProfile extends BaseEntity {
  @PrimaryColumn({ type: 'bigint', name: 'id'})
  id: string;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar' })
  birthday: string;

  @Column({ type: 'int' })
  gender: number;

  @Column({ type: 'varchar' })
  cccd: string

  @Column({ type: 'varchar'})
  cccd_date: string;

  @Column({ type: 'varchar' })
  cccd_location: string;

  @Column({ type: 'varchar' })
  cccd_registry_office: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  hometown: string;

  @Column({ type: 'int' })
  address_districtId: number

  @Column({ type: 'int'})
  address_provinceId: number;

  @Column({ type: 'varchar' })
  image_face_url: string;

  @Column({ type: 'varchar' })
  image_profile_url: string;

  @Column({ type: 'varchar' })
  image_cccd_front_url: string;

  @Column({ type: 'varchar' })
  image_cccd_back_url: string;

  @Column({ type: 'bit' })
  has_cv: boolean;

  @Column({ type: 'bit' })
  ekyc: boolean;

  @Column({ type: 'varchar' })
  email: string;

  @CreateDateColumn({ type: 'date', name: 'email_verified_at' })
  email_verified_at: Date;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updated_at: Date;

  @UpdateDateColumn({ type: 'int', name: 'deleted' })
  deleted: number;


  @OneToOne(type => User, user => user.Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  User: User
}
