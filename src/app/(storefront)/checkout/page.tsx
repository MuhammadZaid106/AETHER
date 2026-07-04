"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutFormData } from "@/lib/validations/checkout.schema";
import { useCartStore } from "@/lib/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils/formatPrice";
import { ArrowLeft, ArrowRight, Check, CreditCard, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

export default function CheckoutPage() {
  const cartItems = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal)();
  const clearCart = useCartStore((state) => state.clear);

  const [step, setStep] = useState<"shipping" | "payment" | "review" | "success">("shipping");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      cardName: "",
      saveInfo: false,
    },
  });

  const cardNum = watch("cardNumber") || "";

  // Card brand detection regex
  const getCardBrand = (num: string) => {
    const cleanNum = num.replace(/\s/g, "");
    if (cleanNum.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(cleanNum)) return "Mastercard";
    if (/^3[47]/.test(cleanNum)) return "Amex";
    return null;
  };

  const cardBrand = getCardBrand(cardNum);

  const handleNextStep = async () => {
    if (step === "shipping") {
      const valid = await trigger([
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "zip",
        "country",
      ]);
      if (valid) setStep("payment");
      else toast.error("Complete all required shipping parameters");
    } else if (step === "payment") {
      const valid = await trigger(["cardNumber", "cardExpiry", "cardCvc", "cardName"]);
      if (valid) setStep("review");
      else toast.error("Check card payment parameters");
    }
  };

  const handleBackStep = () => {
    if (step === "payment") setStep("shipping");
    if (step === "review") setStep("payment");
  };

  const onSubmit = (data: CheckoutFormData) => {
    toast.success("Order processed coordinate established");
    setStep("success");
    clearCart();
  };

  const shippingCost = subtotal > 150 ? 0 : 15;
  const totalCost = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Stepper Bar Header */}
        {step !== "success" && (
          <div className="flex items-center justify-between mb-12 max-w-md mx-auto relative">
            <div className="absolute left-0 right-0 h-0.5 bg-[var(--border-hairline)] top-1/2 -translate-y-1/2 -z-10" />
            <div
              className="absolute left-0 h-0.5 bg-[var(--accent-lime)] top-1/2 -translate-y-1/2 -z-10 transition-all duration-500"
              style={{
                width: step === "shipping" ? "0%" : step === "payment" ? "50%" : "100%",
              }}
            />

            {[
              { id: "shipping", label: "Shipping" },
              { id: "payment", label: "Payment" },
              { id: "review", label: "Review" },
            ].map((s, idx) => {
              const isActive = step === s.id;
              const isPast =
                (step === "payment" && idx === 0) ||
                (step === "review" && (idx === 0 || idx === 1));

              return (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-colors ${
                      isActive
                        ? "bg-[var(--ink-900)] text-white border-[var(--ink-900)]"
                        : isPast
                        ? "bg-[var(--accent-lime)] text-[var(--ink-900)] border-[var(--accent-lime)]"
                        : "bg-white text-[var(--ink-600)] border-[var(--border-hairline)]"
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[var(--ink-600)]">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "shipping" && (
            <motion.div
              key="shipping"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] p-8 shadow-sm"
            >
              <h3 className="text-grotesk text-2xl font-black uppercase tracking-tight text-[var(--ink-900)] border-b border-[var(--border-hairline)] pb-4 mb-6">
                Shipping coordinate
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">First Name</label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.firstName ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.firstName && <span className="text-[10px] text-red-500 font-bold">{errors.firstName.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.lastName ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.lastName && <span className="text-[10px] text-red-500 font-bold">{errors.lastName.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Email coordinate</label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.email ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500 font-bold">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Phone Number</label>
                  <input
                    type="text"
                    {...register("phone")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.phone ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.phone && <span className="text-[10px] text-red-500 font-bold">{errors.phone.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Address</label>
                  <input
                    type="text"
                    {...register("address")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.address ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.address && <span className="text-[10px] text-red-500 font-bold">{errors.address.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">City</label>
                  <input
                    type="text"
                    {...register("city")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.city ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.city && <span className="text-[10px] text-red-500 font-bold">{errors.city.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">State</label>
                  <input
                    type="text"
                    {...register("state")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.state ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.state && <span className="text-[10px] text-red-500 font-bold">{errors.state.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Zip Code</label>
                  <input
                    type="text"
                    {...register("zip")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.zip ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.zip && <span className="text-[10px] text-red-500 font-bold">{errors.zip.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Country</label>
                  <input
                    type="text"
                    {...register("country")}
                    className="h-11 border border-[var(--border-hairline)] px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)]"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <Button variant="primary" onClick={handleNextStep} className="uppercase font-black tracking-widest text-xs h-11">
                  Continue to Payment <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div
              key="payment"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] p-8 shadow-sm"
            >
              <h3 className="text-grotesk text-2xl font-black uppercase tracking-tight text-[var(--ink-900)] border-b border-[var(--border-hairline)] pb-4 mb-6">
                Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="XXXX XXXX XXXX XXXX"
                      {...register("cardNumber")}
                      className={`h-11 border pl-3 pr-12 w-full rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                        errors.cardNumber ? "border-red-500" : "border-[var(--border-hairline)]"
                      }`}
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black uppercase text-[var(--accent-coral)]">
                      {cardBrand || <CreditCard className="w-4.5 h-4.5 text-[var(--ink-600)]" />}
                    </div>
                  </div>
                  {errors.cardNumber && <span className="text-[10px] text-red-500 font-bold">{errors.cardNumber.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    {...register("cardExpiry")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.cardExpiry ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.cardExpiry && <span className="text-[10px] text-red-500 font-bold">{errors.cardExpiry.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">CVC</label>
                  <input
                    type="text"
                    placeholder="3 or 4 digits"
                    {...register("cardCvc")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.cardCvc ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.cardCvc && <span className="text-[10px] text-red-500 font-bold">{errors.cardCvc.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)]">Cardholder Name</label>
                  <input
                    type="text"
                    {...register("cardName")}
                    className={`h-11 border px-3 rounded-[var(--radius-md)] text-sm bg-[var(--bg-canvas)] focus:ring-0 ${
                      errors.cardName ? "border-red-500" : "border-[var(--border-hairline)]"
                    }`}
                  />
                  {errors.cardName && <span className="text-[10px] text-red-500 font-bold">{errors.cardName.message}</span>}
                </div>
              </div>

              <div className="flex justify-between gap-3 mt-8">
                <Button variant="outline" onClick={handleBackStep} className="uppercase font-black tracking-widest text-xs h-11">
                  Back
                </Button>
                <Button variant="primary" onClick={handleNextStep} className="uppercase font-black tracking-widest text-xs h-11">
                  Review Order <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "review" && (
            <motion.div
              key="review"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] p-8 shadow-sm"
            >
              <h3 className="text-grotesk text-2xl font-black uppercase tracking-tight text-[var(--ink-900)] border-b border-[var(--border-hairline)] pb-4 mb-6">
                Review Order Configuration
              </h3>

              <div className="flex flex-col gap-6">
                {/* Billing items preview */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)] border-b pb-1">Line Items</h4>
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="font-bold">{item.name} x {item.qty}</span>
                      <span className="font-black font-mono">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--ink-600)] border-b pb-1">Billing Summary</h4>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-[var(--ink-600)]">Subtotal</span>
                    <span className="font-black font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-[var(--ink-600)]">Shipping</span>
                    <span className="font-black font-mono">{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-[var(--border-hairline)] pt-3">
                    <span className="text-sm font-black">TOTAL</span>
                    <span className="text-2xl font-black font-mono text-[var(--ink-900)]">{formatPrice(totalCost)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3 mt-8">
                <Button variant="outline" onClick={handleBackStep} className="uppercase font-black tracking-widest text-xs h-11">
                  Back
                </Button>
                <Button
                  variant="lime"
                  onClick={handleSubmit(onSubmit)}
                  className="uppercase font-black tracking-widest text-xs h-11 px-8"
                >
                  Place Order ({formatPrice(totalCost)})
                </Button>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-white border border-[var(--border-hairline)] rounded-[var(--radius-lg)] p-12 max-w-md mx-auto shadow-xl flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--accent-lime)] text-[var(--ink-900)] flex items-center justify-center animate-bounce shadow-md">
                <Check className="w-8 h-8 stroke-[3.5px]" />
              </div>

              <div>
                <h2 className="text-grotesk text-3xl font-black uppercase text-[var(--ink-900)]">
                  ORDER SECURED
                </h2>
                <p className="text-sm text-[var(--ink-600)] mt-2 max-w-xs mx-auto">
                  A high-fidelity dispatch pipeline has been established. Delivery updates will transmit hourly.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[var(--bg-canvas-alt)] px-4 py-2 rounded-full text-xs font-bold text-[var(--ink-600)] mt-2">
                <ShieldCheck className="w-4 h-4 text-[var(--ink-900)]" />
                <span>SSL Encrypted Checkout Complete</span>
              </div>

              <Link href="/shop" className="w-full mt-4">
                <Button variant="primary" className="w-full uppercase font-black tracking-widest text-xs h-11">
                  Browse Catalog
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
