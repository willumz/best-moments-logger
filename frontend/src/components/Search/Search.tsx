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
}

export default class Search extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            search: "",
            displayItems: false,
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
    }
    render() {
        return (
            <div className="inline-block max-w-[20%] mr-2 align-middle float-right">
                <SearchBar
                    setSearch={this.setSearch}
                    onFocus={this.onSearchFocus}
                    onBlur={this.onSearchBlur}
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
