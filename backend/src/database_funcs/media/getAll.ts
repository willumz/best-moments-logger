import mariadb from "mariadb";
import { Media } from "../../data_models";

export default async function get(pool: mariadb.Pool): Promise<Media[] | null> {
    let conn;
    let media: Media[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM media;");
        if (conn) conn.release();
        res.forEach((media: any) => {
            media.push({
                id: res[0].media_id,
                name: res[0].name,
                image_url: res[0].image_url,
                tmdb_id: res[0].tmdb_id,
                is_tv: res[0].is_tv,
            });
        });
        return media;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
