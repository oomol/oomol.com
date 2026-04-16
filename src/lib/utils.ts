import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { trackDownloadConversion } from "./analytics";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const callback = function (url: string) {
  if (url) {
    window.location.href = url;
  }
};

export function downloadStable(
  event: null | React.MouseEvent<HTMLElement, MouseEvent>,
  url: string
) {
  event?.preventDefault();

  // send stable download event to Google Ads
  trackDownloadConversion();

  setTimeout(() => {
    callback(url);
  }, 100);
}
