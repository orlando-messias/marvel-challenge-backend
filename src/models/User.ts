import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from "typeorm";
import FavoriteCharacter from "./FavoriteCharacter";
import FavoriteComic from "./FavoriteComic";

@Entity('users')
export default class User {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(() => FavoriteCharacter, (fav) => fav.userId, {
		cascade: true,
		eager: true
	})
	favoritesCharacters: FavoriteCharacter[]

	@OneToMany(() => FavoriteComic, (fav) => fav.userId, {
		cascade: true,
		eager: true
	})
	favoritesComics: FavoriteComic[]

};
