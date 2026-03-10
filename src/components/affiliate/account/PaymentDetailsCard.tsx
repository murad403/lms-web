"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LayoutGrid } from "lucide-react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const paymentSchema = z.object({
  iban: z
    .string()
    .min(15, "IBAN must be at least 15 characters")
    .max(34, "IBAN must be at most 34 characters"),
  taxId: z.string().min(5, "Tax ID / VAT must be at least 5 characters"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export interface PaymentDetailsCardProps {
  initialIban?: string;
  initialTaxId?: string;
  onSave?: (data: PaymentFormValues) => void;
  className?: string;
}

export function PaymentDetailsCard({
  initialIban = "DE89 3704 0044 0532 0130 00",
  initialTaxId = "DE123456789",
  onSave,
  className = "",
}: PaymentDetailsCardProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      iban: initialIban,
      taxId: initialTaxId,
    },
  });

  const onSubmit = (data: PaymentFormValues) => {
    onSave?.(data);
  };

  const t = useTranslations("AffiliateAccount");

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50">
          <LayoutGrid className="w-5 h-5 text-green-500" />
        </div>
        <h2 className="text-[18px] font-bold text-background-base">
          {t("paymentDetails")}
        </h2>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* IBAN */}
          <FormField
            control={form.control}
            name="iban"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-700 font-medium">
                  {t("iban")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. DE89 3704 0044 0532 0130 00"
                    className="h-11 border-gray-200 text-sm text-gray-800 rounded-lg focus-visible:ring-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Tax ID / VAT */}
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-700 font-medium">
                  {t("taxIdVat")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. DE123456789"
                    className="h-11 border-gray-200 text-sm text-gray-800 rounded-lg focus-visible:ring-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg h-11"
            >
              {form.formState.isSubmitting
                ? t("updating")
                : t("updatePaymentInfo")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
