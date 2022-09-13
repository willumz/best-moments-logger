import React, { Component } from "react";
import ItemIdTitle from "./ItemIdTitle";
import SearchBar from "./SearchBar";
import SearchItemContainer from "./SearchItemContainer";

interface Props {
    items: ItemIdTitle[];
    selectItem: (item: ItemIdTitle) => void;
}
interface State {
    search: string;
    displayItems: boolean;
    clearSearch: number;
}

export default class Search extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            search: "",
            displayItems: false,
            clearSearch: 0,
        };
        this.onSearchFocus = this.onSearchFocus.bind(this);
        this.onSearchBlur = this.onSearchBlur.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.selectItemAndClear = this.selectItemAndClear.bind(this);
    }
    setSearch(search: string) {
        this.setState({ search });
    }
    onSearchFocus() {
        this.setState({ displayItems: true });
        return undefined;
    }
    onSearchBlur() {
        this.setState({ displayItems: false });
        return undefined;
    }
    selectItemAndClear(item: ItemIdTitle) {
        this.props.selectItem(item);
        this.setSearch("");
        this.setState({ clearSearch: this.state.clearSearch+1 });
    }
    render() {
        return (
            <div className="inline-block mr-2 align-middle float-right">
                <SearchBar
                    setSearch={this.setSearch}
                    onFocus={this.onSearchFocus}
                    onBlur={this.onSearchBlur}
                    clearSearch={this.state.clearSearch}
                />
                <SearchItemContainer
                    items={this.props.items.filter(item => {
                        return item.title.toLowerCase().includes(this.state.search.toLowerCase());
                    })}
                    search={this.state.search}
                    selectItem={this.selectItemAndClear}
                    displayItems={this.state.displayItems}
                />
            </div>
        );
    }
}
