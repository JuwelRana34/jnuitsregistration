"use server";

export async function couponVerify(couponCode: string) {
  const validCoupons: Record<string, number> = {
    "JNUITS2026BCC": 200,
  };

  if (validCoupons[couponCode] !== undefined || "" || null) {
    return { isValid: true, discount: validCoupons[couponCode] };
  }
}