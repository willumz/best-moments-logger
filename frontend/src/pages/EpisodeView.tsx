import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Episode, Log } from "../data_models";
import EpisodeThumbnail from "../components/EpisodeThumbnail";
import LogRecord from "../components/LogRecord";
import LogPane from "../components/LogPane";

const EpisodeView = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [episode, setEpisode] = useState<Episode>({
        id: -1,
        name: "Loading...",
        image_url: "",
        tmdb_id: -1,
        order: -1,
        series_id: -1,
    });
    const [logs, setLogs] = useState<Log[]>([]);
    useEffect(() => {
        axios.get(`/api/episode/${id}`).then(res => {
            setEpisode(res.data);
            axios.get(`/api/episode/${id}/log`).then(res => {
                res.data.sort((a: Log, b: Log) => a.time - b.time);
                setLogs(res.data);
            });
        });
    }, [id]);
    return (
        <div className="bg-slate-900 w-full min-w-screen min-h-screen h-full p-20">
            <div className="inline-block">
                <EpisodeThumbnail className="inline float-left" episode={episode}/>
                <p className="text-white text-[4rem] inline align-top p-[3rem]">
                    {episode.name}
                </p>
            </div>
            <LogPane logs={logs} />
        </div>
    )
}

export default EpisodeView;