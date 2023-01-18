const userModel = require("../../models/user.model");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find();
      res
        .status(200)
        .json({
          statusCode: 200,
          data: users,
          message: "Users retrieved successfully",
        });
    } catch (err) {
      res
        .status(401)
        .json({ statusCode: 401, message: "Error " + err.message });
    }
  },
};

module.exports = userController;
