const { Router } = require('express');
const authRouter = Router();
const { User } = require('../db/index');
const jwt = require('jsonwebtoken');
const { login } = require('../type');
const jwtPassword = process.env.jwtPassword;

// NOTE:-   /signup and /login both routes should have password encryption logic.

authRouter.post('/signup', async (req, res) => {
  try {
    const creatPayload = req.body;
    const parsedPayload = login.safeParse(creatPayload);
    if (!parsedPayload.success) {
      res.status(411).json({
        message: 'Invalid inputes',
      });
      return;
    }

    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(411).json({ message: 'User alrady exist' });
    } else {
      const user = await User.create({ email, password });
      const token = jwt.sign({ _id: user._id }, jwtPassword);
      res.json({ message: 'User created successfully', token });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error in signup', err });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const creatPayload = req.body;
    const parsedPayload = login.safeParse(creatPayload);
    if (!parsedPayload.success) {
      res.status(411).json({
        message: 'Invalid inputes',
      });
      return;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ _id: user._id }, jwtPassword);
      res.status(200).json({
        token: token,
        message: 'Loged in successfully',
      });
      return;
    }
    res.status(411).json({ message: 'Invalid email or password' });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Internal server error in login' });
  }
});

module.exports = authRouter;
