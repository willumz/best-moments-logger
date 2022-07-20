import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Log, Media, Series } from "../data_models";
import MediaPoster from "../components/MediaPoster";
import SeriesPoster from "../components/SeriesPoster";
import LogPane from "../components/LogPane";

const MediaView = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [media, setMedia] = useState<Media>({
        id: -1,
        name: "Loading...",
        image_url: "",
        tmdb_id: -1,
        is_tv: false,
    });
    const [series, setSeries] = useState<Series[]>([]);
    const [logs, setLogs] = useState<Log[]>([]);
    const clickSeries = (series: Series) => {
      navigate(`/series/${series.id}`);
    }
    useEffect(() => {
        axios.get(`/api/media/${id}`).then(res => {
            setMedia(res.data);
            if (res.data.is_tv) {
              axios.get(`/api/media/${id}/series`).then(res => {
                res.data.sort((a: Series, b: Series) => a.order - b.order);
                setSeries(res.data);
              });
            } else {
              axios.get(`/api/media/${id}/log`).then(res => {
                res.data.sort((a: Log, b: Log) => a.time - b.time);
                setLogs(res.data);
              });
            }
        });
    }, [id]);
    return (
        <div className="bg-slate-900 w-full min-w-screen min-h-screen h-full p-20">
            <div className="inline-block">
                <MediaPoster className="inline" media={media}/>
                <p className="text-white text-[4rem] inline align-top p-[3rem]">
                    {media.name}
                </p>
            </div>
            {
                media.is_tv ? (
                    <div className="grid grid-cols-auto-fill gap-5 my-10">
                        {
                            series.map(s => (<SeriesPoster key={s.id} series={s} onClick={clickSeries} className="hover:drop-shadow-[0_35px_35px_rgba(51,65,85,0.25)] hover:text-blue-500" caption />))
                        }
                    </div>
                ) : (
                  <LogPane logs={logs} />
                )
            }
        </div>
    )
}

export default MediaView;