export const productImageLayoutId = (productId: string, variantId?: string) =>
  `product-image-${productId}${variantId ? `-${variantId}` : ""}`;

export const cartDrawerLayoutId = "cart-drawer";
export const searchOverlayLayoutId = "search-overlay";
export const mobileMenuLayoutId = "mobile-menu";





