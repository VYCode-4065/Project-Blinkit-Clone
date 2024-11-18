import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";

export const AuthenticatedUser = async (req, _, next) => {
    try {
        const token = req.cookies?.Refresh_Token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN);


        const user = await User.findById(decodeToken?.id)

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }


        req.user = user;
        next();
    } catch (error) {
        next(new ApiError(401, error?.message || "Invalid access token"))
    }
};
