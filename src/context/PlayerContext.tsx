import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

interface PlayerContextProps {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  seekBg: React.MutableRefObject<HTMLDivElement | null>;
  seekBar: React.MutableRefObject<HTMLDivElement | null>;
  track: (typeof songsData)[0];
  setTrack: React.Dispatch<React.SetStateAction<(typeof songsData)[0]>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  time: {
    currentTime: { second: number; minute: number };
    totalTime: { second: number; minute: number };
  };
  setTime: React.Dispatch<
    React.SetStateAction<{
      currentTime: { second: number; minute: number };
      totalTime: { second: number; minute: number };
    }>
  >;
  play: () => void;
  pause: () => void;
  playWithId: (id: number) => void;
}

export const PlayerContext = createContext<PlayerContextProps | null>(null);

const PlayerContextProvider = (props: any) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekBg = useRef<HTMLDivElement | null>(null);
  const seekBar = useRef<HTMLDivElement | null>(null);

  const [track, setTrack] = useState(songsData[1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const playWithId = async (id: number) => {
    await setTrack(songsData[id]);
    await audioRef.current?.play();
    setIsPlaying(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current?.play();
      setIsPlaying(true);
    }
  };
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const seekSong = async (e: any) => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          if (audioRef.current) {
            if (seekBar.current) {
              seekBar.current.style.width =
                Math.floor(
                  (audioRef.current.currentTime / audioRef.current.duration) *
                    100
                ) + "%";
            }
            setTime({
              currentTime: {
                second: Math.floor(audioRef.current.currentTime % 60),
                minute: Math.floor(audioRef.current.currentTime / 60),
              },
              totalTime: {
                second: Math.floor(audioRef.current.duration % 60),
                minute: Math.floor(audioRef.current.duration / 60),
              },
            });
          }
        };
      }
    }, 1000);
  }, [audioRef]);
  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    isPlaying,
    setIsPlaying,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
