import mariadb from "mariadb";
import { Series } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    media_id: number,
    name: string,
    image_url: string,
    order: number,
    tmdb_id: number
): Promise<Series> {
    let conn;
    let series: Series;
    try {
        conn = await pool.getConnection();
        // Check if exists
        let check = await conn.query(
            "SELECT * FROM series WHERE tmdb_id = ? AND media_id = ?",
            [tmdb_id, media_id]
        );
        let res;
        if (check.length > 0) {
            // If exists update instead of creating new
            await conn.query(
                "UPDATE series SET name = ?, image_url = ?, `order` = ? WHERE series_id = ?",
                [name, image_url, order, check[0].series_id]
            );
            res = await conn.query(
                "SELECT * FROM series WHERE series_id = ?",
                [check[0].series_id]
            );
        } else {
            await conn.query(
                "INSERT INTO series (media_id, name, image_url, `order`, tmdb_id) VALUES (?, ?, ?, ?, ?);",
                [media_id, name, image_url, order, tmdb_id]
            );
            res = await conn.query("SELECT * from series WHERE series_id = LAST_INSERT_ID();");
        }
        if (conn) conn.release();
        series = {
            id: res[0].series_id,
            media_id: res[0].media_id,
            name: res[0].name,
            image_url: res[0].image_url,
            order: res[0].order,
            tmdb_id: res[0].tmdb_id,
        };
        return series;
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
