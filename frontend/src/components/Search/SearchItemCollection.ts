import ItemIdTitle from "./ItemIdTitle";
import SearchItemObject from "./SearchItemObject";

export default class SearchItemCollection<T> {
    items: SearchItemObject<T>[] = [];
    /**
     * @description Create a new item in the collection
     * @param title - The title of the search item
     * @param data - any extra data to be stored (optional)
     * @returns the ID of the item
     */
    newItem(title: string, data: T): string {
        let new_item = new SearchItemObject(title, data);
        this.items.push(new_item);
        return new_item.id;
    }
    getById(id: string): SearchItemObject<T> | undefined {
        return this.items.find(item => item.id === id);
    }
    getAllIdTitle(): ItemIdTitle[] {
        return this.items.map(item => item.asIdTitle());
    }
}
