const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPost);
// query params
router.post('/', postController.createPost);

// update post
router.put('/:id', postController.updatePost);
// delete post
router.delete('/:id', postController.deletePost);
// get detail post
router.get('/:id', postController.getPostById);

router.post('/:id/comment', postController.createComment);
// update comment
router.put('/:id/comment/:commentId', postController.updateComment);
// delete comment
router.delete('/:id/comment/:commentId', postController.deleteComment);

module.exports = router;