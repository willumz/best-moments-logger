import mariadb from "mariadb";
import { Episode } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    id: number,
    tag_id: number
): Promise<Episode | null> {
    let conn;
    let episode: Episode;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "INSERT INTO tag_episode (tag_id, episode_id) VALUES (?, ?);",
            [tag_id, id]
        );
        let res = await conn.query("SELECT * from episodes WHERE episode_id = ?;", [id]);
        if (conn) conn.release();
        episode = {
            id: res[0].episode_id,
            name: res[0].name,
            series_id: res[0].series_id,
            order: res[0].order,
            image_url: res[0].image_url,
            tmdb_id: res[0].tmdb_id,
        };
        return episode;
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
