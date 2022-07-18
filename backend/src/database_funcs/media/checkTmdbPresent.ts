import mariadb from "mariadb";

export default async function get(
    pool: mariadb.Pool,
    tmdb_id: number,
    is_tv: boolean
): Promise<number | false> {
    let conn;
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT media_id FROM media WHERE tmdb_id = ? AND is_tv = ?", [
            tmdb_id,
            is_tv,
        ]);
        if (conn) conn.release();
        if (res.length > 0) return res[0].media_id;
        else return false;
    } catch (err) {
        if (conn) conn.release();
        throw err;
    }
}
