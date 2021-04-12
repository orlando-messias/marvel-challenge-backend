import { Router } from 'express';
import FavoriteController from '../controller/FavoriteController';

const favoritesRoutes = Router();
const favoriteController = new FavoriteController();

favoritesRoutes.get('/characters/:id', favoriteController.getFavoritesCharactersByUserId);
favoritesRoutes.post('/characters', favoriteController.changeFavoriteCharacterByUserId);
favoritesRoutes.post('/comics', favoriteController.changeFavoriteComicByUserId);
favoritesRoutes.get('/comics/:id', favoriteController.getFavoritesComicsByUserId);

export default favoritesRoutes;