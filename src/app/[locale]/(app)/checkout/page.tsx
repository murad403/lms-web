/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useCheckoutMutation, useMakePaymentMutation, useViewCartQuery } from "@/redux/features/student/student.api";
import { resolveImageUrl } from "@/utils/image";
import stripe from "@/assets/logo/stripe.png";
import { toast } from "sonner";

type CheckoutFormData = {
  couponCode: string;
};

const CheckoutPage = () => {
  const { data: cartResponse, isLoading: isCartLoading } = useViewCartQuery();
  const [checkout, { isLoading: isCheckoutLoading }] = useCheckoutMutation();
  const [makePayment, { isLoading: isPaymentLoading }] = useMakePaymentMutation();

  const { register, handleSubmit } = useForm<CheckoutFormData>();

  const cartItems = cartResponse?.data?.items || [];
  const courseAmount = Number(cartItems[0]?.course_amount) || 0;
  const courseDiscountPrice = Number(cartItems[0]?.course_discount_price) || 0;
  const convertDiscountPrice = Number(courseAmount - courseDiscountPrice);

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      await checkout({ coupon_code: data.couponCode }).unwrap();
      toast.success("Coupon applied successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to apply coupon.");
    }
  };

  const handleCompletePayment = async () => {
    try {
      const checkoutResponse = await checkout({ coupon_code: "" }).unwrap();
      const paymentResponse = await makePayment(checkoutResponse?.data?.order_id).unwrap();
      if (paymentResponse.data.checkout_url) {
        window.location.href = paymentResponse.data.checkout_url;
      }
    } catch (error: any) {
      console.error("Payment flow failed:", error);
      toast.error(error?.data?.message || "Failed to complete payment.");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0 py-6 md:py-10 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-title text-center mb-8">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment Form */}
        <div className="flex-1">
          <Image src={stripe} alt="Stripe" width={500} height={500} className="mx-auto object-cover" />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-title mb-2">
                Have a Coupon?
              </p>
              <div className="flex gap-2">
                <input
                  {...register("couponCode")}
                  placeholder="COUPON CODE"
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main uppercase"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Apply Code
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 xl:w-96">
          <div className="bg-white rounded-md border border-border-light p-4 sm:p-5 sticky top-24">
            <h3 className="text-base font-medium text-title mb-4">
              Courses {String(cartItems.length).padStart(2, "0")}
            </h3>

            <div className="space-y-4 mb-6">
              {isCartLoading ? (
                <p className="text-sm text-description">Loading cart...</p>
              ) : cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-20 h-16 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={resolveImageUrl(item.thumbnail)}
                        alt={item.course_title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-description">
                        {Number(item.rating).toFixed(2)} ({Number(item.reviews_count)} reviews)
                      </p>
                      <h4 className="text-sm md:text-base font-semibold text-title line-clamp-2">
                        {item.course_title}
                      </h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-sm md:text-base font-bold text-main">
                          ${Number.parseFloat(item.course_amount || item.course_price || "0").toFixed(2)}
                        </span>
                        {item.course_discount_price && item.course_discount_price !== item.course_price && (
                          <span className="text-xs text-description line-through">
                            ${Number.parseFloat(item.course_discount_price).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-description">Your cart is empty.</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <h4 className="text-sm font-bold text-title mb-3">
                Order Summery
              </h4>
              <div className="flex justify-between text-sm text-description">
                <span>Course Price:</span>
                <span className="font-medium text-title">
                  ${courseAmount}
                </span>
              </div>
              <div className="flex justify-between text-xs text-description">
                <span>Discount Price:</span>
                <span>${convertDiscountPrice}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-title pt-2 border-t border-gray-100">
                <span>Total:</span>
                <span className="text-xl">${courseAmount - convertDiscountPrice}</span>
              </div>
            </div>

            <button
              onClick={handleCompletePayment}
              type="button"
              className="w-full mt-4 py-3 cursor-pointer bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors"
              disabled={isCheckoutLoading || isPaymentLoading || isCartLoading}
            >
              {isPaymentLoading ? "Processing..." : "Complete Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;