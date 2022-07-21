import mariadb from "mariadb";
import { Media } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    id: number,
    tag_id: number
): Promise<void> {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "DELETE FROM tag_log WHERE tag_id = ? AND log_id = ?;",
            [tag_id, id]
        );
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
