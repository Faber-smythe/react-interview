import React from 'react';
// library import
import HSBar from "react-horizontal-stacked-bar-chart";



export default function LikesRatio(props) {
  const {likes, dislikes} = props;
  return (
    <HSBar
      height={5}
      id="likes-ratio-chart"
      fontColor="white"
      data={[
        {
          name: "likes",
          value: likes,
          color: "rgba(255, 255, 255, 0.8)"
        },
        {
          name: "dislikes",
          value: dislikes,
          color: "rgba(255, 255, 255, 0.3)"
        }
      ]}
    />
  )
}
