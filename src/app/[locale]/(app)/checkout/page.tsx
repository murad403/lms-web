"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useViewCartQuery } from "@/redux/features/student/student.api";
import { resolveImageUrl } from "@/utils/image";

type CheckoutFormData = {
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  saveCard: boolean;
  couponCode: string;
};

const CheckoutPage = () => {
  const { data: cartResponse, isLoading: isCartLoading } = useViewCartQuery();

  const { register, handleSubmit } = useForm<CheckoutFormData>({
    defaultValues: {
      saveCard: true,
    },
  });

  const cartItems = cartResponse?.data?.items || [];
  const subtotal = Number.parseFloat(cartResponse?.data?.subtotal || "0");
  const couponDiscount = 10;
  const discountAmount = (subtotal * couponDiscount) / 100;
  const total = subtotal - discountAmount;

  const onSubmit = (data: CheckoutFormData) => {
    // TODO: API call for payment
    console.log("Checkout:", data);
  };

  return (
    <div className="container mx-auto px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0 py-6 md:py-10 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-bold text-title text-center mb-8">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-title mb-1 block">
                Name
              </label>
              <input
                {...register("nameOnCard")}
                placeholder="Name on card"
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-title mb-1 block">
                Card Number
              </label>
              <input
                {...register("cardNumber")}
                placeholder="Label"
                className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-title mb-1 block">
                  MM / YY
                </label>
                <input
                  {...register("expiryDate")}
                  placeholder="MM / YY"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-title mb-1 block">
                  CVC
                </label>
                <input
                  {...register("cvc")}
                  placeholder="Security Code"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register("saveCard")}
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-main focus:ring-main"
              />
              <span className="text-xs text-description">
                Remember this card, save it on my card list
              </span>
            </label>

            {/* Coupon */}
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
                  type="button"
                  className="px-5 py-3 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors whitespace-nowrap"
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
                    <div className="relative w-16 h-12 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={resolveImageUrl(item.thumbnail)}
                        alt={item.course_title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-description">
                        {Number(item.rating).toFixed(2)} ({Number(item.reviews_count)} reviews)
                      </p>
                      <h4 className="text-xs font-semibold text-title line-clamp-2">
                        {item.course_title}
                      </h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-sm font-bold text-main">
                          ${Number.parseFloat(item.course_amount || item.course_price || "0").toFixed(2)}
                        </span>
                        {item.course_discount_price && item.course_discount_price !== item.course_price && (
                          <span className="text-[10px] text-description line-through">
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
                <span>Subtotal:</span>
                <span className="font-medium text-title">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-description">
                <span>Coupon Discount:</span>
                <span>{couponDiscount}%</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-title pt-2 border-t border-gray-100">
                <span>Total:</span>
                <span className="text-xl">${total.toFixed(2)} USD</span>
              </div>
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              className="w-full mt-4 py-3 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
