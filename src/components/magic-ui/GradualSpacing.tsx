import styles from "./GradualSpacing.module.scss";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@site/src/lib/utils";
import { memo, useMemo } from "react";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export const GradualSpacing = memo(
  ({
    text,
    duration = 0.5,
    delayMultiple = 0.04,
    framerProps = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    className,
  }: GradualSpacingProps) => {
    let charIndex = 0;
    const words = useMemo(() => text.split(" "), [text]);

    return (
      <h1 className={`${styles.container} flex flex-wrap justify-center`}>
        <AnimatePresence>
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="flex">
              {word.split("").map(char => (
                <motion.span
                  key={charIndex}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={framerProps}
                  transition={{ duration, delay: charIndex++ * delayMultiple }}
                  className={cn("drop-shadow-sm ", className)}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                key={`space-${wordIndex}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={framerProps}
                transition={{ duration, delay: charIndex++ * delayMultiple }}
                className={cn(`drop-shadow-sm ${styles.space}`, className)}
              >
                &nbsp;
              </motion.span>
            </span>
          ))}
        </AnimatePresence>
      </h1>
    );
  }
);
