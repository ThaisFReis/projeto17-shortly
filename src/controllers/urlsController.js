import connection from '../db.js';
import { nanoid } from "nanoid";

export async function shortenUrlControllers (req, res) {
    const { url } = req.body;
    const { id } = res.locals.user;

    try {
        const shortUrl = await connection.query('INSERT INTO urls (url, shortUrl, userId) VALUES ($1, $2, $3) RETURNING *', [url, nanoid(5), id]);

        res.status(201).send(shortUrl.rows[0]);

    } catch (error) {
        res.status(500).send(error);
    }

}

export async function getOpenUrlControllers (req, res) {
    const { shortUrl } = req.params;

    try {
        const urls = await connection.query('SELECT * FROM urls WHERE shortUrl = $1', [shortUrl]);

        if (urls.rowCount === 0) {
            return res.sendStatus(404);
        }

        await connection.query('UPDATE urls SET visits = visits + 1 WHERE shortUrl = $1', [shortUrl]);

        res.redirect(urls.rows);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUrlByIdControllers (req, res) {
    const { id } = req.params;

    try {
        const urls = await connection.query('SELECT * FROM urls WHERE id = $1', [id]);

        if (urls.rowCount === 0) {
            return res.sendStatus(404);
        }
        
        //Return urls.rown but delete the url.visits and url.userId
        delete urls.rows[0].visits;
        delete urls.rows[0].userId;

        res.status(200).send(urls.rows[0]);                  
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUrlsByUserIdControllers (userId) {
    try {
        const urls = await connection.query('SELECT * FROM urls WHERE userId = $1', [userId]);

        return urls.rows;

    } catch (error) {
        console.log(error);
    }
}

export async function deleteUrlControllers (req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    try {
        const url = await connection.query('SELECT * FROM urls WHERE id = $1', [id]);

        if (url.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (url.rows[0].userId !== user.id) {
            return res.sendStatus(401);
        }

        await connection.query('DELETE FROM urls WHERE id = $1', [id]);

        res.sendStatus(204);

    } catch (error) {
        res.status(500).send(error);
    }
    
}

export async function getVisitCountControllers (userId) {
    try {
        const visitCount = await connection.query('SELECT SUM(visits) FROM urls WHERE userId = $1', [userId]);

        return visitCount.rows[0];

    } catch (error) {
        console.log(error);
    }
}

export async function getRankingByUserIdControllers () {
    try {
        await connection.query('SELECT users.name, SUM(urls.visits) AS totalVisits FROM users INNER JOIN urls ON users.id = urls.userId GROUP BY users.name ORDER BY totalVisits DESC LIMIT 10');

    } catch (error) {
        console.log(error);
    }
}