import { LoadingState } from "@/components/ui/LoadingState";

export default function AdminOrdersLoading() {
  return (
    <LoadingState
      variant="fullscreen"
      theme="light"
      text="ADMIN ORDERS"
    />
  );
}
