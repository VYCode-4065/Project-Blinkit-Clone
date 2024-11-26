import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const AuthenticatedUser = async (req, _, next) => {
    try {
        const token = req.cookies?.Access_Token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json(new ApiResponse(401, {}, "Unauthorized request"))
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN);


        const user = await User.findById(decodeToken?._id).select("-password -refresh_token")

        if (!user) {
            return res.status(401).json(new ApiResponse(401, {}, "Invalid Access Token"))
        }


        req.user = user;
        next();
    } catch (error) {
        next(new ApiResponse(401, {}, error || "Invalid access token"))
    }
};
