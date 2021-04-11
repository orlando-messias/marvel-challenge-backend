import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import User from "./User";

@Entity('favorites_comics')
export default class FavoriteComic {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comicId: string;

  // optionally not shown in queries
  @CreateDateColumn({ select: false })
  created_at: Date;

  // optionally not shown in queries
  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @JoinColumn({ name: "userId" })
  @ManyToOne(() => User, (user) => user.favoritesComics, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  userId: User;

};
