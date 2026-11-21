
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import "./BeforeTheBigDaySection.css";

const moments = [
  {
    image: "/assets/im3.jpeg",
    alt: "A beautiful moment together",
    caption: "A moment to remember",
  },

  {
    image: "/assets/im8.jpeg",
    alt: "A cherished memory",
    caption: "Our beautiful beginning",
  },
     {
    image: "/assets/im7.jpeg",
    alt: "A beautiful memory",
    caption: "Our favourite memories",
  },
  {
    image: "/assets/im4.jpeg",
    alt: "A beautiful memory",
    caption: "The story of us",
  },
  {
    image: "/assets/im5.jpeg",
    alt: "A beautiful memory",
    caption: "Love in every frame",
  },
  {
    image: "/assets/im6.jpeg",
    alt: "A beautiful memory",
    caption: "Pure happiness",
  },
 
];

export default function BeforeTheBigDaySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideStep, setSlideStep] = useState(372);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartRef = useRef(null);

  /* =========================================
     SCROLL ZOOM AND REVEAL
  ========================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 95%", "start 35%"],
  });

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.65, 1],
    [0.35, 0.75, 0.96, 1]
  );

  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.90, 1]
  );

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [55, 0]
  );

  const contentOpacity = useSpring(rawOpacity, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
  });

  const contentScale = useSpring(rawScale, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
  });

  const contentY = useSpring(rawY, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
  });

  /* =========================================
     RESPONSIVE CAROUSEL MEASUREMENT
  ========================================= */

  useEffect(() => {
    const updateSlideStep = () => {
      const track = trackRef.current;

      if (!track || !track.children.length) return;

      const firstCard = track.children[0];
      const cardWidth = firstCard.getBoundingClientRect().width;

      const styles = window.getComputedStyle(track);
      const gap =
        parseFloat(styles.columnGap || styles.gap) || 0;

      setSlideStep(cardWidth + gap);
    };

    updateSlideStep();

    window.addEventListener("resize", updateSlideStep);

    let observer;

    if (
      trackRef.current &&
      typeof ResizeObserver !== "undefined"
    ) {
      observer = new ResizeObserver(updateSlideStep);
      observer.observe(trackRef.current);

      if (trackRef.current.children[0]) {
        observer.observe(trackRef.current.children[0]);
      }
    }

    return () => {
      window.removeEventListener("resize", updateSlideStep);
      observer?.disconnect();
    };
  }, []);

  /* =========================================
     SLIDE NAVIGATION
  ========================================= */

  const goToSlide = (index) => {
    const nextIndex = Math.max(
      0,
      Math.min(index, moments.length - 1)
    );

    setActiveIndex(nextIndex);
  };

  const previousSlide = () => {
    goToSlide(activeIndex - 1);
  };

  const nextSlide = () => {
    goToSlide(activeIndex + 1);
  };

  /* =========================================
     MOBILE TOUCH SWIPE
  ========================================= */

  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current) return;

    const touch = event.changedTouches[0];

    const deltaX =
      touch.clientX - touchStartRef.current.x;

    const deltaY =
      touch.clientY - touchStartRef.current.y;

    touchStartRef.current = null;

    // Ignore small movements and vertical page scrolling.
    if (Math.abs(deltaX) < 45) return;
    if (Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };

  /* =========================================
     KEYBOARD NAVIGATION
  ========================================= */

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    }

    if (event.key === "ArrowLeft") {
      previousSlide();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="before-big-day-section"
      id="our-moments"
    >
      <motion.div
        className="before-big-day-content"
        style={{
          opacity: contentOpacity,
          scale: contentScale,
          y: contentY,
        }}
      >
        {/* =====================================
            SECTION HEADING
        ===================================== */}

        <motion.header
          className="before-big-day-heading"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="before-big-day-eyebrow">
            OUR MOMENTS
          </span>

          <h2>Before the big day</h2>

          <div className="before-big-day-divider">
            <span />
            <b>♧</b>
            <span />
          </div>

          <p className="before-big-day-subtitle">
            Every little moment brought us closer to forever.
          </p>
        </motion.header>

        {/* =====================================
            HORIZONTAL PHOTO CAROUSEL
        ===================================== */}

        <motion.div
          className="moments-carousel"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="moments-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Our memories photo carousel"
          >
            <div
              ref={trackRef}
              className="moments-track"
              style={{
                transform: `translate3d(-${
                  activeIndex * slideStep
                }px, 0, 0)`,
              }}
            >
              {moments.map((moment, index) => {
                const active = activeIndex === index;
                const rotation = index % 2 === 0 ? -3 : 3;

                return (
                  <motion.article
                    key={moment.image}
                    className={`moment-polaroid ${
                      index % 2 === 0
                        ? "moment-polaroid-left"
                        : "moment-polaroid-right"
                    } ${active ? "is-active" : ""}`}
                    initial={{
                      opacity: 0,
                      y: 35,
                      scale: 0.94,
                      rotate: rotation,
                    }}
                    whileInView={{
                      opacity: active ? 1 : 0.78,
                      y: 0,
                      scale: active ? 1 : 0.96,
                      rotate: active ? -1.5 : rotation,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.08,
                    }}
                    animate={{
                      rotate: active ? -1.5 : rotation,
                      scale: active ? 1 : 0.96,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => goToSlide(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Show ${moment.caption}`}
                    aria-pressed={active}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();
                        goToSlide(index);
                      }
                    }}
                  >
                    <div className="moment-photo">
                      <img
                        src={moment.image}
                        alt={moment.alt}
                        loading="lazy"
                        draggable="false"
                      />
                    </div>

                    <p>{moment.caption}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* =====================================
              SLIDE INDICATORS
          ===================================== */}

          <div className="moments-indicators">
            {moments.map((moment, index) => (
              <button
                key={moment.image}
                type="button"
                className={`moments-indicator ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-current={
                  activeIndex === index ? "true" : undefined
                }
              />
            ))}
          </div>

          {/* =====================================
              PREVIOUS / NEXT
          ===================================== */}

          <div className="moments-navigation">
            <button
              type="button"
              onClick={previousSlide}
              disabled={activeIndex === 0}
              aria-label="Previous photo"
            >
              ‹
            </button>

            <span>
              {String(activeIndex + 1).padStart(2, "0")}
              {" / "}
              {String(moments.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={nextSlide}
              disabled={activeIndex === moments.length - 1}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
