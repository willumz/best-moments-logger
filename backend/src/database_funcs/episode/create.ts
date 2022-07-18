import mariadb from "mariadb";
import { Episode } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    series_id: number,
    name: string,
    order: number,
    image_url: string,
    tmdb_id: number
): Promise<Episode> {
    let conn;
    let episode: Episode;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "INSERT INTO episodes (series_id, name, `order`, image_url, tmdb_id) VALUES (?, ?, ?, ?, ?);",
            [series_id, name, order, image_url, tmdb_id]
        );
        let res = await conn.query("SELECT * from episodes WHERE episode_id = LAST_INSERT_ID();");
        if (conn) conn.release();
        episode = {
            id: res[0].episode_id,
            series_id: res[0].series_id,
            name: res[0].name,
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
