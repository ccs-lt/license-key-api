const { License } = require("./../model/model");

const utils = require("./../utils/utils"),
    { config, token } = require("./../utils/variable");

const licenseController = {
    addLicense: async (req, res) => {
        try {
            if (!req.body.token) {
                return res.status(400).json({
                    status: "error",
                    msg: "missing access token!"
                });
            } else {
                if (!token.AccessToken.includes(req.body.token)) {
                    return res.status(400).json({
                        status: "error",
                        msg: "token is invalid!"
                    });
                } else {
                    if (!req.body.key) {
                        return res.status(400).json({
                            status: "error",
                            msg: "missing license key!"
                        });
                    } else {
                        const newLicense = new License({
                            key: req.body.key,
                            apiKey: utils.GenerateApiKey(req.body.key + `${new Date().toLocaleDateString()}`),
                            actived: true,
                            createdDate: `${new Date().toLocaleDateString()}`,
                        }),
                            savedLicense = await newLicense.save();
                        return res.status(200).json({
                            status: "success",
                            msg: "license key successfully generated!",
                            key: savedLicense.key,
                            apiKey: savedLicense.apiKey
                        });
                    };
                };
            };
        } catch (err) {
            return res.status(500).json(err);
        };
    },
    checkLicense: async (req, res) => {
        try {
            const key = await License.findOne({ key: req.params.key });
            if (key === null) {
                return res.status(400).json({
                    status: "error",
                    msg: "key not found!"
                });
            } else {
                if (key.apiKey !== req.params.apiKey) {
                    return res.status(400).json({
                        status: "error",
                        msg: "authentication failed!"
                    });
                } else {
                    return res.status(200).json({
                        status: "success",
                        msg: "license key was found!",
                        key: key.key,
                        apiKey: key.apiKey,
                        actived: key.actived,
                        createdDate: key.createdDate
                    });
                };
            };
        } catch (err) {
            return res.status(500).json(err);
        };
    },
    deleteLicense: async (req, res) => { 
        try {
            if (!token.AccessToken.includes(req.params.token)) {
                return res.status(400).json({
                    status: "error",
                    msg: "token is invalid!"
                });
            } else {
                const key = await License.findOne({ key: req.params.key });
                if (key === null) {
                    return res.status(400).json({
                        status: "error",
                        msg: "key not found!"
                    });
                } else {
                    if (key.apiKey !== req.params.apiKey) {
                        return res.status(400).json({
                            status: "error",
                            msg: "authentication failed!"
                        });
                    } else {
                        await License.deleteOne({
                            key: req.params.key,
                            apiKey: req.params.apiKey
                        })
                        return res.status(200).json({
                            status: "success",
                            msg: "license deleted!",
                            key: req.params.key,
                            apiKey: req.params.apiKey
                        });
                    };
                };
            };
        } catch (error) {
           return res.status(500).json(err); 
        };
    },
};

module.exports = licenseController;