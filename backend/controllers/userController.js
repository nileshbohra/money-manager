const User = require('../db/modelsList').users;

exports.getUserById = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findOne({ where: { id: userId } });
        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            profile_picture: user.profile_picture,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        console.log('ssssssssss', userData);
        res.status(200).json(userData);
    } catch (error) {
        console.error("Error fetching user", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};