import mariadb from "mariadb";
import { Episode } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    series_id: number
): Promise<Episode[] | null> {
    let conn;
    let episodes: Episode[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM episode WHERE series_id = ?", [series_id]);
        if (conn) conn.release();
        res.forEach((episode: any) => {
            episodes.push({
                id: episode.episode_id,
                series_id: episode.series_id,
                name: episode.name,
                image_url: episode.image_url,
                order: episode.order,
                tmdb_id: episode.tmdb_id,
            });
        });
        return episodes;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
