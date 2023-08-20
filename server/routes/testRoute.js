import express  from "express";

const router = express.Router()

router.route('/').get((req,res) => {
    res.status(200).json({data: "This is a test"})
})

export default router