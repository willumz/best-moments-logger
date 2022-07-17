import mariadb from "mariadb";
import { LibraryItem } from "../../data_models";

export default async function get(pool: mariadb.Pool, id: number): Promise<LibraryItem | null> {
    let conn;
    let libraryitem: LibraryItem;
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM libraryitem WHERE libraryitem_id = ?", [id]);
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
