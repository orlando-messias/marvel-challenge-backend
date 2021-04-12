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

@Entity('favorites_characters')
export default class FavoriteCharacter {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	characterId: string;
	
	@Column()
	name: string;
	
	@Column()
	thumbPath: string;
	
	@Column()
	thumbExt: string;

	// optionally not shown in queries
	@CreateDateColumn({ select: false })
	created_at: Date;

	// optionally not shown in queries
	@UpdateDateColumn({ select: false })
	updated_at: Date;

	@JoinColumn({ name: "userId" })
	@ManyToOne(() => User, (user) => user.favoritesCharacters, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	userId: User;

};
