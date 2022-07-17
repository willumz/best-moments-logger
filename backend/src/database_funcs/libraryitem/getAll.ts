import mariadb from "mariadb";
import { LibraryItem } from "../../data_models";

export default async function get(pool: mariadb.Pool): Promise<LibraryItem[] | null> {
    let conn;
    let libraryitems: LibraryItem[] = [];
    try {
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM libraryitem;");
        if (conn) conn.release();
        res.forEach((libraryitem: any) => {
            libraryitems.push({
                id: libraryitem.libraryitem_id,
                media_id: libraryitem.media_id,
            });
        });
        return libraryitems;
    } catch (err) {
        if (conn) conn.release();
        return null;
    }
}
