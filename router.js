import express from "express";
import jediRoutes from "./routes/jedi.routes.js";

const router = express.Router();

router
    .route("/")
    .get((req, res) => res.status(200).json({ health: "ok" }))
    .post()
    .put()
    .delete();

router.use("/jedi", jediRoutes);

export default router;
