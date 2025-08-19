const Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      //checking if that user is not existing.
      const { name, email, password } = req.body;
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(401).json({ message: " user already exists" });
      }
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new Users({ name, email, password: hashedPassword });
      await newUser.save();
      return res.status(201).json({ message: "User added" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },

  login: async (req, res) => {
    const secretKey = process.env.JWT_KEY;

    try {
      //data comming from the user
      const { email, password } = req.body;

      // try to find if the user even exists
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "The user does not exist" });
      }
      // check the password if the password provided by the user matches the password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // if it is not a match, we say either the password or the email is incorrect
        return res
          .status(403)
          .json({ message: "The password the email or password is incorrect" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        secretKey,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 100,
        sameSite: "strict",
      });
      return res.status(200).json({
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      return res.json({ err: error });
    }
  },
};
