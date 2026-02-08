import Image from 'next/image'
import banner from "@/assets/banner/categories.png";
import Link from 'next/link';

const page = () => {
    return (
        <div>
            {/* banner */}
            <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-100 overflow-hidden">
                {/* Background Image */}
                <Image
                    src={banner}
                    alt="Banner"
                    fill
                    className="object-center"
                    priority
                />

                {/* Content */}
                <div className="relative z-10 container mx-auto flex flex-col justify-center h-full px-3 md:px-0">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main leading-tight ">
                        Valid and Recognized Certifications
                    </h1>

                    <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-header">
                        Choose the right certifications for you.
                    </p>
                    <div className=" mt-4 flex items-center">
                        <Link href={"/"} className="py-4 px-6 border-2 text-xs sm:text-sm font-medium text-white bg-main hover:bg-main/90 transition-colors cursor-pointer">
                            Explore Certifications
                        </Link>
                    </div>

                </div>
            </div>

            {/* certifications */}
            <div className="px-3 md:px-0 container mx-auto">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    
                    {/* LEFT COLUMN */}
                    <div className="flex-1 space-y-4 md:space-y-6">

                        {/* HEALTHCARE & MEDICAL CERTIFICATIONS */}
                        <Link href="/" className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#687663] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">HEALTHCARE & MEDICAL CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#F8FFF2]">
                                <div>
                                    <h4 className="font-semibold">ECM – Continuing Medical Education (CME):</h4>
                                    <p className="text-description">Mandatory training for healthcare professionals (doctors, nurses, allied health professionals).</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">ECM Credits:</h4>
                                    <p className="text-description">Courses awarding mandatory continuing education credits.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Specialized Healthcare Certifications:</h4>
                                    <p className="text-description">PALS, ACLS, BLS-D, Dialysis, Critical Care.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Certifications for Healthcare Roles:</h4>
                                    <p className="text-description">CNA (Certified Nursing Assistant), Healthcare Assistant, and related profiles.</p>
                                </div>
                            </div>
                        </Link>

                        {/* WORKPLACE SAFETY CERTIFICATIONS */}
                        <Link href="/" className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#DB3931] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">WORKPLACE SAFETY CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#FFF0F1]">
                                <div>
                                    <h4 className="font-semibold">RSPP / ASPP</h4>
                                    <p className="text-description">Modules A, B, C – low, medium, and high-risk sectors.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">First Aid Training</h4>
                                    <p className="text-description">Groups A, B, and C.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Fire Safety Training</h4>
                                    <p className="text-description">Low, medium, and high-risk levels.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Employer as RSPP</h4>
                                    <h4 className="font-semibold">RLS – Workers&apos; Safety Representative</h4>
                                    <h4 className="font-semibold">Specific Risk Training</h4>
                                    <p className="text-description">Working at heights, confined spaces, forklift operators, electricians.</p>
                                </div>
                            </div>
                        </Link>

                        {/* NATIONAL & INTERNATIONAL PROFESSIONAL CERTIFICATIONS */}
                        <Link href="/" className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#8569BE] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">NATIONAL & INTERNATIONAL PROFESSIONAL CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#F0E4FF]">
                                <div>
                                    <h4 className="font-semibold">Project Management</h4>
                                    <p className="text-description">PMP, CAPM, PRINCE2.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Agile & Scrum</h4>
                                    <p className="text-description">CSM, PSM, SAFe.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">IT & Digital</h4>
                                    <p className="text-description">Cisco, Microsoft, AWS, Google Cloud, CompTIA.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Cybersecurity</h4>
                                    <p className="text-description">CEH, CISSP, CySA+.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Digital Marketing</h4>
                                    <p className="text-description">Google Ads, Google Analytics, Meta Blueprint, HubSpot.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Foreign Languages</h4>
                                    <p className="text-description">CEFR Level Certifications A1–C2 (IELTS, TOEFL, Cambridge, Goethe)</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Administration & Control</h4>
                                    <p className="text-description">Statutory Auditing, Management Control, Financial Statements.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Logistics</h4>
                                    <p className="text-description">Supply Chain Management, Warehouse Management.</p>
                                </div>
                            </div>
                        </Link>

                        {/* PRIVACY & DATA PROTECTION CERTIFICATIONS */}
                        <Link href={"/"} className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#81836C] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">PRIVACY & DATA PROTECTION CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#F8FFF2]">
                                <p>• <strong>DPO – Data Protection Officer</strong></p>
                                <p>• <strong>Privacy Officer & Privacy Consultant</strong></p>
                                <p>• <strong>Privacy Auditor</strong></p>
                                <p>• <strong>GDPR Regulation (EU) 2016/679 Training</strong></p>
                            </div>
                        </Link>

                        {/* THIRD SECTOR & SOCIAL CARE CERTIFICATIONS */}
                        <Link href={"/"} className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#8569BE] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">THIRD SECTOR & SOCIAL CARE CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#F0E4FF]">
                                <p>Healthcare Support Worker (OSS equivalent)</p>
                                <p>• Childcare & Elderly Care Assistant</p>
                                <p>• Cultural & Family Mediator</p>
                                <p>• Fundraiser</p>
                            </div>
                        </Link>

                        {/* SALES & NEGOTIATION CERTIFICATIONS */}
                        <Link href={"/"} className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#4758BD] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">SALES & NEGOTIATION CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#F0E4FF]">
                                <p>• Consultative Sales</p>
                                <p>• Key Account Management</p>
                                <p>• Sales Force Effectiveness</p>
                            </div>
                        </Link>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex-1 space-y-4 md:space-y-6">

                        {/* SCHOOL & ACADEMIC CERTIFICATIONS */}
                        <Link href={"/"} className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#F2A421] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">SCHOOL & ACADEMIC CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#FFF4ED]">
                                <div>
                                    <h4 className="font-semibold">CFU – University Educational Credits:</h4>
                                    <p className="text-description">Courses awarding credits valid for university programs.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Educational Credits for Public Sector Exams:</h4>
                                    <p className="text-description">Valid for rankings and public competitions (teachers, ATA staff, public exams).</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">MIUR-Recognized Language Certifications:</h4>
                                    <p className="text-description">Cambridge, DELF, DELE, and others.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">MIUR-Recognized IT Certifications:</h4>
                                    <p className="text-description">EIPASS, ICDL, Pekit.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Certifications for Teachers & Educators:</h4>
                                    <p className="text-description">Inclusive Education (DSA, BES), Teaching Methodologies (CLIL, Montessori), Digital Skills (PNSD).</p>
                                </div>
                            </div>
                        </Link>

                        {/* QUALITY, ENVIRONMENT & SAFETY CERTIFICATIONS */}
                        <Link href={"/"} className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#4758BD] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">QUALITY, ENVIRONMENT & SAFETY CERTIFICATIONS (QHSE)</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#F0E4FF]">
                                <div>
                                    <h4 className="font-semibold">Auditor / Lead Auditor</h4>
                                    <p className="text-description">ISO 9001, ISO 14001, ISO 45001, ISO 22000.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Internal Auditor</h4>
                                    <h4 className="font-semibold">Integrated Management Systems Manager</h4>
                                    <h4 className="font-semibold">Specific Regulatory Certifications</h4>
                                    <p className="text-description">ISO 27001 (Information Security), ISO 50001 (Energy Management)</p>
                                </div>
                            </div>
                        </Link>

                        {/* CERTIFICATIONS FOR LICENSED PROFESSIONALS */}
                        <Link href={"/"} className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#D68225] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">CERTIFICATIONS FOR LICENSED PROFESSIONALS (PROFESSIONAL BOARDS & ORDERS)</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#FFE8D9]">
                                <p>MP, CAPM, PRINCE2.</p>
                                <p><strong>Lawyers</strong></p>
                                <p>• Accountants and Auditors</p>
                                <p>• Engineers</p>
                                <p>• Architects</p>
                                <p>• Labor Consultants</p>
                                <p>• Social Workers</p>
                                <p>• Psychologists (CME / ECM)</p>
                            </div>
                        </Link>

                        {/* TECHNICAL & PROFESSIONAL CERTIFICATIONS */}
                        <Link href={"/"} className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#4758BD] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">TECHNICAL & PROFESSIONAL CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#F0E4FF]">
                                <div>
                                    <h4 className="font-semibold">CE Marking & Product Directives</h4>
                                    <h4 className="font-semibold">Process & Manufacturing Certifications</h4>
                                    <p className="text-description">Welding, Non-Destructive Testing (NDT).</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Licenses & Operator Certifications</h4>
                                    <p className="text-description">Forklift Operators, Aerial Platforms (PLE), Cranes.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">HACCP</h4>
                                    <p className="text-description">Food Safety Certifications for Managers and Operators.</p>
                                </div>
                            </div>
                        </Link>

                        {/* SUSTAINABILITY & ENERGY CERTIFICATIONS */}
                        <Link href={"/"} className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#4758BD] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">SUSTAINABILITY & ENERGY CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#F0E4FF]">
                                <p>Energy Management Expert (EGE)</p>
                                <p>• Building Energy Certifier</p>
                                <p>• ESG Consultant (Environmental, Social, Governance)</p>
                                <p>• Sustainability Reporting</p>
                            </div>
                        </Link>

                        {/* PERSONAL DEVELOPMENT & SOFT SKILLS CERTIFICATIONS */}
                        <Link href={"/"} className="bg-white rounded-md overflow-hidden shadow-sm block">
                            <div className="bg-[#4758BD] p-4 md:p-5">
                                <h3 className="font-bold text-base md:text-lg text-white uppercase">PERSONAL DEVELOPMENT & SOFT SKILLS CERTIFICATIONS</h3>
                            </div>
                            <div className="p-4 md:p-5 text-base md:text-lg space-y-2 md:space-y-3 text-description bg-[#F0E4FF]">
                                <p>• Public Speaking</p>
                                <p>• Effective Communication</p>
                                <p>• Leadership & Team Management</p>
                                <p>• Emotional Intelligence</p>
                                <p>• Strategic Problem Solving</p>
                            </div>
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default page



