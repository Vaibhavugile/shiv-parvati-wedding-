
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import "./HeroSection.css";

const HERO_IMAGE = "/assets/shiv-kailash.webp";

export default function HeroSection({
  imageSrc = HERO_IMAGE,
  imageAlt = "Lord Shiva and Goddess Parvati on Mount Kailash",
}) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Cinematic zoom animation
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    [1, 1.12, 1.42, 1.85, 2.15]
  );

  const imageScale = useSpring(rawScale, {
    stiffness: 35,
    damping: 24,
    mass: 0.8,
  });

  // Gradually focus towards Shiva and Parvati
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "-3%", "-9%"]
  );

  const imageY = useSpring(rawY, {
    stiffness: 35,
    damping: 25,
  });

  // Artwork fades towards the end
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.48, 0.7, 0.92, 1],
    [1, 1, 0.82, 0.18, 0]
  );

  // Invitation text fades first
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.58],
    [1, 0.9, 0.4, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 0.55],
    ["0px", "-45px"]
  );

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [0.02, 0.08, 0.3]
  );

  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35],
    [1, 0.6, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="wedding-hero-section"
      id="home"
    >
      <div className="wedding-hero-sticky">
        <div className="wedding-hero-frame">

          {/* Original complete Shiva Kailash artwork */}
          <motion.img
            className="wedding-hero-image"
            src={imageSrc}
            alt={imageAlt}
            draggable="false"
            fetchPriority="high"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.4,
              ease: "easeOut",
            }}
            style={{
              scale: imageScale,
              y: imageY,
              opacity: imageOpacity,
              transformOrigin: "50% 65%",
            }}
          />

          {/* Cinematic overlay */}
          <motion.div
            className="wedding-hero-overlay"
            style={{ opacity: overlayOpacity }}
          />

          {/* Invitation text */}
          <motion.div
            className="wedding-hero-invitation"
            style={{
              opacity: textOpacity,
              y: textY,
            }}
          >
            <motion.div
              className="wedding-hero-mantra"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 1.2,
              }}
            >
              ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </motion.div>

            <motion.p
              className="wedding-hero-blessing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.9,
                duration: 1,
              }}
            >
              With the divine grace of Lord Shiva & Goddess Parvati
            </motion.p>

            <motion.p
              className="wedding-hero-intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.3,
                duration: 1,
              }}
            >
              WE CORDIALLY INVITE
              <br />
              YOU FOR OUR WEDDING
            </motion.p>

            <motion.h1
              className="wedding-hero-names"
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 1.7,
                duration: 1.3,
                ease: "easeOut",
              }}
            >
              Divya <span>&</span> Shreyash
            </motion.h1>

            <motion.div
              className="wedding-hero-date"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2.2,
                duration: 1,
              }}
            >
              
            </motion.div>

            <motion.div
              className="wedding-hero-location"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.5,
                duration: 1,
              }}
            >
              
            </motion.div>
          </motion.div>

          {/* Vignette */}
          <div className="wedding-hero-vignette" />

          {/* Scroll indicator */}
         {/* Scroll indicator */}
<motion.div
  className="wedding-hero-scroll"
  style={{
    opacity: scrollOpacity,
    x: "-50%",
  }}
  initial={{ y: 15 }}
  animate={{ y: 0 }}
  transition={{
    delay: 3.2,
    duration: 1,
  }}
>
  <span>Scroll to see more</span>

  <span className="wedding-hero-scroll-arrow">
    
  </span>
</motion.div>

        </div>
      </div>
    </section>
  );
}
