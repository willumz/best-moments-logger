import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Episode, Series } from "../data_models";
import SeriesPoster from "../components/SeriesPoster";
import EpisodeThumbnail from "../components/EpisodeThumbnail";

const SeriesView = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [series, setSeries] = useState<Series>({
        id: -1,
        name: "Loading...",
        image_url: "",
        tmdb_id: -1,
        order: -1,
        media_id: -1,
    });
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const clickEpisode = (episode: Episode) => {
        navigate(`/episode/${episode.id}`);
    };
    useEffect(() => {
        axios.get(`/api/series/${id}`).then(res => {
            setSeries(res.data);
            axios.get(`/api/series/${id}/episode`).then(res => {
                res.data.sort((a: Series, b: Series) => a.order - b.order);
                setEpisodes(res.data);
            });
        });
    }, [id]);
    return (
        <div className="bg-slate-900 w-full min-w-screen min-h-screen h-full p-20">
            <div className="inline-block">
                <SeriesPoster className="inline float-left" series={series}/>
                <p className="text-white text-[4rem] inline align-top p-[3rem]">
                    {series.name}
                </p>
            </div>
            <div className="grid grid-cols-auto-fill gap-5 my-10">
                {
                    episodes.map(e => (<EpisodeThumbnail key={e.id} episode={e} onClick={clickEpisode} className="hover:drop-shadow-[0_35px_35px_rgba(51,65,85,0.25)] hover:text-blue-500" caption />))
                }
            </div>
        </div>
    )
}

export default SeriesView;