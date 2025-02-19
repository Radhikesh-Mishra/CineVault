import {registerUser, loginUser} from '../controllers/AuthController.js';
import e from 'express';

const router = e.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;