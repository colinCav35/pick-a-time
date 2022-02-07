import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, ManyToMany } from 'typeorm';

import { User } from '../user/model';

@Entity()
export class Event {
  constructor (id: number, name: string, date: string, time: string, repeating: string) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.time = time;
    this.repeating = repeating;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    nullable: false
  })
  public name: string;

  @Column()
  public date: string;

  @Column()
  public time: string;

  @Column()
  public repeating: string;

  /*
  @CreateDateColumn()
  public created: Timestamp;

  @ManyToMany()
  public users: [User];
  */

  static deserialize (obj: Event): Event {
    const event: Event = new Event(obj.id, obj.name, obj.date, obj.time, obj.repeating);
    //event.users = obj.users;
    return event;
  }
}
