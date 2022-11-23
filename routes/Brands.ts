import express from "express";

const router = express.Router()

router.use('/brand', (req, res) => {
    console.log('foi')
})