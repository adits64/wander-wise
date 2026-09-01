import { body } from "express-validator";
import User from "../models/user.js";
import { validate } from "./validate.js";
import { ValidationError } from "../errors/validation.js";

export const createUserValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .trim()
        .escape(),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email")
        .normalizeEmail()
        .trim()
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
                if (user) {
                    throw new ValidationError("This email has already been taken");
                }
                return true;
            }),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .trim(),
    validate
];

export const updateUserValidator = [
    body("name")
        .optional()
        .trim()
        .escape(),
    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email")
        .normalizeEmail()
        .trim()
        .custom(async (value, { req }) => {
            const user = await User.findOne({
                email: value,
                _id: { $ne: req.params.id }
            });

            if (user) {
                throw new ValidationError("This email has already been taken");
            }
            return true;
        }),
    body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .trim(),
    validate
];

export const loginValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email")
        .normalizeEmail()
        .trim(),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .trim(),
    validate
];