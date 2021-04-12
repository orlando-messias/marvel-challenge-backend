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

  // set favorite or not favorite to a character by user
  async changeFavoriteCharacterByUserId(req: Request, res: Response) {
    const { userId, characterId } = req.body;

    try {
      const favoriteCharacterRepo = getRepository(FavoriteCharacter);
      const favorite = await favoriteCharacterRepo.findOne({
        where: { userId, characterId }
      });
      if (!favorite) {
        await favoriteCharacterRepo.save({ userId, characterId });
        return res.status(201).json({ action: 'inserted' });
      }

      await favoriteCharacterRepo.remove(favorite);
      return res.status(200).json({ action: 'removed' });

    } catch (err) {
      res.status(400).send({ error: `Error while accessing data: ${err}.` });
    }
  };


  // set favorite or not favorite to a comic by user
  async changeFavoriteComicByUserId(req: Request, res: Response) {
    const { userId, comicId } = req.body;

    try {
      const favoriteComicRepo = getRepository(FavoriteComic);
      const favorite = await favoriteComicRepo.findOne({
        where: { userId, comicId }
      });
      if (!favorite) {
        await favoriteComicRepo.save({ userId, comicId });
        return res.status(201).json({ action: 'inserted' });
      }

      await favoriteComicRepo.remove(favorite);
      return res.status(200).json({ action: 'removed' });

    } catch (err) {
      res.status(400).send({ error: `Error while accessing data: ${err}.` });
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