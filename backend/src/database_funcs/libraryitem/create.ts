import mariadb from "mariadb";
import { LibraryItem } from "../../data_models";

export default async function get(
    pool: mariadb.Pool,
    media_id: number
): Promise<LibraryItem | null> {
    let conn;
    let libraryitem: LibraryItem;
    try {
        conn = await pool.getConnection();
        await conn.query("INSERT INTO libraryitem (media_id) VALUES (?);", [media_id]);
        let res = await conn.query(
            "SELECT * from libraryitem WHERE libraryitem_id = LAST_INSERT_ID();"
        );
        if (conn) conn.release();
        libraryitem = {
            id: res[0].libraryitem_id,
            media_id: res[0].media_id,
        };
        return libraryitem;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
