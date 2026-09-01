import User from "../models/user.js";
import { NotFoundError } from "../errors/not-found.js";

export const create = async (data) => {
    const user = await User.create(data);
    const {password, ...userWithoutPassword} = user.toObject();
    return userWithoutPassword;
}

export const getAll = async () => {
    const users = await User.find({}, { password: 0 });
    return users;
}

export const getOne = async (_id) => {
    const user = await User.findById(_id, { password: 0 });
    if (!user) throw new NotFoundError("User not found!");
    return user;
}

export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User not found!");
    return user;
}

export const update = async (_id, data) => {
    const user = await User.findByIdAndUpdate(
        _id,
        data,
        {
            returnDocument: 'after',
            projection: {
                password: 0
            }
        }
    )
    if (!user) throw new NotFoundError("User not found!");
    return user;
}

export const destroy = async (_id) => {
    const user = await User.findByIdAndDelete(_id, { projection: { password: 0 } });
    if (!user) throw new NotFoundError("User not found!");
    return user;
}
