import { Router } from 'express';
import FavoriteController from '../controller/FavoriteController';
import { auth } from '../middlewares/auth';

const favoritesRoutes = Router();
const favoriteController = new FavoriteController();

favoritesRoutes.get('/characters/:id', auth, favoriteController.getFavoritesCharactersByUserId);
favoritesRoutes.post('/characters', auth, favoriteController.changeFavoriteCharacterByUserId);
favoritesRoutes.post('/comics', auth, favoriteController.changeFavoriteComicByUserId);
favoritesRoutes.get('/comics/:id', auth, favoriteController.getFavoritesComicsByUserId);

export default favoritesRoutes;