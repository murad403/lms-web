"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { CreditCard, Check } from "lucide-react";

type CheckoutFormData = {
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  saveCard: boolean;
  couponCode: string;
};

const cartItems = [
  {
    id: 1,
    title: "Graphic Design Masterclass - Learn GREAT Design",
    image: "/courses/Course Images.png",
    instructor: "Courtney Henry",
    price: 13.0,
  },
  {
    id: 2,
    title: "Learn Python Programming Masterclass",
    image: "/courses/Course Images (1).png",
    instructor: "Albert McKinney",
    price: 89.0,
    originalPrice: 99.0,
  },
  {
    id: 3,
    title: "Instagram Marketing 2021 - Complete Guide To Instagram",
    image: "/courses/Course Images (2).png",
    instructor: "Jacob Jones",
    price: 50.0,
    originalPrice: 60.0,
  },
];

const CheckoutPage = () => {
  const [paymentMethod] = useState("stripe");

  const { register, handleSubmit } = useForm<CheckoutFormData>({
    defaultValues: {
      saveCard: true,
    },
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const couponDiscount = 10;
  const discountAmount = (subtotal * couponDiscount) / 100;
  const total = subtotal - discountAmount;

  const onSubmit = (data: CheckoutFormData) => {
    // TODO: API call for payment
    console.log("Checkout:", data);
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0 py-6 md:py-10">
      <h1 className="text-xl sm:text-2xl font-bold text-title text-center mb-8">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment Form */}
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-title mb-4">
            Payment Method
          </h2>

          {/* Stripe Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-5 py-2 bg-blue-100 text-main text-sm font-bold rounded">
              stripe
            </span>
            <span className="text-sm text-description">Select Stripe</span>
          </div>

          {/* New Payment Card */}
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg mb-6 bg-gray-50">
            <CreditCard className="w-5 h-5 text-main" />
            <span className="text-sm font-medium text-title flex-1">
              New Payment Cards
            </span>
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>

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
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-16 h-12 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-description">
                      Course by: {item.instructor}
                    </p>
                    <h4 className="text-xs font-semibold text-title line-clamp-2">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-sm font-bold text-main">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-description line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
