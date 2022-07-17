import mariadb from "mariadb";
import { Media, Series } from "../../data_models";

export default async function get(pool: mariadb.Pool, media_id: number): Promise<Series[] | null> {
    let conn;
    let series: Series[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM series WHERE media_id = ?", [media_id]);
        if (conn) conn.release();
        res.forEach((series: any) => {
            series.push({
                id: res[0].series_id,
                media_id: res[0].media_id,
                name: res[0].name,
                image_url: res[0].image_url,
                order: res[0].order,
                tmdb_id: res[0].tmdb_id,
            });
        });
        return series;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
