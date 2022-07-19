import React from 'react'

interface Props {
    image_url: string;
}

const LibraryMedia = (props: Props) => {
  return (
    <div className="">
        <img className="w-48 rounded-lg hover:drop-shadow-[0_35px_35px_rgba(51,65,85,0.25)]" src={props.image_url}></img>
    </div>
  )
}

export default LibraryMedia