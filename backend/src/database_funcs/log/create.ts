import mariadb from "mariadb";
import { Log } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    content_id: { id: number; type: 0 | 1 },
    note: string,
    time: number
): Promise<Log | null> {
    let conn;
    let log: Log;
    try {
        conn = await pool.getConnection();
        let episode_id: number | null;
        let media_id: number | null;
        if (content_id.type === 0) {
            media_id = content_id.id;
            episode_id = null;
        } else {
            episode_id = content_id.id;
            media_id = null;
        }
        let datetime = Date.now();
        await conn.query(
            "INSERT INTO logs (episode_id, media_id, time, note, time_created) VALUES (?, ?, ?, ?, ?);",
            [episode_id, media_id, time, note, datetime]
        );
        let res = await conn.query("SELECT * from logs WHERE log_id = LAST_INSERT_ID();");
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
        return null;
    }
}
