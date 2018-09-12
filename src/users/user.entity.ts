import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from 'profile/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() username: string;

  @Column() password: string;

  @Column() firstName: string;

  @Column() lastName: string;

  @Column() mobile: string;

  @Column() email: string;

  @Column({default: false})
  profileCreated: boolean;

  @OneToOne(type => Profile, profile => profile.id)
  @JoinColumn({name: 'profileId', referencedColumnName: 'id'})
  profile: Profile;

  @Column({nullable: true})
  profileId: number;
}