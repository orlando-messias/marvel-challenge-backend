import { Router } from 'express';
import FavoriteController from '../controller/FavoriteController';

const favoritesRoutes = Router();
const favoriteController = new FavoriteController();

favoritesRoutes.get('/characters/:id', favoriteController.getFavoritesCharactersByUserId);
favoritesRoutes.get('/comics/:id', favoriteController.getFavoritesComicsByUserId);

export default favoritesRoutes;