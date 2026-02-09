'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';
import { contactFormSchema, ContactFormData } from '@/validation/auth.validation';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = (data: ContactFormData) => {
        console.log('Contact Form Data:', data);
        // Handle form submission
        reset();
    };

    return (
        <div>
            <FooterNavigationBanner
                title="Contact Us"
                description={
                    <>
                        Get in touch with our team. We're here to help with any questions about courses, <br /> certifications, or partnerships.
                    </>
                }
            />

            <section className="py-16 max-w-7xl container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-header mb-8">Contact Information</h2>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="bg-[#DBEAFE] p-3 rounded-full shrink-0">
                                    <Mail className="size-6 text-main" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg md:text-xl text-header mb-1">Email</h3>
                                    <p className="text-description text-xs sm:text-sm md:text-base">info@form-cert.eu</p>
                                    <p className="text-description text-xs sm:text-sm md:text-base">support@form-cert.eu</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="bg-[#DBEAFE] p-3 rounded-full shrink-0">
                                    <Phone className="size-6 text-main" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg md:text-xl text-header mb-1">Phone</h3>
                                    <p className="text-description text-xs sm:text-sm md:text-base">+39 02 1234 5678</p>
                                    <p className="text-description text-xs sm:text-sm md:text-base">Monday - Friday, 9:00 - 18:00 CET</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="bg-[#DBEAFE] p-3 rounded-full shrink-0">
                                    <MapPin className="size-6 text-main" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base sm:text-lg md:text-xl text-header mb-1">Address</h3>
                                    <p className="text-description text-xs sm:text-sm md:text-base">Form-Cert SRL</p>
                                    <p className="text-description text-xs sm:text-sm md:text-base">Via Roma 123</p>
                                    <p className="text-description text-xs sm:text-sm md:text-base">20121 Milano, Italy</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-header mb-8">Send us a message</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-header mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder="Your full name"
                                    {...register('fullName')}
                                    className={`w-full px-4 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-main/20 transition placeholder:text-gray-400 ${errors.fullName ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                                )}
                            </div>

                            {/* Email Address */}
                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-header mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your.email@example.com"
                                    {...register('email')}
                                    className={`w-full px-4 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-main/20 transition placeholder:text-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-header mb-2">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    placeholder="What is this regarding?"
                                    {...register('subject')}
                                    className={`w-full px-4 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-main/20 transition placeholder:text-gray-400 ${errors.subject ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                />
                                {errors.subject && (
                                    <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-header mb-2">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    placeholder="Tell us more about your inquiry..."
                                    {...register('message')}
                                    className={`w-full px-4 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-main/20 transition placeholder:text-gray-400 resize-none ${errors.message ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-main text-white py-3 rounded-md font-semibold hover:bg-main/90 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
