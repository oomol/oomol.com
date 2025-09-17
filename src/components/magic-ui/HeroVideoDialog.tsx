import styles from "./HeroVideoDialog.module.scss";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Play, XIcon } from "lucide-react";
import { cn } from "@site/src/lib/utils";
import i18n from "@generated/i18n";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  /** YouTube video url */
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
  showPlayButtonOnHover?: boolean;
  zhCNVideoSrc?: string;
  zhCNThumbnailAlt?: string;
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
  showPlayButtonOnHover = false,
  zhCNVideoSrc,
  zhCNThumbnailAlt,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  // 管理页面滚动状态
  useEffect(() => {
    if (isVideoOpen) {
      // 禁用页面滚动
      document.body.style.overflow = "hidden";
    } else {
      // 恢复页面滚动
      document.body.style.overflow = "unset";
    }

    // 清理函数：组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen]);

  return (
    <div className={cn("relative", className)}>
      <div
        className="group relative cursor-pointer"
        onClick={() => setIsVideoOpen(true)}
      >
        <img
          src={thumbnailSrc}
          alt={thumbnailAlt}
          className="w-full md:max-w-full lg:max-w-7xl h-auto object-cover rounded-none border  group-hover:brightness-[0.8]"
        />
        <div
          className={cn(
            "absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl  group-hover:scale-100",
            showPlayButtonOnHover && "opacity-0 group-hover:opacity-100"
          )}
        >
          <div className="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
            <div
              className={`relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md   group-hover:scale-[1.2]`}
            >
              <Play
                className="size-8 scale-100 fill-white text-white transition-transform  group-hover:scale-105"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isVideoOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsVideoOpen(false)}
                exit={{ opacity: 0 }}
                className="pt-24 fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md "
              >
                <motion.div
                  {...selectedAnimation}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className={`relative mx-4 w-full md:mx-0 ${i18n.currentLocale === "en" ? "aspect-video max-w-6xl" : styles.videoContainer}`}
                  onClick={e => e.stopPropagation()}
                >
                  <div
                    className="absolute cursor-pointer -top-6 -right-16 size-10 flex items-center justify-center rounded-full bg-neutral-900/50 p-2 text-white ring-1 ring-white/10 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black dark:ring-black/10 border-none"
                    onClick={e => {
                      e.stopPropagation();
                      setIsVideoOpen(false);
                    }}
                  >
                    <XIcon className="size-5" />
                  </div>
                  <div className="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white">
                    {i18n.currentLocale === "zh-CN" ? (
                      <video
                        autoPlay
                        poster={zhCNThumbnailAlt || thumbnailSrc}
                        controls
                        className="size-full rounded-2xl"
                        onError={e => {
                          console.error(
                            "Video failed to load",
                            e,
                            zhCNVideoSrc
                          );
                        }}
                      >
                        <source src={zhCNVideoSrc} type="video/webm" />
                      </video>
                    ) : (
                      <iframe
                        src={videoSrc}
                        className="size-full rounded-2xl"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
