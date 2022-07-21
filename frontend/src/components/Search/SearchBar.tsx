import React, { Component } from "react";
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import SearchItem from "./SearchItem";
import SearchItemContainer from "./SearchItemContainer";

interface Props {
    setSearch: (search: string) => void;
    onFocus?: () => undefined;
    onBlur?: () => undefined;
}
interface State {}

export default class SearchBar extends Component<Props, State> {
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.setSearch(event.target.value);
    }
    render() {
        return (
            <div className="rounded-xl border-[2px] dark:border-[1px] bg-slate-900 border-slate-700">
                <input
                    className="bg-transparent w-full outline-none flex items-center justify-between px-2 py-1 h-full text-gray-400"
                    placeholder="Add Tag..."
                    onChange={event => {
                        this.handleChange(event);
                    }}
                    onFocus={() => {
                        if (this.props.onFocus) this.props.onFocus();
                    }}
                    onBlur={() => {
                        if (this.props.onBlur) this.props.onBlur();
                    }}
                />
            </div>
        );
    }
}
