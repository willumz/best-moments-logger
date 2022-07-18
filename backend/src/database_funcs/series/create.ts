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
        await conn.query(
            "INSERT INTO series (media_id, name, image_url, `order`, tmdb_id) VALUES (?, ?, ?, ?, ?);",
            [media_id, name, image_url, order, tmdb_id]
        );
        let res = await conn.query("SELECT * from series WHERE series_id = LAST_INSERT_ID();");
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
