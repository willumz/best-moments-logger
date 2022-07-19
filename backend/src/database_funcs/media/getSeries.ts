import mariadb from "mariadb";
import { Series } from "../../data_models";

export default async function get(pool: mariadb.Pool, media_id: number): Promise<Series[] | null> {
    let conn;
    let series: Series[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM series WHERE media_id = ?", [media_id]);
        if (conn) conn.release();
        res.forEach((seriesRes: any) => {
            series.push({
                id: seriesRes.series_id,
                media_id: seriesRes.media_id,
                name: seriesRes.name,
                image_url: seriesRes.image_url,
                order: seriesRes.order,
                tmdb_id: seriesRes.tmdb_id,
            });
        });
        return series;
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
