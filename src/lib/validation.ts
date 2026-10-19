export interface CustomerInput {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  instructions: string;
  notes: string;
  payment: string;
}

export type CustomerErrors = Partial<Record<keyof CustomerInput, string>>;

export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());
export const normalizePhone = (v: string) => v.replace(/[\s-]/g, "");
export const isPkMobile = (v: string) => /^(\+92|0092|92|0)?3\d{9}$/.test(normalizePhone(v));

export function validateCustomer(v: CustomerInput, enabledPayments: string[]): CustomerErrors {
  const e: CustomerErrors = {};
  if (v.name.trim().length < 3) e.name = "Please enter your full name.";
  if (!isPkMobile(v.phone)) e.phone = "Enter a valid Pakistani mobile number, e.g. 0300 1234567.";
  if (v.email.trim() && !isEmail(v.email)) e.email = "Please enter a valid email address.";
  if (v.city.trim().length < 2) e.city = "Please enter your city.";
  if (v.address.trim().length < 10) e.address = "Please enter your complete delivery address.";
  if (!enabledPayments.includes(v.payment)) e.payment = "Please choose a payment method.";
  return e;
}