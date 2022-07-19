import mariadb from "mariadb";
import { Log } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    id: number,
    tag_id: number
): Promise<Log | null> {
    let conn;
    let log: Log;
    try {
        conn = await pool.getConnection();
        await conn.query(
            "INSERT INTO tag_log (tag_id, log_id) VALUES (?, ?);",
            [tag_id, id]
        );
        let res = await conn.query("SELECT * from logs WHERE log_id = ?;", [id]);
        if (conn) conn.release();
        log = {
            id: res[0].log_id,
            episode_id: res[0].episode_id,
            media_id: res[0].media_id,
            time: res[0].time,
            time_created: res[0].time_created,
            note: res[0].note,
        };
        return log;
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
