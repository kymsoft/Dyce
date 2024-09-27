const express = require('express');
const pool = require('../db');
const router = express.Router()

router.get('/getUserEmail/:email', async (req, res)=> {
    try {
        const {email} = req.params;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting user')
    }
})

router.get('getUserId/:id', async (req, res)=> {
    try {
        const {id} = req.params;

        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error getting user')
    }
})

router.put('/update-verification/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const {emailverified} = req.body;

        await pool.query("UPDATE users SET emailverified = $1 WHERE user_id = $2", [emailverified, id]);

        res.json("Update successful");
    } catch (err) {
        console.error(err.message)
    }
})

router.put('/update-newverification/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const {emailverified, email} = req.body;

        await pool.query("UPDATE users SET emailverified = $1, email = $2 WHERE user_id = $3", [emailverified, email, id]);

        res.json("Update successful");
    } catch (err) {
        console.error(err.message)
    }
})

router.put('/update-password/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const {hashedPassword} = req.body;

        await pool.query("UPDATE users SET password = $1 WHERE user_id = $2", [hashedPassword, id]);

        res.json("Update successful");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;