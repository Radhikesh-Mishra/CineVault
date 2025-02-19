import e from "express";
import { fetchMovie, fetchHistory, toggleFavorite, getFavorites } from "../controllers/MovieController.js";
const router = e.Router();

router.post('/fetchMovie', fetchMovie);
router.get('/history', fetchHistory);
router.post('/toggleFavorite', toggleFavorite);
router.get(`/getFavorites/:userId`, getFavorites);

export default router;