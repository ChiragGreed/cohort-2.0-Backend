import React, { useEffect, useRef, useState } from "react";
import "../style/expression.scss";
import { detectMood, setup } from "../utile";

const Expression = () => {
  const videoRef = useRef(null);
  const [mood, setMood] = useState("");
  const [faceLandmarker, setFaceLandmarker] = useState(null);

  useEffect(() => {
    setup(videoRef, setFaceLandmarker);
  }, []);

  const handleDetect = () => {
    detectMood(videoRef, setMood, faceLandmarker);
  };

  return (
    <div className="expression_wrapper">
      <video
        ref={videoRef}
        width="480"
        height="360"
        autoPlay
        muted
        playsInline
      />

      <button onClick={handleDetect} className="detect_btn">
        Detect Mood
      </button>

      <h1>Current Mood</h1>
      <div className="mood_display">{mood}</div>
    </div>
  );
}

export default Expression