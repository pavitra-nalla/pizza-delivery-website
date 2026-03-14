import express from 'express';
const router = express.Router();
import { buildPizza } from '../controllers/builderController.js';

router.route('/')
    .get((req, res) => {
        try {
            res.status(200).json({ message: "Build API working" });
        } catch (error) {
            console.error("GET Error:", error);
            res.status(500).json({ message: "Server error handling GET request" });
        }
    })
    .post(async (req, res, next) => {
        try {
            await buildPizza(req, res, next);
        } catch (error) {
            console.error("POST Error in buildPizza:", error);
            if (!res.headersSent) {
                res.status(500).json({ message: "Server error processing pizza build" });
            }
        }
    })
    .all((req, res) => {
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    });

export default router;