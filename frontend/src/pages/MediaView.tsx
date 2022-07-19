import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MediaView = () => {
    let { id } = useParams();
    axios.get(`/api/media/${id}`).then(res => {
        console.log(res.data);
    });
    return (
        <div>MediaView</div>
    )
}

export default MediaView;