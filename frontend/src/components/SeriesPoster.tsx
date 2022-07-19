import React from "react";
import { Series } from "../data_models";

interface Props {
  className?: string;
  series: Series;
}

const SeriesPoster = (props: Props) => {
  return (
    <div className="">
      <img className={`sm:w-full md:w-96 rounded-lg ${props.className}`} src={props.series.image_url} alt={`${props.series.name} Poster`}></img>
      <p className="text-white text-md py-1">{props.series.name}</p>
    </div>
  )
}

export default SeriesPoster;