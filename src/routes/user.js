const express = require('express');
const userController = require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/', (req, resp) => {
  userController.create(req.body, (err, res) => {
    if (err) {
      return resp.status(400).json({
        status: "error",
        msg: err.message
      });
    }
    resp.status(201).json({
      status: "success",
      msg: res
    });
  });
});

userRouter.get('/:username', (req, resp) => {
  userController.get(req.params.username, (err, user) => {
    if (err) {
      return resp.status(404).json({
        status: "error",
        msg: err.message
      });
    }
    resp.json(user);
  });
});

module.exports = userRouter;
