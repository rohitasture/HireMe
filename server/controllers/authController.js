import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(7);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (user)
      return next(createError(409, "Username or Email address already used!"));

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    const { password, ...info } = newUser._doc;
    res.status(200).json({ result: info, token });
  } catch (err) {
    next(createError(400, "Please fill all the required fields"));
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isVerified = bcrypt.compareSync(req.body.password, user.password);
    if (!isVerified)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    const { password, ...info } = user._doc;
    res.status(200).json({ result: info, token });
  } catch (err) {
    next(err);
  }
};

// export const logout = async (req, res) => {
//   res
//     .status(200)
//     .send("User has been logged out.");
// };
