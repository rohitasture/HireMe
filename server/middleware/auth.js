import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // const isCustomAuth = token.length < 500;
    // if (token && isCustomAuth) {
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      next();
    });
    // } else {
    //   decodedData = jwt.decode(token);
    //   req.userId = decodedData?.sub;
    // }
  } catch (error) {
    next(error);
  }
  // const token = req.cookies.accesstoken;
  // if (!token) return next(createError(401, "You are not authenticated!"));
};
