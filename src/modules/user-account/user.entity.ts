import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, UpdateDateColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { UserProfile } from './user.profile.entity';

@Entity('app_user_account')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @PrimaryColumn({ type: 'bigint', name: 'id'})
  id: string;

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


  @OneToOne(type => UserProfile, userPrfile => userPrfile.User, { cascade: true, nullable: false, eager: true })
  Profile: UserProfile;
}
