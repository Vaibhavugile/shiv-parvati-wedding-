
import React from "react";
import { motion } from "framer-motion";
import "./FinalBlessingSection.css";

const BLESSING_IMAGE = "/assets/e.jpeg";

export default function FinalBlessingSection() {
  return (
    <section
      className="final-blessing-section"
      id="final-blessing"
    >
      <div className="final-blessing-content">

        <motion.div
          className="final-blessing-artwork-wrap"
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <img
            className="final-blessing-artwork"
            src={BLESSING_IMAGE}
            alt="Symbolic wedding blessing of Lord Shiva and Goddess Parvati"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="final-blessing-divider"
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span />
          <b>♧</b>
          <span />
        </motion.div>

        <motion.p
          className="final-blessing-message"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          Har Har Mahadev.
          <br />
          Your blessings will make our day complete.
        </motion.p>

        <motion.h2
          className="final-blessing-names"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3 }}
        >
          Divya <span>&</span> Shreyash
        </motion.h2>

        <motion.p
          className="final-blessing-hashtag"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          #SHREYASHWEDDING
        </motion.p>

        <motion.div
          className="final-blessing-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span className="final-blessing-footer-flower">
            ❀
          </span>

          <span>
            MADE WITH LOVE
          </span>

          <span className="final-blessing-footer-flower">
            ❀
          </span>
        </motion.div>

      </div>
    </section>
  );
}
