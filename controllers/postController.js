const { getAllPost, createPost, updatePost, deletePost, getPostById, createComment, updateComment, deleteComment } = require('../services/post.services');

class PostController {
    async getAllPost(req, res) {
        try {
            const posts = await getAllPost(req.query);
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createPost(req, res) {
        try {
            const post = await createPost(req, res);
            return res.status(201).json(post);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updatePost(req, res) {
        try {
            const post = await updatePost(req.params.id, req.body);
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deletePost(req, res) {
        try {
            const result = await deletePost(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getPostById(req, res) {
        try {
            const post = await getPostById(req.params.id);
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createComment(req, res) {
        try {
            const result = await createComment(req.params.id, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateComment(req, res) {
        try {
            const result = await updateComment(req.params.id, req.params.commentId, req.body);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteComment(req, res) {
        try {
            const result = await deleteComment(req.params.id, req.params.commentId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PostController();