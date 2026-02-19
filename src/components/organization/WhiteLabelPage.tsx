"use client";
import { useState, useRef } from "react";
import { Upload, Eye, Pencil, Globe, Mail, Phone } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import Image from "next/image";

type WhiteLabelForm = {
  organizationName: string;
  biography: string;
};

const WhiteLabelPage = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<"preview" | "edit">("edit");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control } = useForm<WhiteLabelForm>({
    defaultValues: {
      organizationName: "Tech Academy",
      biography:
        "We are a leading online education platform dedicated to providing world-class learning experiences. Our mission is to make quality education accessible to everyone, everywhere. With expert instructors and cutting-edge content, we help students and professionals advance their careers.",
    },
  });

  const watchedValues = useWatch({ control });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: WhiteLabelForm) => {
    console.log("Save White Label:", data, logoPreview);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-title">White-Label</h1>
          <p className="text-sm text-description mt-1">Customize your organization branding</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("preview")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              mode === "preview"
                ? "bg-main text-white"
                : "border border-border-light text-description hover:bg-gray-50"
            }`}
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button
            onClick={() => setMode("edit")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              mode === "edit"
                ? "bg-main text-white"
                : "border border-border-light text-description hover:bg-gray-50"
            }`}
          >
            <Pencil className="w-4 h-4" /> Edit Branding
          </button>
        </div>
      </div>

      {mode === "edit" ? (
        /* Edit Mode */
        <div className="bg-white">
          <div className="p-6 border-b border-border-light">
            <h3 className="text-base font-semibold text-title">White-Label Account Settings</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left - Form Fields */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-title mb-1">Organization Name</label>
                  <input
                    {...register("organizationName", { required: true })}
                    className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-title mb-1">Biography</label>
                  <textarea
                    {...register("biography")}
                    rows={6}
                    className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main resize-none"
                    placeholder="Write about your organization..."
                  />
                </div>
              </div>

              {/* Right - Upload Logo */}
              <div>
                <label className="block text-sm font-medium text-title mb-3">Upload Logo</label>
                <div
                  className="border-2 border-dashed border-border-light p-8 flex flex-col items-center justify-center cursor-pointer hover:border-main transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {logoPreview ? (
                    <div className="relative w-32 h-32">
                      <Image src={logoPreview} alt="Logo preview" fill className="object-contain" />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-description mb-3" />
                      <p className="text-sm text-description text-center">Click to upload logo</p>
                      <p className="text-xs text-description mt-1">PNG, JPG up to 2MB</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </div>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={() => setLogoPreview(null)}
                    className="text-sm text-red-500 mt-2 hover:text-red-600"
                  >
                    Remove logo
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border-light">
              <button
                type="submit"
                className="px-6 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Preview Mode */
        <div className="space-y-6">
          <div className="bg-white">
            <div className="p-6 border-b border-border-light">
              <h3 className="text-base font-semibold text-title">Brand Preview</h3>
            </div>
            <div className="p-6">
              {/* Preview Card */}
              <div className="border border-border-light max-w-2xl mx-auto">
                {/* Header Banner */}
                <div className="bg-main h-32 relative">
                  {logoPreview && (
                    <div className="absolute bottom-0 left-6 translate-y-1/2">
                      <div className="relative w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                        <Image src={logoPreview} alt="Logo" fill className="object-contain" />
                      </div>
                    </div>
                  )}
                </div>

                <div className={`p-6 ${logoPreview ? "pt-14" : "pt-6"}`}>
                  <h2 className="text-xl font-bold text-title">{watchedValues.organizationName || "Organization Name"}</h2>
                  <p className="text-sm text-description mt-2 leading-relaxed">
                    {watchedValues.biography || "Organization biography will appear here."}
                  </p>

                  <div className="mt-6 pt-4 border-t border-border-light">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2 text-sm text-description">
                        <Globe className="w-4 h-4" />
                        <span>www.techacademy.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-description">
                        <Mail className="w-4 h-4" />
                        <span>info@techacademy.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-description">
                        <Phone className="w-4 h-4" />
                        <span>+1 234 567 890</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhiteLabelPage;
