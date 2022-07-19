import React from "react";
import { Media } from "../data_models";
import { useNavigate } from "react-router-dom";

interface Props {
    media: Media;
}

const LibraryMedia = (props: Props) => {
  let navigate = useNavigate();
  let clickMedia = (e: any) => {
    navigate(`/media/${props.media.id}`);
  }
  return (
    <div className="">
        <img className="w-48 rounded-lg hover:drop-shadow-[0_35px_35px_rgba(51,65,85,0.25)]" src={props.media.image_url} onClick={clickMedia} alt={props.media.name}></img>
    </div>
  )
}

export default LibraryMedia