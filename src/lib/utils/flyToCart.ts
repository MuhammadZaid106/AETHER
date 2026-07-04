import gsap from "gsap";

/**
 * Animates a "flying product image" from a source element to the cart icon.
 * Creates a cloned image that flies across the screen and shrinks into the cart.
 */
export function flyToCart(
  sourceEl: HTMLElement,
  cartIconEl: HTMLElement,
  imageSrc: string,
  onComplete?: () => void
) {
  const sourceRect = sourceEl.getBoundingClientRect();
  const cartRect = cartIconEl.getBoundingClientRect();

  // Create clone
  const clone = document.createElement("img");
  clone.src = imageSrc;
  clone.style.cssText = `
    position: fixed;
    top: ${sourceRect.top}px;
    left: ${sourceRect.left}px;
    width: ${sourceRect.width}px;
    height: ${sourceRect.height}px;
    object-fit: cover;
    border-radius: 12px;
    z-index: 9999;
    pointer-events: none;
    will-change: transform, opacity;
  `;
  document.body.appendChild(clone);

  const targetX = cartRect.left + cartRect.width / 2 - sourceRect.left - sourceRect.width / 2;
  const targetY = cartRect.top + cartRect.height / 2 - sourceRect.top - sourceRect.height / 2;

  gsap.to(clone, {
    x: targetX,
    y: targetY,
    scale: 0.15,
    opacity: 0,
    duration: 0.7,
    ease: "power2.in",
    onComplete: () => {
      clone.remove();
      onComplete?.();
    },
  });
}
