import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const callback = function (url: string) {
  if (typeof url != "undefined") {
    window.location.href = url;
  }
};

export function downloadStable(
  event: null | React.MouseEvent<HTMLElement, MouseEvent>,
  url: string
) {
  event?.preventDefault();

  // send stable download event to Google Ads
  gtag("event", "conversion", {
    send_to: "AW-17222662466/zd4PCKjnmeIaEMLys5RA",
  });

  setTimeout(() => {
    callback(url);
  }, 100);
}
