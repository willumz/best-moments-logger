import mariadb from "mariadb";
import { Media } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    name: string,
    image_url: string,
    tmdb_id: number,
    is_tv: boolean
): Promise<Media> {
    let conn;
    let media: Media;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "INSERT INTO media (name, image_url, tmdb_id, is_tv) VALUES (?, ?, ?, ?);",
            [name, image_url, tmdb_id, is_tv]
        );
        let res = await conn.query("SELECT * from media WHERE media_id = LAST_INSERT_ID();");
        if (conn) conn.release();
        media = {
            id: res[0].media_id,
            name: res[0].name,
            image_url: res[0].image_url,
            tmdb_id: res[0].tmdb_id,
            is_tv: res[0].is_tv,
        };
        conn.release();
        return media;
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
