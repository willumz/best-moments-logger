import React from "react";
import { Tag } from "../data_models";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

interface Props {
  tag: Tag;
  allowDelete?: boolean;
  removeTag?: (tag: Tag) => void;
}

const TagBox = (props: Props) => {

  const [showDelete, setShowDelete] = React.useState(false);


  return (
    <div className="bg-teal-900 text-white rounded-md px-1 ml-2 text-sm inline align-middle" onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)} >
        {props.tag.name}
        <i className={`bi bi-x-circle-fill ml-1 ${showDelete ? "text-white" : "text-transparent"} relative text-sm`} onClick={() => {if (props.removeTag) props.removeTag(props.tag)}}></i>
    </div>
  )
}

export default TagBox;