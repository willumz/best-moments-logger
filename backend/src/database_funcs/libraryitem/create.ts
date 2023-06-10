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
        let check = await conn.query(
            "SELECT * FROM libraryitem WHERE media_id = ?",
            [media_id]
        );
        let res;
        if (check.length > 0) {
            // If exists update instead of creating new
            res = await conn.query(
                "SELECT * FROM libraryitem WHERE libraryitem_id = ?",
                [check[0].libraryitem_id]
            );
        } else {
            await conn.query("INSERT INTO libraryitem (media_id) VALUES (?);", [media_id]);
            res = await conn.query(
                "SELECT * from libraryitem WHERE libraryitem_id = LAST_INSERT_ID();"
            );
        }
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
