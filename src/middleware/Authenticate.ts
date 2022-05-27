import { verify } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = "3be17c7406dc4904c247ab8d78d11c05";

const validateToken = (req, res, next) => {
  const accessToken = req.headers["cookie"].split("=")[1];

  if (!accessToken) {
    return res.status(400).json({ message: "User not Autheticated!" });
  }

  try {
    const validToken = verify(accessToken, ACCESS_TOKEN_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export { validateToken };
