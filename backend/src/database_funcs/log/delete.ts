import mariadb from "mariadb";
import { ContentId, Log } from "../../data_models";

export default async function delete_row(
    pool: mariadb.Pool,
    id: number,
): Promise<true | null> {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "DELETE FROM tag_log WHERE log_id = ?;",
            [id]
        );
        await conn.query(
            "DELETE FROM logs WHERE log_id = ?;",
            [id]
        );
        if (conn) conn.release();
        return true;
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
