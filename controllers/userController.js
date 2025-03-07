const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require('../services/user.services');

class UserController {
    async getAllUser(req, res) {
        try {
            const {
                user_gender,
                user_major,
                from_user_age,
                to_user_age,
                keyword,
                page = 1,
                limit = 10
            } = req.query;

            let query = {
                limit: limit * 1,
                skip: (page - 1) * limit
            };

            if (user_gender) {
                query.user_gender = user_gender;
            }

            if (user_major) {
                query.user_major = user_major;
            }

            if (from_user_age && to_user_age) {
                query.user_age = {
                    $gte: from_user_age,
                    $lte: to_user_age
                };
            }

            if (keyword) {
                query.$or = [
                    { user_first_name: { $regex: keyword, $options: 'i' } },
                    { user_last_name: { $regex: keyword, $options: 'i' } },
                    { user_email: { $regex: keyword, $options: 'i' } }
                ];
            }

            const users = await getAllUser(query);
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const user = await createUser(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const user = await updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            return res.status(200).json({ message: 'Xóa người dùng thành công' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();