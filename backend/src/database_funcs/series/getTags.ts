import mariadb from "mariadb";
import { Tag } from "../../data_models";

export default async function get(pool: mariadb.Pool, series_id: number): Promise<Tag[] | null> {
    let conn;
    let tags: Tag[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query(
            `SELECT
                t.*
            FROM tag_series ts
            LEFT JOIN tags t
                ON ts.tag_id = t.tag_id
            WHERE ts.series_id = ?`,
            [series_id]
        );
        if (conn) conn.release();
        res.forEach((tagsRes: any) => {
            tags.push({
                id: tagsRes.tag_id,
                name: tagsRes.name,
            });
        });
        return tags;
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
