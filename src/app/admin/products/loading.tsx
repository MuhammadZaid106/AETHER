import { LoadingState } from "@/components/ui/LoadingState";

export default function AdminProductsLoading() {
  return (
    <LoadingState
      variant="fullscreen"
      theme="light"
      text="ADMIN PRODUCTS"
    />
  );
}
