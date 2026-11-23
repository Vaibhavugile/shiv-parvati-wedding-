
import React from "react";
import { motion } from "framer-motion";
import "./Opening.css";

const ASSETS = "/assets/";

export default function Opening({ onOpen }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen?.();
    }
  };

  return (
    <motion.section
      className="shiv-opening"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.025,
        filter: "blur(7px)",
      }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Open wedding invitation"
    >
      <div className="shiv-opening__canvas">

        <div className="shiv-opening__sky" />
        <div className="shiv-opening__glow" />

        {/* SHIVA JI'S HAND */}
        <motion.div
          className="shiv-opening__hand-layer"
          initial={{ x: "-115%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{
            delay: 0.15,
            duration: 5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src={`${ASSETS}shiv-hand.webp`}
            className="shiv-opening__hand"
            alt=""
            draggable="false"
          />
        </motion.div>

        {/* PARVATI JI'S FOOT */}
        <motion.div
          className="shiv-opening__foot-layer"
          initial={{ x: "110%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{
            delay: 0.15,
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src={`${ASSETS}shiv-parvati-step.webp`}
            className="shiv-opening__foot"
            alt=""
            draggable="false"
          />
        </motion.div>

        {/* BLESSING - EARLIER AND CLEARER */}
        <motion.div
          className="shiv-opening__blessing"
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 2.1,
            duration: 1,
            ease: "easeOut",
          }}
        >
          WRITTEN BY DESTINY,
          <br />
          BLESSED BY MAHADEV
        </motion.div>

        {/* NAMES - EARLIER */}
        <motion.div
          className="shiv-opening__names"
          initial={{ y: 25, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: 2.8,
            duration: 1.1,
            ease: "easeOut",
          }}
        >
          <span>Shreyash</span>
          <span className="shiv-opening__ampersand">&</span>
          <span>Divya</span>
        </motion.div>

        {/* FLOATING PETALS */}
        <motion.div
          className="shiv-opening__petals"
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✧　·　✦　·　✧
        </motion.div>

        {/* TAP PROMPT */}
        <motion.div
          className="opening-action-prompt"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 3.8,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <span className="opening-action-icon">☝️</span>
          <span className="opening-action-label">
            Tap anywhere to open
          </span>
          <span className="opening-action-sparkle">✦</span>
        </motion.div>

      </div>
    </motion.section>
  );
}
