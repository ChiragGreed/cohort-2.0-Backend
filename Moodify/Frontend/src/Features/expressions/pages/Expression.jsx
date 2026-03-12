import React, { useEffect, useRef, useState } from "react";
import "../style/expression.scss";
import { detectMood, setup } from "../utile";
import useSongs from "../../Home/hooks/useSongs";

const Expression = ({ onClick = () => { } }) => {


  const { context } = useSongs();
  const { Loading, Song } = context;

  const videoRef = useRef(null);
  const [mood, setMood] = useState("");
  const [faceLandmarker, setFaceLandmarker] = useState(null);

  useEffect(() => {
    setup(videoRef, setFaceLandmarker);
  }, []);

  useEffect(() => {
    onClick(mood);
  }, [mood]);

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
        {Loading ? 'Detecting...' : 'Detect mood'}
      </button>

      {Song ?
        <>
          <h1>Current Mood</h1>

          <div className={`mood_wrapper ${mood ? mood.toLowerCase() : ''}`}>
            <p className="mood_display">
              {mood ? mood.toLocaleUpperCase() : ''}
            </p>

          </div>
        </> :
        <></>
      }


    </div >
  );
}

export default Expression