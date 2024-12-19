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
      <div className={`${styles.container} flex flex-wrap `}>
        <AnimatePresence>
          {words.map((word, wordIndex) => (
            <div key={wordIndex} className="flex">
              {word.split("").map(char => (
                <motion.h1
                  key={charIndex}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={framerProps}
                  transition={{ duration, delay: charIndex++ * delayMultiple }}
                  className={cn("drop-shadow-sm ", className)}
                >
                  {char}
                </motion.h1>
              ))}
              <motion.h1
                key={`space-${wordIndex}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={framerProps}
                transition={{ duration, delay: charIndex++ * delayMultiple }}
                className={cn("drop-shadow-sm ", className)}
              >
                &nbsp;
              </motion.h1>
            </div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);
