const express = require('express');
const router = express.Router();
const {
  createUsers,
  getAllUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
} = require('../controllers/users');
const auth = require('../middleware/authentication');


router.post('/', createUsers);
router.get('/', auth, getAllUsers);
router.get('/:usersID', auth, getUsersById);
router.put('/:usersID', auth, updateUsers);
router.delete('/:usersID', auth, deleteUsers);

module.exports = router;