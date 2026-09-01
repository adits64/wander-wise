import { NotFoundError } from "../errors/not-found.js";
import Baggage from "../models/baggage.js";

export const create = async (data, userId) => { // data => { name: "jacket" }
    /**
     * create(data) => create({ ...data, user: userId })
     * create({ name: "jacket" }) => create({ name: "jacket", user: "6a12bf665286d3767baa8e67" })
     */
    const baggage = await Baggage.create({ ...data, user: userId });
    return baggage;
}

export const getAll = async (userId) => {
    const baggages = await Baggage.find({ user: userId });
    return baggages;
}

export const getOne = async (_id, userId) => {
    const baggage = await Baggage.findOne({
        _id, user: userId
    });
    if (!baggage) {
        throw new NotFoundError("Baggage not found!");
    }
    return baggage;
}

export const update = async (_id, data, userId) => {
    const baggage = await Baggage.findOneAndUpdate(
        { _id, user: userId },
        data,
        { returnDocument: 'after' }
    );
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
}

export const destroy = async (_id, userId) => {
    const baggage = await Baggage.findOneAndDelete({ _id, user: userId });
    if (!baggage) throw new NotFoundError("Baggage not found!");
    return baggage;
};