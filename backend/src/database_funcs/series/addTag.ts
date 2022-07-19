import mariadb from "mariadb";
import { Series } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    id: number,
    tag_id: number
): Promise<Series | null> {
    let conn;
    let series: Series;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "INSERT INTO tag_series (tag_id, series_id) VALUES (?, ?);",
            [tag_id, id]
        );
        let res = await conn.query("SELECT * from series WHERE series_id = ?;", [id]);
        if (conn) conn.release();
        series = {
            id: res[0].series_id,
            name: res[0].name,
            image_url: res[0].image_url,
            tmdb_id: res[0].tmdb_id,
            media_id: res[0].media_id,
            order: res[0].order,
        };
        return series;
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
