import styles from "./terminal.module.scss";

import type { HTMLMotionProps, MotionProps } from "motion/react";
import type { ComponentType, ReactNode, RefAttributes } from "react";

/* Terminal + typing sequence adapted from Magic UI (MIT) — https://magicui.design/docs/components/terminal */

import { cn } from "@site/src/lib/utils";
import { motion, useInView } from "motion/react";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface SequenceContextValue {
  completeItem: (index: number) => void;
  activeIndex: number;
  sequenceStarted: boolean;
}

const SequenceContext = createContext<SequenceContextValue | null>(null);

const useSequence = () => useContext(SequenceContext);

const ItemIndexContext = createContext<number | null>(null);
const useItemIndex = () => useContext(ItemIndexContext);

const StaticModeContext = createContext(false);
const useStaticMode = () => useContext(StaticModeContext);

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = keyof typeof motionElements;
type TerminalTypingMotionComponent = ComponentType<
  Omit<HTMLMotionProps<"span">, "ref"> & RefAttributes<HTMLElement>
>;

interface AnimatedSpanProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  startOnView?: boolean;
}

export function AnimatedSpan({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}: AnimatedSpanProps) {
  const staticMode = useStaticMode();
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    if (!sequence || itemIndex === null) {
      return;
    }
    if (!sequence.sequenceStarted) {
      return;
    }
    if (hasStarted) {
      return;
    }
    if (sequence.activeIndex === itemIndex) {
      setHasStarted(true);
    }
  }, [sequence, hasStarted, itemIndex]);

  const shouldAnimate = staticMode
    ? true
    : sequence
      ? hasStarted
      : startOnView
        ? isInView
        : true;

  return (
    <motion.div
      ref={elementRef}
      initial={staticMode ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      animate={
        staticMode
          ? { opacity: 1, y: 0 }
          : shouldAnimate
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -5 }
      }
      transition={{
        duration: staticMode ? 0 : 0.3,
        delay: sequence ? 0 : delay / 1000,
      }}
      className={cn(className)}
      onAnimationComplete={() => {
        if (staticMode) {
          return;
        }
        if (!sequence) {
          return;
        }
        if (itemIndex === null) {
          return;
        }
        sequence.completeItem(itemIndex);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface TypingAnimationProps extends Omit<MotionProps, "children"> {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: MotionElementType;
  startOnView?: boolean;
}

export function TypingAnimation({
  children,
  className,
  duration = 48,
  delay = 0,
  as: Component = "span",
  startOnView = true,
  ...props
}: TypingAnimationProps) {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string.");
  }

  const staticMode = useStaticMode();

  const MotionComponent = motionElements[
    Component
  ] as TerminalTypingMotionComponent;

  const [displayedText, setDisplayedText] = useState<string>(() =>
    staticMode ? children : ""
  );
  const [started, setStarted] = useState(staticMode);
  const elementRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  });

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const hasSequence = sequence !== null;
  const sequenceStarted = sequence?.sequenceStarted ?? false;
  const sequenceActiveIndex = sequence?.activeIndex ?? null;
  const sequenceCompleteItemRef = useRef<
    SequenceContextValue["completeItem"] | null
  >(null);
  const sequenceItemIndexRef = useRef<number | null>(null);

  useEffect(() => {
    sequenceCompleteItemRef.current = sequence?.completeItem ?? null;
    sequenceItemIndexRef.current = itemIndex;
  }, [sequence?.completeItem, itemIndex]);

  useEffect(() => {
    if (staticMode) {
      setDisplayedText(children);
      setStarted(true);
      return;
    }

    let startTimeout: ReturnType<typeof setTimeout> | null = null;

    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && !started && sequenceActiveIndex === itemIndex) {
        setStarted(true);
      }
    } else if (!startOnView || isInView) {
      startTimeout = setTimeout(() => setStarted(true), delay);
    }

    return () => {
      if (startTimeout !== null) {
        clearTimeout(startTimeout);
      }
    };
  }, [
    staticMode,
    children,
    delay,
    startOnView,
    isInView,
    started,
    hasSequence,
    sequenceActiveIndex,
    sequenceStarted,
    itemIndex,
  ]);

  useEffect(() => {
    if (staticMode) {
      return;
    }

    let typingEffect: ReturnType<typeof setInterval> | null = null;

    if (started) {
      let i = 0;
      typingEffect = setInterval(() => {
        if (i < children.length) {
          setDisplayedText(children.substring(0, i + 1));
          i++;
        } else {
          if (typingEffect !== null) {
            clearInterval(typingEffect);
          }
          const completeItem = sequenceCompleteItemRef.current;
          const currentItemIndex = sequenceItemIndexRef.current;
          if (completeItem && currentItemIndex !== null) {
            completeItem(currentItemIndex);
          }
        }
      }, duration);
    }

    return () => {
      if (typingEffect !== null) {
        clearInterval(typingEffect);
      }
    };
  }, [children, duration, started, staticMode]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(styles.typing, className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}

interface TerminalProps {
  children: ReactNode;
  className?: string;
  sequence?: boolean;
  startOnView?: boolean;
  /** When true, show all lines immediately (accessibility / SSR-safe). */
  staticMode?: boolean;
}

export function Terminal({
  children,
  className,
  sequence = true,
  startOnView = true,
  staticMode = false,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    amount: 0.25,
    once: true,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceHasStarted = staticMode
    ? true
    : sequence
      ? !startOnView || isInView
      : false;

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence || staticMode) {
      return null;
    }
    return {
      completeItem: (index: number) => {
        setActiveIndex(current => (index === current ? current + 1 : current));
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    };
  }, [sequence, activeIndex, sequenceHasStarted, staticMode]);

  const wrappedChildren = useMemo(() => {
    if (!sequence || staticMode) {
      return children;
    }
    const array = Children.toArray(children);
    return array.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child as ReactNode}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequence, staticMode]);

  const content = (
    <StaticModeContext.Provider value={staticMode}>
      <div ref={containerRef} className={cn(styles.shell, className)}>
        <div className={styles.chrome}>
          <div className={styles.dots} aria-hidden="true">
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>
        <pre className={styles.body}>
          <code className={styles.code}>{wrappedChildren}</code>
        </pre>
      </div>
    </StaticModeContext.Provider>
  );

  if (!sequence || staticMode) {
    return content;
  }

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  );
}
