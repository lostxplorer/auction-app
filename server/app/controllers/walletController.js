const WalletModel = require("../models/Wallets");
const AppResponse = require("../services/AppResponse");

const upsertWallet = async (req, res) => {       
    try {
        const payload = req.body.wallet;
        if(!payload.userName || !payload.amount) {
            return AppResponse.badRequest(
              res,
              'MISSING_REQUIRED_FIELDS',
              'MISSING_REQUIRED_FIELDS' 
            )
        }
        const wallet = await WalletModel.findOneAndUpdate(
            {
                userName: payload.userName
            }, 
            {
                $set: payload
            },
            {
                upsert: true
            }
        );
        return AppResponse.success(res, wallet)
    } catch (error) {
        if (error.name = 'ValidationError') {
            return AppResponse.badRequest(
                res,
                'Invalid Payload',
                error.message
            )
        } else {
            return AppResponse.error(
                res,
                'INTERNAL SERVER ERROR',
                error.message
            )
        }
    }
};

const getWalletByUserName = async (req, res) => {
    try {
        const userName = req.params.userName
        const walletDetails = await WalletModel.findOne({userName});
        if (!walletDetails) {
            return AppResponse.notFound(
                res,
                'WALLET_DETAILS_NOT_FOUND_FOR_THE_USER',
                'WALLET_DETAILS_NOT_FOUND_FOR_THE_USER' 
            )
        }
        return AppResponse.success(res, {wallet: walletDetails})
    } catch (error) {
        throw error;
    }
}

module.exports = {
    upsertWallet,
    getWalletByUserName
}