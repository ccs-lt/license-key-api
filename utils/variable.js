const fs = require("fs"),
    yaml = require("js-yaml");

module.exports = {
    config: yaml.load(
        fs.readFileSync("./config/config.yml", "utf8")
    ),
    token: yaml.load(
        fs.readFileSync("./config/tokens.yml", "utf8")
    ),
};