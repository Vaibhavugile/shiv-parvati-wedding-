
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatePresence } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";

import Opening from "./components/Opening/Opening";
import HeroSection from "./components/HeroSection/HeroSection";
import InvitationDetailsSection from "./components/InvitationDetailsSection/InvitationDetailsSection";
import WeddingCelebrationsSection from "./components/WeddingCelebrationsSection/WeddingCelebrationsSection";
import BeforeTheBigDaySection from "./components/BeforeTheBigDaySection/BeforeTheBigDaySection";
import FinalBlessingSection from "./components/FinalBlessingSection/FinalBlessingSection";
import PetalFall from "./components/PetalFall/PetalFall";

import "./styles/invitation.css";

const ASSETS = "/assets/";
const MUSIC_SRC = `${ASSETS}wedding-music.mp3`;

export default function App() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [musicError, setMusicError] = useState(false);

  const audioRef = useRef(null);

  /* =========================================
     OPEN INVITATION + START MUSIC
  ========================================= */

  const handleOpenInvitation = useCallback(async () => {
    setOpened(true);

    const audio = audioRef.current;

    if (!audio) return;

    try {
      setMusicError(false);

      audio.volume = 0.65;
      audio.muted = false;

      await audio.play();

      setMusicOn(true);
    } catch (error) {
      console.error(
        "[Wedding Music] Automatic playback failed:",
        error
      );

      setMusicOn(false);
      setMusicError(true);
    }
  }, []);

  /* =========================================
     CLEANUP AUDIO
  ========================================= */

  useEffect(() => {
    return () => {
      const audio = audioRef.current;

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  /* =========================================
     MUSIC TOGGLE
  ========================================= */

  const toggleMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }

    try {
      setMusicError(false);

      audio.muted = false;
      audio.volume = 0.65;

      await audio.play();

      setMusicOn(true);
    } catch (error) {
      console.error(
        "[Wedding Music] Playback failed:",
        error
      );

      setMusicOn(false);
      setMusicError(true);
    }
  }, [musicOn]);

  /* =========================================
     AUDIO EVENTS
  ========================================= */

  const handleMusicPlay = useCallback(() => {
    setMusicOn(true);
    setMusicError(false);
  }, []);

  const handleMusicPause = useCallback(() => {
    setMusicOn(false);
  }, []);

  const handleMusicError = useCallback(() => {
    setMusicOn(false);
    setMusicError(true);

    console.error(
      "[Wedding Music] Could not load:",
      MUSIC_SRC
    );
  }, []);

  /* =========================================
     RENDER
  ========================================= */

  return (
    <main className="wedding-app">

      {/* =====================================
          BACKGROUND MUSIC
      ===================================== */}

      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="auto"
        onPlay={handleMusicPlay}
        onPause={handleMusicPause}
        onError={handleMusicError}
      />

      {/* =====================================
          OPENING INVITATION
      ===================================== */}

      <AnimatePresence mode="wait">
        {!opened && (
          <Opening
            key="opening"
            onOpen={handleOpenInvitation}
          />
        )}
      </AnimatePresence>

      {/* =====================================
          MAIN WEDDING INVITATION
      ===================================== */}

      {opened && (
        <>

          {/* MUSIC CONTROL */}

          <button
            className={`music-control${musicOn ? " is-playing" : ""}`}
            type="button"
            onClick={toggleMusic}
            aria-label={
              musicOn
                ? "Pause wedding music"
                : "Play wedding music"
            }
            aria-pressed={musicOn}
            title={
              musicError
                ? "Unable to load wedding music. Check the audio file."
                : musicOn
                  ? "Pause music"
                  : "Play music"
            }
          >
            {musicOn ? (
              <Music2 aria-hidden="true" />
            ) : (
              <VolumeX aria-hidden="true" />
            )}
          </button>

          {/* WEDDING SECTIONS */}

          <div className="wedding-page">

            <HeroSection />

            <InvitationDetailsSection />

            <WeddingCelebrationsSection />

            <BeforeTheBigDaySection />

            <FinalBlessingSection />

          </div>
        </>
      )}

      {/* =====================================
          PETAL FALL — ALWAYS VISIBLE
          Opening + All Wedding Sections
      ===================================== */}

      <PetalFall />

    </main>
  );
}
