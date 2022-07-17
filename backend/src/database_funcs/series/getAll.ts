import mariadb from "mariadb";
import { Series } from "../../data_models";

export default async function get(pool: mariadb.Pool): Promise<Series[] | null> {
    let conn;
    let series: Series[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM series;");
        if (conn) conn.release();
        res.forEach((series: any) => {
            series.push({
                id: series.series_id,
                media_id: series.media_id,
                name: series.name,
                image_url: series.image_url,
                order: series.order,
                tmdb_id: series.tmdb_id,
            });
        });
        return series;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
