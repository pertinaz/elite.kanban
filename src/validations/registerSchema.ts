import {z} from "zod";

const registerSchema = z.object({
    username: z
        .string()
        .min(3, {message: "Username must be at least 3 characters long"})
        .max(20, {message: "Username must be at most 20 characters long"}),
    email: z
        .string()
        .email({message: "Invalid email address"}),
    password: z
        .string()
        .min(6, {message: "Password must be at least 6 characters long"})
        .max(20, {message: "Password must be at most 20 characters long"}),
});

export {registerSchema};