import React from "react";
import { Log } from "../data_models";
import LogRecord from "./LogRecord";

interface Props {
    logs: Log[];
}

const LogPane = (props: Props) => {
  return (
    <div className="py-6">
        {
            props.logs.map(l => (<><LogRecord key={l.id} log={l} /><br /></>))
        }
    </div>
  )
}

export default LogPane