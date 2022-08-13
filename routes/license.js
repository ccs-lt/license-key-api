const router = require("express").Router();

const licenseController = require("./../controllers/licenseController");

router.post("/", licenseController.addLicense);
router.get("/:key/:apiKey", licenseController.checkLicense);
router.delete("/:token/:key/:apiKey", licenseController.deleteLicense)

module.exports = router;