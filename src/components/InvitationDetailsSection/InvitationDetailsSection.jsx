
import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import "./InvitationDetailsSection.css";

// =========================================================
// WEDDING DETAILS
// =========================================================

const WEDDING_DATE = new Date(2026, 11, 10, 0, 0, 0);

const WEDDING_DATE_LABEL = "THURSDAY · 10 DECEMBER 2026";
const WEDDING_LOCATION = "Nagpur, Maharashtra";

// Replace with actual parents' names
const GROOM_PARENTS = "Late Shri.Tukaramji Kapse & Smt. Jyoti Kapse";
const BRIDE_PARENTS = "Mr. Shekharrao Khangar & Mrs. Veena Khangar";

// =========================================================
// COUNTDOWN
// =========================================================

function getCountdown() {
  const difference = WEDDING_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return {
      completed: true,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  return {
    completed: false,
    days: String(
      Math.floor(difference / 86400000)
    ).padStart(2, "0"),

    hours: String(
      Math.floor((difference / 3600000) % 24)
    ).padStart(2, "0"),

    minutes: String(
      Math.floor((difference / 60000) % 60)
    ).padStart(2, "0"),

    seconds: String(
      Math.floor((difference / 1000) % 60)
    ).padStart(2, "0"),
  };
}

// =========================================================
// REVEAL ANIMATION
// =========================================================

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const revealViewport = {
  once: true,
  amount: 0.05,
  margin: "0px 0px 150px 0px",
};

// =========================================================
// SCRATCH CARD COMPONENT
// =========================================================

function ScratchDateCard() {
  const canvasRef = useRef(null);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef(null);

  const [revealed, setRevealed] = useState(false);

  // -------------------------------------------------------
  // DRAW GOLD SCRATCH COATING
  // -------------------------------------------------------

  useEffect(() => {
    if (revealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawCoating = () => {
      if (revealed) return;

      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gradient = ctx.createLinearGradient(
        0,
        0,
        rect.width,
        rect.height
      );

      gradient.addColorStop(0, "#f8e8b5");
      gradient.addColorStop(0.3, "#e5c879");
      gradient.addColorStop(0.55, "#d2ad59");
      gradient.addColorStop(0.8, "#f5dfa5");
      gradient.addColorStop(1, "#c99b42");

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
      );

      // Gold decorative shine
      ctx.fillStyle = "rgba(255,255,255,0.25)";

      ctx.fillRect(
        0,
        0,
        rect.width,
        4
      );

      // Scratch instruction
      ctx.fillStyle = "#795729";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "600 12px Georgia";

      ctx.fillText(
        "✦  SCRATCH TO REVEAL  ✦",
        rect.width / 2,
        rect.height / 2
      );

      // Decorative stars
      ctx.font = "16px Georgia";
      ctx.fillText(
        "✧",
        rect.width * 0.2,
        rect.height * 0.25
      );

      ctx.fillText(
        "✧",
        rect.width * 0.8,
        rect.height * 0.75
      );
    };

    drawCoating();

    const observer = new ResizeObserver(drawCoating);

    observer.observe(canvas);

    return () => observer.disconnect();
  }, [revealed]);

  // -------------------------------------------------------
  // SCRATCH AT POINTER POSITION
  // -------------------------------------------------------

  const scratchAt = (event) => {
    const canvas = canvasRef.current;

    if (!canvas || !isScratchingRef.current || revealed) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";

    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const lastPoint = lastPointRef.current;

    if (!lastPoint) {
      ctx.beginPath();
      ctx.arc(x, y, 21, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();

      ctx.moveTo(
        lastPoint.x,
        lastPoint.y
      );

      ctx.lineTo(x, y);
      ctx.stroke();
    }

    lastPointRef.current = { x, y };
  };

  // -------------------------------------------------------
  // START SCRATCHING
  // -------------------------------------------------------

  const startScratch = (event) => {
    if (revealed) return;

    event.preventDefault();

    isScratchingRef.current = true;
    lastPointRef.current = null;

    try {
      event.currentTarget.setPointerCapture(
        event.pointerId
      );
    } catch (error) {
      // Pointer capture may not be available on every device.
    }

    scratchAt(event);
  };

  // -------------------------------------------------------
  // CONTINUE SCRATCHING
  // -------------------------------------------------------

  const moveScratch = (event) => {
    if (!isScratchingRef.current || revealed) return;

    event.preventDefault();

    scratchAt(event);
  };

  // -------------------------------------------------------
  // CHECK SCRATCHED PERCENTAGE
  // -------------------------------------------------------

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;

    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const pixels = imageData.data;

      let transparentPixels = 0;
      let totalPixels = 0;

      // Sample every eighth pixel
      for (let i = 3; i < pixels.length; i += 32) {
        totalPixels++;

        if (pixels[i] < 40) {
          transparentPixels++;
        }
      }

      const scratchedPercentage =
        totalPixels > 0
          ? (transparentPixels / totalPixels) * 100
          : 0;

      if (scratchedPercentage >= 15) {
        setRevealed(true);
      }
    } catch (error) {
      console.error(
        "[Scratch Card] Progress check failed:",
        error
      );
    }
  };

  // -------------------------------------------------------
  // STOP SCRATCHING
  // -------------------------------------------------------

  const stopScratch = () => {
    if (!isScratchingRef.current) return;

    isScratchingRef.current = false;
    lastPointRef.current = null;

    checkScratchProgress();
  };

  // -------------------------------------------------------
  // MANUAL REVEAL
  // -------------------------------------------------------

  const revealManually = () => {
    isScratchingRef.current = false;
    lastPointRef.current = null;

    setRevealed(true);
  };

  return (
    <div className="invitation-scratch-wrapper">

      <div
        className={`invitation-scratch-card ${
          revealed ? "is-revealed" : ""
        }`}
      >
        {/* DATE UNDER THE GOLD COATING */}

        <div className="invitation-scratch-reveal">
          <span>THURSDAY</span>

          <strong>10</strong>

          <span>DECEMBER 2026</span>

          <small>NAGPUR, MAHARASHTRA</small>
        </div>

        {/* REAL SCRATCH CANVAS */}

        {!revealed && (
          <canvas
            ref={canvasRef}
            className="invitation-scratch-canvas"
            onPointerDown={startScratch}
            onPointerMove={moveScratch}
            onPointerUp={stopScratch}
            onPointerCancel={stopScratch}
            onLostPointerCapture={stopScratch}
            aria-label="Scratch to reveal the wedding date"
          />
        )}
      </div>

      {/* FALLBACK BUTTON */}

      {!revealed && (
        <button
          className="invitation-scratch-tap"
          type="button"
          onClick={revealManually}
        >
          Tap here to reveal instead
        </button>
      )}

    </div>
  );
}

// =========================================================
// MAIN INVITATION DETAILS SECTION
// =========================================================

export default function InvitationDetailsSection() {
  const sectionRef = useRef(null);

  const [countdown, setCountdown] = useState(getCountdown);

  // -------------------------------------------------------
  // EARLY SCROLL REVEAL
  // -------------------------------------------------------

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 100%", "start 35%"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45],
    ["35px", "12px", "0px"]
  );

  const contentY = useSpring(rawY, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  // -------------------------------------------------------
  // LIVE COUNTDOWN
  // -------------------------------------------------------

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="invitation-details-section"
      id="invitation-details"
    >
      <div className="invitation-details-canvas">

        <div
          className="invitation-details-clouds"
          aria-hidden="true"
        />

        <motion.div
          className="invitation-details-content"
          style={{
            opacity: 1,
            y: contentY,
          }}
        >

          {/* OM SYMBOL */}

          <motion.div
            className="invitation-details-om"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            ॐ
          </motion.div>

          {/* FAMILY INVITATION */}

          <motion.div
            className="invitation-details-intro"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <span className="invitation-details-eyebrow">
              THE FAMILIES OF DIVYA & SHREYASH
            </span>

            <p>
              Request the honour of your presence
              <br />
              at the wedding of their children,
              <br />
              and your blessings as they begin
              <br />
              their beautiful journey together.
            </p>
          </motion.div>

          {/* DIVIDER */}

          <motion.div
            className="invitation-details-divider"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={revealViewport}
            transition={{ duration: 0.8 }}
          >
            <span />
            <b>❧</b>
            <span />
          </motion.div>

          {/* GROOM */}
           <motion.div
            className="invitation-details-person bride-details"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <span className="invitation-person-label">
              THE BRIDE
            </span>

            <h2>Divya</h2>

            <div className="invitation-parent-details">
              <span>Daughter of</span>

              <p>{BRIDE_PARENTS}</p>
            </div>
          </motion.div>


          <motion.div
            className="invitation-details-with"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            with
          </motion.div>
          <motion.div
            className="invitation-details-person groom-details"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <span className="invitation-person-label">
              THE GROOM
            </span>

            <h2>Shreyash</h2>

            <div className="invitation-parent-details">
              <span>Son of</span>

              <p>{GROOM_PARENTS}</p>
            </div>
          </motion.div>

          {/* WITH */}


          {/* BRIDE */}

         
          {/* LOCATION */}

          <motion.p
            className="invitation-details-location"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            {WEDDING_LOCATION}
          </motion.p>

          {/* DIVIDER */}

          <div className="invitation-details-divider invitation-details-divider-bottom">
            <span />
            <b>❧</b>
            <span />
          </div>

          {/* SAVE THE DATE */}

          <motion.div
            className="invitation-details-save"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <span className="invitation-details-eyebrow">
              A LITTLE SURPRISE
            </span>

            <h3>Save the date</h3>

            <div className="invitation-details-divider">
              <span />
              <b>❧</b>
              <span />
            </div>

            <ScratchDateCard />
          </motion.div>

          {/* COUNTDOWN */}

          <motion.div
            className="invitation-details-countdown"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <span className="invitation-details-eyebrow">
              {countdown.completed
                ? "A DAY TO REMEMBER"
                : "COUNTING DOWN"}
            </span>

            <h3>
              {countdown.completed
                ? "Our forever begins"
                : "Until we say “I do”"}
            </h3>

            {!countdown.completed && (
              <div className="invitation-countdown-grid">

                <div className="countdown-box">
                  <strong>{countdown.days}</strong>
                  <span>Days</span>
                </div>

                <div className="countdown-box">
                  <strong>{countdown.hours}</strong>
                  <span>Hours</span>
                </div>

                <div className="countdown-box">
                  <strong>{countdown.minutes}</strong>
                  <span>Minutes</span>
                </div>

                <div className="countdown-box">
                  <strong>{countdown.seconds}</strong>
                  <span>Seconds</span>
                </div>

              </div>
            )}

            <div className="invitation-details-divider countdown-divider">
              <span />
              <b>❧</b>
              <span />
            </div>

            <p className="invitation-countdown-event-date">
              {WEDDING_DATE_LABEL}
            </p>

            <p className="invitation-countdown-event-location">
              {WEDDING_LOCATION}
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
