import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const AuthenticatedUser = async (req, res, next) => {
    try {
        const token = req.cookies?.Refresh_Token || req?.headers?.authorization?.split(" ")[1];
        console.log();


        if (!token) {
            return res.status(401).json({

                message: "Provide token",

            }

            )
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN);


        const user = await User.findById(decodeToken?._id).select("-password -refresh_token")

        if (!user) {
            return res.status(401).json(new ApiResponse(401, {}, "Invalid Access Token"))
        }


        req.user = user;
        next();
    } catch (error) {

        return res.status(400).json(new ApiResponse(400, {}, "Please login first "))

    }
};
