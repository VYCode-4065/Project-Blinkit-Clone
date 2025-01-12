import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const AuthenticatedUser = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token =
            req.cookies?.Access_Token ||
            (req?.headers?.authorization?.startsWith("Bearer ") &&
                req.headers.authorization.split(" ")[1]);

        if (!token) {
            return res.status(401).json(new ApiResponse(401, {}, "Provide token"));
        }

        // Verify the token
        let decodeToken;
        try {
            decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN);
        } catch (err) {
            const errorMessage =
                err.name === "TokenExpiredError"
                    ? "Access token has expired"
                    : "Invalid Access Token";
            return res.status(401).json(new ApiResponse(401, {}, errorMessage));
        }

        // Validate token payload and fetch user
        if (!decodeToken?._id) {
            return res.status(401).json(new ApiResponse(401, {}, "Invalid Access Token"));
        }

        const user = await User.findById(decodeToken._id).select("-password -refresh_token");

        if (!user) {
            return res.status(401).json(new ApiResponse(401, {}, "User not found"));
        }

        // Attach user to the request object and proceed
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json(new ApiResponse(500, {}, "Internal Server Error"));
    }
};
