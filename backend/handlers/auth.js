import { Router } from "express";
import { createUserValidator, loginValidator } from "../validators/user.js";
import { login, register } from "../services/auth.js";

const AUTH_ROUTER = Router();

AUTH_ROUTER.post("/register", createUserValidator, async (req, res, next) => {
    try {
        const token = await register(req.body);
        res.status(201).json({ data: { token } });
    } catch (error) {
        next(error);
    }
});

AUTH_ROUTER.post("/login", loginValidator, async (req, res, next) => {
    try {
        const token = await login(req.body);
        res.status(200).json({ data: { token } });
    } catch (error) {
        next(error);
    }
});

export default AUTH_ROUTER;
