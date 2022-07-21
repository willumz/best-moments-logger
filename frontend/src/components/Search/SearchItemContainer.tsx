import React, { Component } from "react";
import ItemIdTitle from "./ItemIdTitle";
import SearchItem from "./SearchItem";

interface Props {
    items: ItemIdTitle[];
    search: string;
    displayItems: boolean;
    selectItem: (item: ItemIdTitle) => void;
}
interface State {
    hovering: boolean;
}

export default class SearchItemContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hovering: false };
    }
    onHover() {
        this.setState({ hovering: true });
    }
    offHover() {
        this.setState({ hovering: false });
    }
    insertLines(elements: JSX.Element[]) {
        let newArr: JSX.Element[] = [];
        elements.forEach((element, index) => {
            newArr.push(element);
            if (index !== elements.length - 1) {
                newArr.push(
                    <hr
                        key={element.key + "line"}
                        className="dark:border-slate-700 border-gray-200 dark:border-[0.5px] border-[1px]"
                    />
                );
            }
        });
        return newArr;
    }
    render() {
        return (
            <div
                className={`${
                    (this.props.displayItems || this.state.hovering)
                        ? "visible"
                        : "hidden"
                } rounded-xl bg-gray-50 border-gray-200 border-[2px] dark:border-[1px] h-fit dark:bg-slate-900 dark:border-slate-700 my-5 overflow-hidden py-1 absolute`}
                onMouseEnter={() => {
                    this.onHover();
                }}
                onMouseLeave={() => {
                    this.offHover();
                }}
                onClick={() => {
                    this.offHover();
                }}
            >
                {this.insertLines(
                    (() => {
                        let arr = this.props.items.map(item => (
                            <SearchItem
                                key={item.id}
                                text={item.title}
                                onClick={() => {
                                    this.props.selectItem(item);
                                    return undefined;
                                }}
                            />
                        ));
                        if (this.props.search.length > 0 && this.props.items.filter(item => item.title === this.props.search).length === 0) arr.push(
                            <SearchItem
                                key={-1}
                                text={this.props.search}
                                newIcon
                                onClick={() => {
                                    this.props.selectItem({ id: "-1", title: this.props.search });
                                    return undefined;
                            }} />
                        )
                        return arr;
                    })()
                )}
            </div>
        );
    }
}
