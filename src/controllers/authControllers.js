import connection from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signUpControllers (req, res) {
    const body = req.body;
    
    // Hash password
    const passwordHash = await bcrypt.hash(body.password, 10);

    // Insert user
    try {
        const user = await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [body.name, body.email, passwordHash]);

        // Insert an alert later
        res.status(201).send(user.rows[0]);
    } catch (error) {
        res.status(422).send(error);
    }

}

export async function signInControllers (req, res) {
    
    try {

        // Create token
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
            expiresIn: 3600
        });

        res.status(200).send({ token });

    } catch (error) {
        res.status(500).send(error);
    }

}