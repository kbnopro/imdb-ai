import { useEffect, useState } from "react";

export const useScrollPosition = (ref: HTMLElement | null) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    if (ref) {
      const position = ref.scrollTop;
      setScrollPosition(position);
    }
  };

  useEffect(() => {
    if (ref) {
      ref.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        ref.removeEventListener("scroll", handleScroll);
      };
    }
  });
  return scrollPosition;
};
