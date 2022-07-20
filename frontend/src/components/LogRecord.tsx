import React, { useEffect, useState } from "react";
import { Log } from "../data_models";

interface Props {
    log: Log;
}

const LogRecord = (props: Props) => {
  const [time, setTime] = useState<string>(props.log.time.toString());
  const trimNote = (note: string) => {
    if (note.length > 100) {
      return note.substring(0, 100) + "...";
    }
    return note;
  }
  useEffect(() => {
    let minutes = Math.floor(props.log.time / 60);
    let seconds = props.log.time % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    setTime(`${hours > 0 ? `${hours}:` : ""}${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
  }, [props.log]);
  return (
    <div className="py-2 inline-block">
      <div className="text-white text-lg inline px-2">{time}</div>
      <div className="text-white text-lg inline">{trimNote(props.log.note)}</div>
    </div>
  )
}

export default LogRecord;