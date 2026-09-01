import { Router } from "express";
import { createUserValidator, updateUserValidator } from "../validators/user.js";
import { create, destroy, getAll, getOne, update } from "../services/user.js";

const USER_ROUTER = Router();

USER_ROUTER.post("/", createUserValidator, async (req, res, next) => {
    try {
        const user = await create(req.body);
        res.status(201).json({ data: user });
    } catch (error) {
        next(error);
    }
});

USER_ROUTER.get("/", async (req, res, next) => {
    try {
        const users = await getAll();
        res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
});

USER_ROUTER.get("/:id", async (req, res, next) => {
    try {
        const user = await getOne(req.params.id);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
});

USER_ROUTER.patch("/:id", updateUserValidator, async (req, res, next) => {
    try {
        const user = await update(req.params.id, req.body);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
});

USER_ROUTER.delete("/:id", async (req, res, next) => {
    try {
        const user = await destroy(req.params.id);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
});

export default USER_ROUTER;
