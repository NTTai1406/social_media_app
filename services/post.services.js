const postModel = require('../models/post.model');

const createPost = async (req, res) => {
    try {
        const post = await postModel.create(req.body);
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getAllPost = async (query) => {
    try {
        const posts = await postModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'post_author',
                    foreignField: '_id',
                    as: 'post_author'
                }
            },
            {
                $unwind: '$post_author'
            }
        ])

        return posts;
    } catch (error) {
        return { message: error.message };
    }
}

const getPostById = async (postId) => {
    try {
        return await postModel.findById(postId).populate('author').populate('comments.author');
    } catch (error) {
        throw error;
    }
}

const updatePost = async (postId, post = {}) => {
    try {
        return await postModel.findByIdAndUpdate(postId, post, { new: true });
    } catch (error) {
        throw error;
    }
}
 
const deletePost = async (postId) => {
    try {
        return await postModel.findByIdAndDelete(postId);
    } catch (error) {
        throw error;
    }
}

const createComment = async (postId, comment = {}) => {
    try {
        const result = await postModel.findByIdAndUpdate(postId, {
            $push: {
                post_comments: comment
            }
        })

        return result;
    } catch (error) {
        return { message: error.message };
    }
}

const updateComment = async (postId, commentId, commentData) => {
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        const comment = post.comments.id(commentId);
        if (!comment) {
            throw new Error('Comment not found');
        }
        Object.assign(comment, commentData);
        return await post.save();
    } catch (error) {
        throw error;
    }
}

const deleteComment = async (postId, commentId) => {
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        post.comments.id(commentId).remove();
        return await post.save();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
};