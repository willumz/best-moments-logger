import mariadb from "mariadb";
import { Episode } from "../../data_models";

export default async function get(pool: mariadb.Pool): Promise<Episode[] | null> {
    let conn;
    let episodes: Episode[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM episodes;");
        if (conn) conn.release();
        res.forEach((episode: any) => {
            episodes.push({
                id: res.episode_id,
                series_id: res.series_id,
                name: res.name,
                image_url: res.image_url,
                order: res.order,
                tmdb_id: res.tmdb_id,
            });
        });
        return episodes;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
