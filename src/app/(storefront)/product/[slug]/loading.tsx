import { LoadingState } from "@/components/ui/LoadingState";

export default function ProductLoading() {
  return (
    <LoadingState
      variant="fullscreen"
      theme="dark"
      text="PRODUCT DETAILS"
    />
  );
}
