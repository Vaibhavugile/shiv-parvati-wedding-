
import React from "react";
import "./PetalFall.css";

const petals = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${-((i * 3.7) % 20)}s`,
  duration: `${17 + ((i * 7) % 10)}s`,
  size: `${10 + ((i * 3) % 5)}px`,
  drift: `${-35 + ((i * 19) % 70)}px`,
  rotation: `${i * 41}deg`,
  opacity: 0.4 + ((i * 7) % 25) / 100,
}));

export default function PetalFall() {
  return (
    <div className="petal-fall" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="falling-petal"
          style={{
            left: petal.left,
            "--delay": petal.delay,
            "--duration": petal.duration,
            "--size": petal.size,
            "--drift": petal.drift,
            "--rotation": petal.rotation,
            "--opacity": petal.opacity,
          }}
        >
          <svg
            viewBox="0 0 100 110"
            className="petal-shape"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id={`petal-gradient-${petal.id}`}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#fff4f5" />
                <stop offset="45%" stopColor="#f5b5c5" />
                <stop offset="100%" stopColor="#d96d8c" />
              </linearGradient>
            </defs>

            <path
              d="
                M50 12
                C43 5 36 3 29 7
                C10 18 7 43 15 65
                C22 85 40 101 50 106
                C60 101 78 85 85 65
                C93 43 90 18 71 7
                C64 3 57 5 50 12
                Z
              "
              fill={`url(#petal-gradient-${petal.id})`}
            />

            <path
              d="M50 18 C47 43 48 72 50 99"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.3"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
