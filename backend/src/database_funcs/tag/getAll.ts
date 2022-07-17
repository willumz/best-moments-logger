import mariadb from "mariadb";
import { Tag } from "../../data_models";

export default async function get(pool: mariadb.Pool): Promise<Tag[] | null> {
    let conn;
    let tags: Tag[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM tags;");
        if (conn) conn.release();
        res.forEach((tag: any) => {
            tags.push({
                id: tag.tag_id,
                name: tag.name,
            });
        });
        return tags;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
