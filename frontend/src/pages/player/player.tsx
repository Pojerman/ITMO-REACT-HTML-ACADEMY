import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {useAppSelector} from '../../hooks';
import {FilmDetails} from '../../types';
import {useLoadFilmPlayer} from '../../hooks/film-player.ts';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.tsx';
import {TIMEOUT_SEC} from '../../const';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../enums/routes.ts';
import { videoTimeFormat} from '../../services/utils.ts';

export default function Player(): React.JSX.Element {
  const film: FilmDetails | null = useAppSelector((state) => state.FILM.filmById);
  const [timeout, setModalTimeout] = useState<ReturnType<typeof setTimeout>>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeLeft, setTimeLeft] = useState(videoRef.current?.duration ?? 0);
  const [progress, setProgress] = useState(0);

  useLoadFilmPlayer();

  const updateTimeLeft = (event: SyntheticEvent<HTMLVideoElement, Event>) => {
    setTimeLeft(event.currentTarget.duration - event.currentTarget.currentTime);
    setProgress(event.currentTarget.currentTime / event.currentTarget.duration * 100);
  };

  useEffect(() => () => clearTimeout(timeout), [timeout]);

  useEffect(() => {
    if (videoRef.current?.paused === isPlaying) {
      setIsPlaying(!isPlaying);
    }
  }, [videoRef.current?.paused, isPlaying]);

  const handleMouseEnter = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setModalTimeout(setTimeout(() => {
      videoRef.current?.play();
      setIsPlaying(true);
    }, TIMEOUT_SEC));
  };

  const handlePlayIconClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFullscreenIconClick = () => {
    videoRef.current?.requestFullscreen();
  };

  if(!film) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="player" onMouseEnter={handleMouseEnter}>
      <video
        ref={videoRef}
        src={film.videoLink}
        className="player__video"
        poster={film.backgroundImage}
        onTimeUpdate={(event) => updateTimeLeft(event)}
      >
      </video>
      <Link to={AppRoutes.Film.replace(':id', film.id)} className="player__exit">Exit</Link>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={100}></progress>
            <div className="player__toggler" style={{ left: `${progress}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{videoTimeFormat(timeLeft)}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayIconClick}>
            <svg viewBox="0 0 19 19" width={19} height={19}>
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{film.name}</div>
          <button type="button" className="player__full-screen" onClick={handleFullscreenIconClick}>
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
