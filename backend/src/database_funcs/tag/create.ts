import mariadb from "mariadb";
import { Tag } from "../../data_models";

export default async function get(pool: mariadb.Pool, name: string): Promise<Tag | null> {
    let conn;
    let tag: Tag;
    try {
        conn = await pool.getConnection();
        await conn.query("INSERT INTO tags (name) VALUES (?);", [name]);
        let res = await conn.query("SELECT * from tags WHERE tag_id = LAST_INSERT_ID();");
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
