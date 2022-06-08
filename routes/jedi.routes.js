import express from "express";
import { Router } from "express";
import api from "../JediService.js";
const router = express.Router();

router
    .route("/")
    .get(async (req, res) => {
        const ans = await api.getAll();
        res.status(200).json(ans);
    })
    .post(async (req, res) => {
        const ans = await api.addJedi(req.body);
        res.status(200).json(ans);
    })
    .put()
    .delete();

router
    .route("/:id")
    .get(async (req, res) => {
        let jediId = Number.parseInt(req.params.id);
        if (isNaN(jediId))
            return res.status(400).json({
                status: 400,
                error: "wrong parameters",
            });

        const jedi = await api.getJedi(jediId);

        if (!jedi)
            return res.status(404).json({
                status: 404,
                error: "Not found",
            });

        res.status(200).json(jedi);
    })
    .post()
    .put(async (req, res) => {
        const ans = await api.replaceJedi(req.params.id, req.body, res);
        res.status(200).json(ans);
    })
    .delete(async (req, res) => {
        const ans = await api.deleteJedi(req.params.id, res);
        res.status(200).json(ans);
    });

router.route("/:id/undo")
    .delete(async (req, res) => {
        const ans = await api.undoDeleteJedi(req.params.id, res);
        res.status(200).json(ans);
    });

export default router;
