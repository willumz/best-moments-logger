import mariadb from "mariadb";
import { ContentId, Log } from "../../data_models";

export default async function update(
    pool: mariadb.Pool,
    id: number,
    content_id: ContentId.ContentId,
    note: string,
    time: number
): Promise<Log | null> {
    let conn;
    let log: Log;
    try {
        conn = await pool.getConnection();
        let episode_id: number | null = null;
        let media_id: number | null = null;
        if (content_id !== undefined) {
            if (content_id.type === ContentId.ContentIdType.Media) {
                media_id = content_id.id;
                episode_id = null;
            } else {
                episode_id = content_id.id;
                media_id = null;
            }
        }
        let datetime = new Date(Date.now()).toISOString().slice(0, 19).replace("T", " ");
        await conn.query(
            "UPDATE logs SET episode_id = IFNULL(?, episode_id), media_id = IFNULL(?, media_id), time = IFNULL(?, time), note = IFNULL(?, note), time_created = IFNULL(?, time_created) WHERE log_id = ?;",
            [episode_id, media_id, time, note, datetime, id]
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
