import React from "react";
import { Tag } from "../data_models";

interface Props {
  tag: Tag;
  allowDelete?: boolean;
}

const TagBox = (props: Props) => {
  return (
    <div className="bg-teal-900 text-white rounded-md px-1 ml-2 text-sm inline align-middle">
        {props.tag.name}
    </div>
  )
}

export default TagBox;