import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import FavoriteCharacter from '../models/FavoriteCharacter';
import FavoriteComic from '../models/FavoriteComic';

export default class FavoriteController {

  // list all favorites characters by user id
  async getFavoritesCharactersByUserId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const favoriteCharacterRepo = getRepository(FavoriteCharacter);
      const favorites = await favoriteCharacterRepo.find({
        where: { userId: id }
      });
      return res.status(200).json(favorites);

    } catch (err) {
      res.status(400).send({ error: `Error while loading data: ${err}.` });
    }
  };


  // list all favorites comics by user id
  async getFavoritesComicsByUserId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const favoriteComicRepo = getRepository(FavoriteComic);
      const favorites = await favoriteComicRepo.find({
        where: { userId: id }
      });
      return res.status(200).json(favorites);

    } catch (err) {
      res.status(400).send({ error: `Error while loading data: ${err}.` });
    }
  };

};