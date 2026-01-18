/**
 * User Routes
 * 
 * User API endpoints.
 */

const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { authenticate } = require('../../middleware/auth');
const { validateBody } = require('../../middleware/validate');
const { updateProfileSchema, changePasswordSchema } = require('./user.schema');
const upload = require('../../middleware/upload.middleware');

// All routes require authentication
router.use(authenticate);

router.get('/profile', userController.getProfile);
router.patch('/profile', validateBody(updateProfileSchema), userController.updateProfile);
router.patch('/password', validateBody(changePasswordSchema), userController.changePassword);
router.get('/dashboard', userController.getDashboard);

// Profile picture routes
router.post('/profile/picture', upload.single('profilePicture'), userController.uploadProfilePicture);
router.delete('/profile/picture', userController.deleteProfilePicture);

// Account deletion route
router.delete('/profile/account', userController.deleteAccount);

module.exports = router;
