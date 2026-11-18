
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import "./WeddingCelebrationsSection.css";

const DIRECTIONS_URL =
  "https://maps.google.com/?cid=513679445843113555&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF";

const VENUE = "Fun Planet Resort, Nagpur";

// =========================================================
// CELEBRATION EVENTS
// =========================================================

const celebrations = [
  {
    id: "haldi",
    number: "01",
    title: "Haldi",
    subtitle: "A morning of turmeric, marigolds & laughter",
    description:
      "Join us for a joyful celebration filled with sunshine, blessings and beautiful traditions.",
    weekday: "WEDNESDAY",
    date: "09",
    month: "DECEMBER 2026",
    time: "12:00 PM",
  },
  {
    id: "mehndi",
    number: "02",
    title: "Mehndi",
    subtitle: "An evening of colours & traditions",
    description:
      "Let's celebrate with music, mehndi, laughter and unforgettable memories.",
    weekday: "WEDNESDAY",
    date: "09",
    month: "DECEMBER 2026",
    time: "7:00 PM",
  },
  {
    id: "wedding",
    number: "03",
    title: "Wedding",
    subtitle: "The beginning of forever",
    description:
      "Join us as we celebrate the beautiful union of Shreyash & Divya.",
    weekday: "THURSDAY",
    date: "10",
    month: "DECEMBER 2026",
    time: "4:00 PM onwards",
  },
  {
    id: "reception",
    number: "04",
    title: "Dinner & Reception",
    subtitle: "An evening of love & celebration",
    description:
      "Celebrate this special new beginning with the couple and their families over dinner.",
    weekday: "THURSDAY",
    date: "10",
    month: "DECEMBER 2026",
    time: "8:00 PM onwards",
  },
];

// =========================================================
// EVENT CARD WITH SCROLL ZOOM REVEAL
// =========================================================

function CelebrationCard({ event, index }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "center 55%"],
  });

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.82, 0.94, 1]
  );

  const scale = useSpring(rawScale, {
    stiffness: 75,
    damping: 22,
    mass: 0.7,
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7],
    [0.2, 0.7, 1]
  );

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [65, 0]
  );

  const y = useSpring(rawY, {
    stiffness: 75,
    damping: 23,
  });

  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [5, 0]
  );

  return (
    <motion.article
      ref={cardRef}
      className={`celebration-card celebration-card-${event.id}`}
      style={{
        opacity,
        scale,
        y,
        rotateX,
        transformPerspective: 1000,
        transformOrigin: "center center",
      }}
      transition={{
        delay: index * 0.04,
      }}
    >
      <div className="celebration-card-frame">

        {/* Floral Shiva invitation artwork */}
        <img
          className="celebration-card-artwork"
          src="/assets/shiv-card.webp"
          alt=""
          aria-hidden="true"
          draggable="false"
        />

        {/* Event content */}
        <div className="celebration-card-content">

          <span className="celebration-number">
            {event.number}
          </span>

          <span className="celebration-kicker">
            YOU ARE INVITED TO THE
          </span>

          <h3>{event.title}</h3>

          <p className="celebration-subtitle">
            {event.subtitle}
          </p>

          <div className="celebration-text-divider">
            <span />
            <b>❧</b>
            <span />
          </div>

          <p className="celebration-event-description">
            {event.description}
          </p>

          {/* DATE */}
          <div className="celebration-date-block">
            <span className="celebration-event-label">
              {event.weekday}
            </span>

            <strong className="celebration-date-number">
              {event.date}
            </strong>

            <span className="celebration-date-month">
              {event.month}
            </span>
          </div>

          {/* TIME */}
          <div className="celebration-event-details">
            <span className="celebration-event-label">
              TIME
            </span>

            <strong>{event.time}</strong>
          </div>

          {/* VENUE */}
          <div className="celebration-event-details">
            <span className="celebration-event-label">
              VENUE
            </span>

            <strong>{VENUE}</strong>
          </div>

          {/* DIRECTIONS */}
          <a
            className="celebration-directions"
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get directions to ${VENUE} for ${event.title}`}
          >
            <span aria-hidden="true">⌖</span>
            Get Directions
          </a>

          <div className="celebration-card-names">
            SHREYASH <i>&</i> DIVYA
          </div>

        </div>
      </div>
    </motion.article>
  );
}

// =========================================================
// MAIN CELEBRATIONS SECTION
// =========================================================

export default function WeddingCelebrationsSection() {
  const headingRef = useRef(null);
  const closingRef = useRef(null);

  return (
    <section
      className="wedding-celebrations-section"
      id="celebrations"
    >
      <div className="celebrations-content">

        {/* SECTION HEADING */}

        <motion.div
          ref={headingRef}
          className="celebrations-heading"
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.94,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="celebrations-eyebrow">
            OUR SPECIAL MOMENTS
          </span>

          <span className="celebrations-heading-flower">
            ❀
          </span>

          <h2>The Celebrations</h2>

          <p>
            Four beautiful moments,
            <br />
            one unforgettable celebration.
          </p>

          <div className="celebrations-heading-divider">
            <span />
            <b>❧</b>
            <span />
          </div>
        </motion.div>

        {/* EVENT CARDS */}

        <div className="celebrations-list">
          {celebrations.map((event, index) => (
            <CelebrationCard
              key={event.id}
              event={event}
              index={index}
            />
          ))}
        </div>

        {/* CLOSING MESSAGE */}

        <motion.div
          ref={closingRef}
          className="celebrations-closing"
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.94,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span>
            YOUR PRESENCE IS OUR PRESENT
          </span>

          <p>
            With love,
            <strong>Shreyash & Divya</strong>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
