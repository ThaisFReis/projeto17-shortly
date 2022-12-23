export async function tokenMiddlewares (req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = verifiedToken;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
}