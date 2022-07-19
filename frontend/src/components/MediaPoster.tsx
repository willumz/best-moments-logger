import React from "react";
import { Media } from "../data_models";

interface Props {
  className?: string;
  media: Media;
}

const MediaPoster = (props: Props) => {
  return (
    <img className={`sm:w-full md:w-96 rounded-lg ${props.className}`} src={props.media.image_url} alt={`${props.media.name} Poster`}></img>
  )
}

export default MediaPoster;