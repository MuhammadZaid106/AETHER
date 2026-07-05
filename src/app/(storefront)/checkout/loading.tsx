import { LoadingState } from "@/components/ui/LoadingState";

export default function CheckoutLoading() {
  return (
    <LoadingState
      variant="fullscreen"
      theme="dark"
      text="SECURE CHECKOUT"
    />
  );
}
