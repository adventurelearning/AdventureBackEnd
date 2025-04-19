const express = require("express");
const contactModel = require("../models/contactsModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const details = req.body;
    const Newcontact = await contactModel.create(details);
    console.log(Newcontact);

    res.status(200).send("sended sucessfully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
