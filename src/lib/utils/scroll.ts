import type Lenis from "lenis";

interface ScrollOptions {
  smooth?: boolean;
  offset?: number;
}

export function scrollWindowToTop(lenis: Lenis | null, options: ScrollOptions = {}) {
  const { smooth = false } = options;

  if (lenis) {
    lenis.scrollTo(0, { immediate: !smooth });
    return;
  }

  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" });
}

export function scrollToElement(
  target: HTMLElement,
  lenis: Lenis | null,
  options: ScrollOptions = {}
) {
  const { smooth = false, offset = 0 } = options;

  if (lenis) {
    lenis.scrollTo(target, { offset, immediate: !smooth });
    return;
  }

  target.scrollIntoView({
    behavior: smooth ? "smooth" : "instant",
    block: "start",
  });
}

export function scrollAdminMainToTop() {
  const adminMain = document.querySelector("[data-admin-main]");
  if (adminMain instanceof HTMLElement) {
    adminMain.scrollTo({ top: 0, behavior: "instant" });
  }
}
