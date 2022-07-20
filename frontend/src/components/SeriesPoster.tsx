import React, { useEffect } from "react";
import { Series } from "../data_models";

interface Props {
  className?: string;
  onClick?: (series: Series) => void;
  series: Series;
  caption?: boolean;
}

const SeriesPoster = (props: Props) => {
  return (
    <div className={props.className} onClick={() => { if (props.onClick) props.onClick(props.series) }}>
      <img className={`sm:w-full md:w-96 rounded-lg`} src={props.series.image_url} alt={`${props.series.name} Poster`}></img>
      { props.caption ? <p className="text-white text-md py-1">{props.series.name}</p> : null }
    </div>
  )
}

export default SeriesPoster;