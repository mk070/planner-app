import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

const songs = [
  {
    title: 'Na ready',
    artist: 'Artist 1',
    coverImage: 'https://southmp3.org/wp-content/uploads/2023/06/Leo-2023.jpg',
    audio: 'https://www.mtvhustle.com/wp-content/uploads/2023/06/Naa-Ready-Ringtone-Mp3.mp3',
  },
  {
    title: 'Daavula Darling',
    artist: 'Artist 2',
    coverImage: 'https://masstamilan.dev/i/wp/daavula-darling-indie-tamil-2023.webp',
    audio: 'https://masstamilan.dev/downloader/u3FB0rr21AM3D6DkTvi1iw/1687881281/p128_cdn/24238',
  },
  {
    title: 'Makka Makka',
    artist: 'Artist 3',
    coverImage: 'https://masstamilan.dev/i/wp/makka-makka-indie-tamil-2023.webp',
    audio: 'https://masstamilan.dev/downloader/Bf4JbSfoV8lapZ63OTKT4g/1687882087/p128_cdn/24236',
  },
  {
    title: 'Vannamayilae ',
    artist: 'Artist 4',
    coverImage: 'https://masstamilan.dev/i/wp/vannamayilae-indie-tamil-2023.webp',
    audio: 'https://masstamilan.dev/downloader/M0mMeHYg7miakrCBefV8Ow/1687884610/p128_cdn/24235',
  },
  {
    title: 'Na Na Na Na ',
    artist: 'Artist 5',
    coverImage: 'https://masstamilan.dev/i/wp/na-na-na-na-indie-tamil-2023.webp',
    audio: 'https://masstamilan.dev/downloader/5I0Nb4rUdBh1kqlCLE0HVg/1687884653/p128_cdn/24234',
  }
];

const MusicWidget = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const musicWidgetStyle = {
    width: '300px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  };

  const coverContainerStyle = {
    width: '200px',
    height: '200px',
    overflow: 'hidden',
    marginBottom: '20px',
  };

  const coverImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const controlsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#333',
  };

  return (
    <div className="music-widget" style={musicWidgetStyle}>
      <div className="cover-container" style={coverContainerStyle}>
        <img src={currentSong?.coverImage} alt="Song Cover" className="cover-image" style={coverImageStyle} />
      </div>
      <div className="song-details">
        <div className="title">{currentSong?.title}</div>
        <div className="artist">{currentSong?.artist}</div>
      </div>
      <div className="controls-container" style={controlsContainerStyle}>
        <button onClick={handlePreviousSong} style={buttonStyle}>
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <button onClick={handlePlayPause} style={buttonStyle}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={handleNextSong} style={buttonStyle}>
          <FontAwesomeIcon icon={faStepForward} />
        </button>
      </div>
      <audio ref={audioRef} src={currentSong?.audio} onEnded={handleAudioEnded} />
    </div>
  );
};

export default MusicWidget;
