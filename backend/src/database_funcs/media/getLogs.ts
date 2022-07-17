import mariadb from "mariadb";
import { Log } from "../../data_models";

export default async function get(pool: mariadb.Pool, media_id: number): Promise<Log[] | null> {
    let conn;
    let logs: Log[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM logs WHERE media_id = ?", [media_id]);
        if (conn) conn.release();
        res.forEach((log: any) => {
            logs.push({
                id: log.log_id,
                episode_id: log.episode_id,
                media_id: log.media_id,
                time: log.time,
                time_created: log.time_created,
                note: log.note,
            });
        });
        return logs;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
