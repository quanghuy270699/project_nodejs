import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, UpdateDateColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { UserProfile } from './user.profile.entity';
import { JobCareer } from '../cv/career.job.entity';
import { JobCompany } from '../recruitment/job.company.entity';

@Entity('app_user_account')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: 'varchar', name: 'username', unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', name: 'password', nullable: false })
  password: string;


  @CreateDateColumn({ type: 'int', nullable: false })
  status: number;

  @CreateDateColumn({ type: 'timestamp', name: 'activated_at' })
  activated_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updated_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deleted_at: Date;

  @UpdateDateColumn({ type: 'int', name: 'activate' })
  activate: number;

  @Column({ type: 'varchar', name: 'firebase_token', nullable: true })
  firebase_token: string;

  @Column({ type: 'varchar', name: 'platform', nullable: true })
  platform: string;


  @OneToOne(type => UserProfile, userPrfile => userPrfile.User, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE' })
  Profile: UserProfile;

  @OneToOne(type =>JobCompany, jobCompany => jobCompany.User, { cascade: true, nullable: false, eager: true, onDelete: 'CASCADE' })
  jobCompany: JobCompany;

  
}
