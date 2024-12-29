import { Address } from "../models/address.model.js";
import { User } from "../models/user.model.js";
import { asynchandler } from '../utils/asynchandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const addAddressController = asynchandler(async (req, res) => {

    const user = req.user
    const { addressline, state, country, mobile, pincode, city } = req.body;

    if (!(addressline && state && country && mobile && pincode && city)) {
        return res.status(400).json(new ApiResponse(400, "", 'Insufficient data '))
    }


    const newAddress = await Address.create({
        address_line: addressline,
        city: city,
        state: state,
        pincode: pincode,
        country: country,
        mobile: mobile,
        userId: user?._id
    })

    if (!newAddress) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Unable to add address at this moment"))
    }

    const updateUserAddress = await User.findByIdAndUpdate(user?._id, {
        $push: {
            address_detail: newAddress
        }
    })

    if (!updateUserAddress) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Unable to add address at this moment"))
    }

    return res.json(new ApiResponse(200, newAddress, 'Address added successfully '))
})

const getAddressController = asynchandler(async (req, res) => {

    const user = req.user;

    if (!user) {
        return res.status(400).json(new ApiResponse(400, {}, "Please login to get address "))

    }

    const userAddress = await Address.find({
        userId: user?._id
    })

    if (!userAddress) {
        return res.status(400).json(new ApiResponse(400, '', "Unable to fetch user address "))
    }

    return res.json(new ApiResponse(200, userAddress, "User address fetched successfully "))
})

const updateAddressController = asynchandler(async (req, res) => {
    const user = req.user
    const { address_line, state, country, mobile, pincode, city } = req.body;

    if (!address_line || !state || !country || !mobile || !pincode || !city) {
        return res.status(400).json(new ApiResponse(400, "", 'Provide at least one data to update'))
    }


    const updatedAddress = await Address.findOneAndUpdate({ userId: user?._id }, {
        address_line: address_line && address_line,
        city: city && city,
        state: state && state,
        pincode: pincode && pincode,
        country: country && country,
        mobile: mobile && mobile,
    })

    if (!updatedAddress) {
        return res.status(400)
            .json(new ApiResponse(400, {}, "Unable to add address at this moment"))
    }

    return res.json(new ApiResponse(200, updatedAddress, 'Address updated successfully '))

})
const deleteAddressController = asynchandler(async (req, res) => {
    const user = req.user;

    const { id } = req.body;

    if (!id) {
        return res.status(400).json(new ApiResponse(400, {}, "Provide address id to delete "))
    }

    const existingAddress = await User.findOne({ _id: user?._id }, {
        address_detail: id
    })

    if (!existingAddress) {
        return res.status(400).json(new ApiResponse(400, {}, "This address is not available "))
    }

    const deleteAddress = await Address.findByIdAndDelete(id)

    return res.status(200).json(new ApiResponse(200, deleteAddress, "Address deleted successfully !"))
})

export {
    addAddressController,
    getAddressController,
    updateAddressController,
    deleteAddressController,
}