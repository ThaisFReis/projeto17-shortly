import connection from '../db.js';
import joi from 'joi';
import bcrypt from 'bcrypt';

export async function signUpMiddlewares (req, res, next) {
  const { email, password, confirmPassword } = req.body;

  // Schema
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required()
        });

    // Validation
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if email already exists
    const checkEmail = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkEmail.rows.length > 0) {
        // Insert an alert later
        return res.status(409).send('Email already exists');
    }

    // Check if password and confirmPassword are the same
    if (password !== confirmPassword) {
        // Insert an alert later
        return res.status(400).send('Passwords do not match');
    }

    next();
}

export async function signInMiddlewares (req, res, next) {
    // Schema
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    // Validation
    const { error } = schema.validate(req.body);

    if (error) {
        // Insert an alert later
        return res.status(400).send(error.details[0].message);
    }

    // Check if email exists
    const { email, password } = req.body;
    const emailExists = await connection.query('SELECT * FROM users WHERE email = $1', [email]);

    if (emailExists.rows.length === 0) {
        // Insert an alert later
        return res.status(404).send('user not found');
    }

    // Check if password and email match
    const user = emailExists.rows[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
        // Insert an alert later
        return res.status(401).send('Email or password incorrect');
    }

    res.locals.user = user;

    next();
}