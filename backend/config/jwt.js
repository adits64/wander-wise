import jwt from "jsonwebtoken";

export const generateAccessToken = async (data, expiresIn = process.env.JWT_EXPIRES_IN) => { // data => { userId: user._id }
    const token = await jwt.sign(data, process.env.JWT_KEY, { expiresIn });
    return token;
}

export const verifyAccessToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded?.userId;
}
