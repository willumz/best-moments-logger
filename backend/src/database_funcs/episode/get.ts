import mariadb from "mariadb";
import { Episode } from "../../data_models";

export default async function get(pool: mariadb.Pool, id: number): Promise<Episode | null> {
    let conn;
    let episode: Episode;
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM episodes WHERE episode_id = ?", [id]);
        if (conn) conn.release();
        episode = {
            id: res[0].episode_id,
            series_id: res[0].series_id,
            name: res[0].name,
            image_url: res[0].image_url,
            order: res[0].order,
            tmdb_id: res[0].tmdb_id,
        };
        return episode;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
