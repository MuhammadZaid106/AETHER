import z from "zod";

// Luhn algorithm check for credit card numbers
function luhn(num: string): boolean {
  const digits = num.replace(/\D/g, "");
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (isEven) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

// Check expiry is in the future
function isFutureExpiry(value: string): boolean {
  const [month, year] = value.split("/").map(Number);
  if (!month || !year || month < 1 || month > 12) return false;
  const now = new Date();
  const expiry = new Date(2000 + year, month - 1, 1);
  return expiry > now;
}

export const checkoutSchema = z.object({
  // Shipping
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^\+?[\d\s\-().]{7,}$/, "Enter a valid phone number"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^\d{4,10}$/, "Enter a valid ZIP/postal code"),
  country: z.string().min(2, "Country is required"),

  // Payment
  cardNumber: z
    .string()
    .refine((v) => luhn(v.replace(/\s/g, "")), "Invalid card number"),
  cardExpiry: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Format: MM/YY")
    .refine(isFutureExpiry, "Card has expired"),
  cardCvc: z
    .string()
    .regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  cardName: z.string().min(3, "Enter the name on your card"),

  // Optional
  promoCode: z.string().optional(),
  saveInfo: z.boolean().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
