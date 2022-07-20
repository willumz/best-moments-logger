import React from "react";
import { Episode } from "../data_models";

interface Props {
  className?: string;
  episode: Episode;
  onClick?: (episode: Episode) => void;
  caption?: boolean;
}

const EpisodeThumbnail = (props: Props) => {
  return (
    <div className={props.className} onClick={() => { if (props.onClick) props.onClick(props.episode) }}>
      <img className={`sm:w-full md:w-96 rounded-lg ${props.className}`} src={props.episode.image_url} alt={`${props.episode.name} Thumbnail`}></img>
      { props.caption ? <p className="text-white text-md py-1">{props.episode.name}</p> : null }
    </div>
  )
}

export default EpisodeThumbnail;