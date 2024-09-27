const express = require('express')
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator')
const validInfo = require('../middleware/validInfo')
const authorize = require('../middleware/authorize')

router.post('/register', validInfo, async (req, res)=>{
    const {firstname, lastname, username, email, password, phonenumber} = req.body;

    try {
        //check if the user exists already
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(user.rows.length > 0){
            return res.status(401).json({error: "User already exist!"})
        }

        
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt)

        
        const newUser = await pool.query(
            "INSERT INTO users (firstname, lastname, username, email, phonenumber, password ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [firstname, lastname, username, email, phonenumber, encryptedPassword]
        );

        
        const token = jwtGenerator(newUser.rows[0].user_id);

        return res.json({success: "Confirmation email sent", token})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Error: 500. Server Error');
    }
});

router.post('/login', validInfo, async (req, res)=>{
    const {email, password} = req.body;

    try {
        //get user
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])

        //check if user exists
        if(user.rows.length === 0){
            return res.status(401).json({error: "User does not exist"})
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if(!validPassword){
            return res.status(401).json({error: 'Wrong Credentials. Try again'})
        }

        //store the token
        const token = jwtGenerator(user.rows[0].user_id);

        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 3600 * 1000,
        //   });
        return res.json({success: "You are good to go", token})

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }
});


router.post('/password_reset_token', async (req, res) => {
    try {
        const {email, token, expires} = req.body;

        const newPRT = await pool.query("INSERT INTO passwordreset_token (email, token, expires) VALUES ($1, $2, $3)", [email, token, expires])

        res.status(200).json(newPRT)
    } catch (err) {
        console.error(err.message)
    }
})

router.post('/verification_token', async (req, res) => {
    try {
        const {email, token, expires} = req.body;

        const newVT = await pool.query("INSERT INTO verification_token (email, token, expires) VALUES ($1, $2, $3)", [email, token, expires])

        res.status(200).json(newVT)
    } catch (err) {
        console.error(err.message)
    }
})


router.get('/password_reset_token_by_token/:token', async (req, res)=> {
    try {
        const {token} = req.params;

        await pool.query("SELECT * FROM passwordreset_token WHERE token = $1", [token])
        res.json('Good to go')
    } catch (err) {
        console.error(err.message)
    }
});

router.get('/password_reset_token_by_email/:email', async (req, res)=> {
    try {
        const {email} = req.params;

        await pool.query("SELECT * FROM passwordreset_token WHERE email = $1", [email])
        res.json('Good to go')
    } catch (err) {
        console.error(err.message)
    }
});

router.get('/verification_token_by_email/:email', async (req, res)=> {
    try {
        const {email} = req.params;

        await pool.query("SELECT * FROM verification_token WHERE email = $1", [email])
        res.json('Good to go')
    } catch (err) {
        console.error(err.message)
    }
});

router.get('/verification_token_by_token/:token', async (req, res)=> {
    try {
        const {token} = req.params;

        await pool.query("SELECT * FROM verification_token WHERE token = $1", [token])
        res.json('Good to go')
    } catch (err) {
        console.error(err.message)
    }
});





router.delete("/password_reset_token/:id", async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM passwordreset_token WHERE id = $1", [id]);
        res.json("Deleted successfully");

    } catch (err) {
        console.error(err.message);
    }
})

router.delete("/verification_token/:id", async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM verification_token WHERE id = $1", [id]);
        res.json("Deleted successfully");

    } catch (err) {
        console.error(err.message);
    }
})


router.post("/verify", authorize, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;