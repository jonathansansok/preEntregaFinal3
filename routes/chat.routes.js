const express = require('express');
const chatRoutes = express.Router();
const chatController =  require('../controllers/chat.controller.mong');

chatRoutes.get('/create/:id', chatController.create)
chatRoutes.get('/:ticket', chatController.chat)

module.exports = chatRoutes;