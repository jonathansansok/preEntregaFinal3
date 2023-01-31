const userModel = require("../../models/user.model");

const UsersService = require ("../../services/userService.js");
const UserDTO = require ("../dtos/userDTO.js");
const userService = new UsersService()

const getUsers = async(req, res) => {
  let result = await userService.getUsers()
  let resultDTO = result.map(user => new UserDTO(user))
  res.send(resultDTO)
}

const saveUser = async (req, res) => {
  let user = req.body
  //TODO: Validaciones...
  let result = await userService.addUser(user)
  res.send(new UserDTO(result))
}


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

module.exports = getUsers, saveUser, userController;
