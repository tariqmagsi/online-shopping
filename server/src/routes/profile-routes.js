const express = require("express");
const Profiles = require("../modals/profiles");
const auth = require("../middleware/auth");
const routes = express.Router();

routes.post("/profiles", async (req, res) => {
  try {
    const profile = await Profiles(req.body).save();
    const token = await profile.generateAuthToken();

    res.send({ success: true, profile, token });
  } catch (e) {
    res.send({ message: "This Email Already Exists", success: false });
  }
});

routes.get("/profiles", auth, async (req, res) => {
  try {
    const profile = await Profiles.find({});

    if (!profile) {
      res.send({ success: false, message: "Not Found" });
    }
    res.send({ profile, success: true });
  } catch (e) {
    res.send({ success: false });
  }
});

routes.get("/profiles/myprofile", auth, async (req, res) => {
  try {
    const profile = req.profile;

    res.send({ profile, success: true });
  } catch (e) {
    res.send({ success: false, e });
  }
});
routes.patch("/profiles/myprofile", auth, async (req, res, next) => {
  const changedProfile = req.body;
  const fieldsToUpdate = Object.keys(changedProfile);
  const fieldsInModel = ["name", "email", "password"];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.send({ error: "Invalid fields!" });
  }
  try {
    const profile = req.profile;
    Object.assign(profile, changedProfile);
    await profile.save();
    res.send({ profile, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});

routes.delete("/profiles/myprofile/:_id", async (req, res) => {
  try {
    const profile = await Profiles.findById({ _id: req.params._id });
    await profile.remove();
    res.send({ profile, success: true });
  } catch (e) {
    res.send({ error: "Profile Not Deleted", success: false });
  }
});

routes.post("/profiles/login", async (req, res) => {
  try {
    const profile = await Profiles.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await profile.generateAuthToken();
    res.send({ profile, token, success: true });
  } catch (e) {
    res.send({ e, success: false, error: "Email or Password Incorrect" });
  }
});

routes.post("/profiles/resetpassword", async (req, res) => {
  try {
    const profile = await Profiles.findByCredentialsEmail(req.body.email);

    const token = await profile.generateAuthToken();
    // sendPasswordEmail(profile.name, req.body.email, token);
    res.status(201).send({ profile, token, success: true });
  } catch (e) {
    res.send({ e, success: false, error: "Email Not Exists" });
  }
});
routes.post("/profiles/checkOldPass", async (req, res) => {
  try {
    const profile = await Profiles.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send({ profile, success: true });
  } catch (e) {
    res.send({ e, success: false, error: "Email Not Exists" });
  }
});
routes.post("/profiles/logout", auth, async (req, res) => {
  try {
    const { profile, token } = req;
    profile.tokens = profile.tokens.filter(t => t.token !== token);
    await profile.save();
    res.send({ profile, success: true });
  } catch (e) {
    res.send({ e, success: false, error: "You are already logged out" });
  }
});

module.exports = routes;
