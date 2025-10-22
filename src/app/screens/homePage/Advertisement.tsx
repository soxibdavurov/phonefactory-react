import React from "react";
import { Container } from "@mui/material";

export default function Advertisement() {
  return (
    <div className="ads-restaurant-frame">
      <video
        className={"ads-video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source type="video/mp4" src="video/pf1.mp4" />
      </video>{" "}
      <video
        className={"ads-video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-media=""
      >
        <source type="video/mp4" src="video/pf2.mp4" />
      </video>
    </div>
  );
}
