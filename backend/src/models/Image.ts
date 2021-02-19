import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';
import User from './User';

@Entity('profilePicture')
export default class Image {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @OneToOne(type => User, user => user.image)
    @JoinColumn({name: 'user_id'})
    user: User;
    
}