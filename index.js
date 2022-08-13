const express = require("express"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    cl = require("chalk");

const { config, token } = require("./utils/variable");

const licenseRoute = require("./routes/license");

const app = express();

try {
    mongoose.connect(`mongodb+srv://${config.Database.User}:${config.Database.Password}@cluster0.82krx.mongodb.net/?retryWrites=true&w=majority`, {
        dbName: config.Database.Name,
    }, () => {
        console.log(cl.gray(`[${new Date().toLocaleString()}]`), cl.cyan.bold("[LicenseAPI]"), cl.white.bold("Connected success to database!"));
    });
} catch (error) {
    console.log(cl.gray(`[${new Date().toLocaleString()}]`), cl.cyan.bold("[LicenseAPI]"), cl.white.bold("Database error has occurred!"));
    console.log(error);
};

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use("/v1/license", licenseRoute);

app.listen(config.Server.Port, () => {
    console.log(cl.gray(`[${new Date().toLocaleString()}]`), cl.cyan.bold("[LicenseAPI]"), cl.white.bold("Server running at"), cl.green.bold(`http://localhost:${config.Server.Port}`));
});