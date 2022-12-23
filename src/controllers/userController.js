import { getVisitCountControllers } from "./urlsController.js";
import { getUrlByIdControllers, getRankingByUserIdControllers } from "./urlsController.js";

export async function getUserByIdControllers (req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (user.id !== id) {
        return res.sendStatus(401);
    }

    try {
        const visitCountResult = await getVisitCountControllers(id);
        const visitCount = visitCountResult.rows;

        const urls = await getUrlByIdControllers(id);
        const userUrls = urls.rows;

        const userInfos = {
            id: user.id,
            name: user.name,
            email: user.email,
            visitCount: visitCount[0].sum,
            urls: userUrls
        }

        res.status(200).send(userInfos);
    } catch (error) {
        res.status(500).send("Erro in function getUserByIdControllers");
    }

}

export async function getRanking (req, res) {
    try {
        const ranking = await getRankingByUserIdControllers();

        res.status(200).send(ranking.rows);
    } catch (error) {
        res.status(500).send("Erro in function getRanking");
    }
}