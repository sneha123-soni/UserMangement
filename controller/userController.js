const bcrypt = require('bcryptjs');
const db = require('../dbConnection/connection');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

// Register User
registerUser = async(req, res) => 
{
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try 
    {
        const [rows] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).send('User Registered');
    } 
    catch (err) 
    {
        res.status(400).send('Error Registering User');
    }
};
  
// Login User
loginUser = async (req, res) => {
    const { username, password } = req.body;
    try 
    {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid Credentials');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } 
    catch (err) 
    {
        res.status(400).send('Error Logging In');
    }
};

module.exports = {
    registerUser,
    loginUser
}