import React, { useEffect, useMemo, useRef, useState } from 'react'
import useSongs from '../hooks/useSongs'
import '../style/player.scss'

const Player = () => {
    const { context } = useSongs();
    const { Song, currentIndex, setCurrentIndex, isPlaying, setIsPlaying, progress, setProgress, duration, setDuration } = context;

    const audioRef = useRef(null);


    const currentSong = useMemo(() => {
        if (!Song || Song.length === 0) return null;
        return Song[currentIndex] || Song[0];
    }, [Song, currentIndex]);

    useEffect(() => {
        if (!Song || Song.length === 0) return;
        setCurrentIndex(0);
        setIsPlaying(false);
        setProgress(0);
    }, [Song]);

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        const onTimeUpdate = () => {
            setProgress(audio.currentTime);
        };

        const onLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const onEnded = () => {
            handleNext();
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('ended', onEnded);
        };
    }, [currentSong]);

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        if (isPlaying) {
            audio
                .play()
                .then(() => {
                    // started successfully
                })
                .catch(() => {
                    setIsPlaying(false);
                });
        } else {
            audio.pause();
        }
    }, [isPlaying, currentSong]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            return;
        }

        audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
    };

    const handleSelect = (index) => {
        setCurrentIndex(index);
        setIsPlaying(false);
    };

    const handlePrev = () => {
        if (!Song || Song.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? Song.length - 1 : prev - 1));
        setIsPlaying(false);
    };

    const handleNext = () => {
        if (!Song || Song.length === 0) return;
        setCurrentIndex((prev) => (prev === Song.length - 1 ? 0 : prev + 1));
        setIsPlaying(false);
    };

    const handleSeek = (event) => {
        if (!audioRef.current) return;
        const seekTime = Number(event.target.value);
        audioRef.current.currentTime = seekTime;
        setProgress(seekTime);
    };

    if (!Song || Song.length === 0) {
        return (
            <></>
        );
    }



    return (
        <div className='player'>
            <audio ref={audioRef} src={currentSong.songUrl} preload='metadata' />

            <div className='song'>

                <img className='cover' src={currentSong.coverUrl} alt={currentSong.title} />
                <div className='track-info'>


                    <div className='song_about'>
                        <div className='title_artist'>
                            <p className='title'>{currentSong.title}</p>
                            {currentSong.artist && <p className='artist'>{currentSong.artist}</p>}
                        </div>
                        <div className='controls'>
                            <button onClick={handlePrev} className='controlBtn'>◀</button>
                            <button onClick={togglePlay} className='controlBtn'>
                                {isPlaying ? '⏸' : '▶'}
                            </button>
                            <button onClick={handleNext} className='controlBtn'>▶</button>
                        </div>
                    </div>
                    
                    <div className='progress'>
                        <input
                            type='range'
                            min={0}
                            max={duration || 0}
                            value={progress}
                            onChange={handleSeek}
                        />
                        <div className='time'>
                            <span>{formatTime(progress)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

function formatTime(seconds) {
    if (!seconds || Number.isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

export default Player
