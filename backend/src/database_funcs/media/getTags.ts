import mariadb from "mariadb";
import { Media, Tag } from "../../data_models";

export default async function get(pool: mariadb.Pool, media_id: number): Promise<Tag[] | null> {
    let conn;
    let tags: Tag[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query(
            `SELECT
                t.*
            FROM tag_media tm
            LEFT JOIN tags t
                ON tm.tag_id = t.tag_id
            WHERE tm.media_id = ?`,
            [media_id]
        );
        if (conn) conn.release();
        res.forEach((tags: any) => {
            tags.push({
                id: tags.tag_id,
                name: tags.name,
            });
        });
        return tags;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
