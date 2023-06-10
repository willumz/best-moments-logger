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
        // Check if exists
        let check = await conn.query(
            "SELECT * FROM episodes WHERE tmdb_id = ? AND series_id = ?",
            [tmdb_id, series_id]
        );
        let res;
        if (check.length > 0) {
            // If exists update instead of creating new
            await conn.query(
                "UPDATE episodes SET name = ?, image_url = ?, `order` = ? WHERE episode_id = ?",
                [name, image_url, order, check[0].episode_id]
            );
            res = await conn.query(
                "SELECT * FROM episodes WHERE episode_id = ?",
                [check[0].episode_id]
            );
        } else {
            await conn.query(
                "INSERT INTO episodes (series_id, name, `order`, image_url, tmdb_id) VALUES (?, ?, ?, ?, ?);",
                [series_id, name, order, image_url, tmdb_id]
            );
            res = await conn.query("SELECT * from episodes WHERE episode_id = LAST_INSERT_ID();");
        }
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
