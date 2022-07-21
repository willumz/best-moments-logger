import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ContentId, Episode, Log } from "../data_models";
import EpisodeThumbnail from "../components/EpisodeThumbnail";
import LogRecord from "../components/LogRecord";
import LogPane from "../components/LogPane";
import LogEntry from "../components/LogEntry";
import TagBar from "../components/TagBar";

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
    useEffect(() => {
        axios.get(`/api/episode/${id}`).then(res => {
            setEpisode(res.data);
        });
    }, [id]);
    return (
        <div className="bg-slate-900 w-full min-w-screen min-h-screen h-full p-20">
            <div className="inline-block">
                <EpisodeThumbnail className="inline float-left" episode={episode}/>
                <div className="text-white inline-block align-top py-[3rem] md:p-[3rem]">
                    <text className="break-normal text-white text-[8vw] md:text-[4rem]">{episode.name}</text>
                </div>
            </div>
            <TagBar className="my-2 overflow-hidden break-words" id={episode.id} apiResource="episode" />
            <br />
            <LogPane content_id={{
                id: episode.id,
                type: ContentId.ContentIdType.Episode,
            }} />
        </div>
    )
}

export default EpisodeView;