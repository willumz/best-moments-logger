import mariadb from "mariadb";
import { Tag } from "../../data_models";

export default async function get(pool: mariadb.Pool, id: number): Promise<Tag | null> {
    let conn;
    let tag: Tag;
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM tags WHERE tag_id = ?", [id]);
        if (conn) conn.release();
        tag = {
            id: res[0].tag_id,
            name: res[0].name,
        };
        return tag;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
