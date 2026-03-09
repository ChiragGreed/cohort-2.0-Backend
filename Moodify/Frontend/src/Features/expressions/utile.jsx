import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useState } from 'react'


export const setup = async (videoRef, setFaceLandmarker) => {
    let stream;

    const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    const landmarker = await FaceLandmarker.createFromOptions(
        filesetResolver,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "IMAGE", // 👈 IMPORTANT CHANGE
            numFaces: 1
        }
    );

    setFaceLandmarker(landmarker);

    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            resolve();
        };
    });

    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
};

export const detectMood = (videoRef, setMood, faceLandmarker) => {

    const getScore = (categories, name) =>
        categories.find(c => c.categoryName === name)?.score || 0;

    if (!faceLandmarker || !videoRef.current) return;

    if (videoRef.current.videoWidth === 0) {
        setMood("Camera not ready");
        return;
    }

    const results = faceLandmarker.detect(videoRef.current);

    if (!results.faceBlendshapes?.length) {
        setMood("No face detected");
        return;
    }

    const categories = results.faceBlendshapes[0].categories;

    const smile =
        getScore(categories, "mouthSmileLeft") +
        getScore(categories, "mouthSmileRight");

    const jawOpen = getScore(categories, "jawOpen");

    const browDown =
        getScore(categories, "browDownLeft") +
        getScore(categories, "browDownRight");

    const frown =
        getScore(categories, "mouthFrownLeft") +
        getScore(categories, "mouthFrownRight");

    if (smile > 1.0) return setMood("😊 Happy");
    if (jawOpen > 0.7) return setMood("😮 Surprised");
    if (browDown > 0.8) return setMood("😠 Angry");
    if (frown > 0.001) return setMood("😢 Sad");

    setMood("😐 Neutral");

}

