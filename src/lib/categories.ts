export type TCategory = {
    id: number;
    headingColor?: string;
    descriptionColor?: string;
    slug: string;
    title?: string;
}

export const categories: TCategory[] = [
    {id: 1, headingColor: "bg-[#687663]", descriptionColor: "bg-[#F8FFF2]", slug: "health-and-well-being"},
    {id: 2, headingColor: "bg-[#F2A421]", descriptionColor: "bg-[#FFE8D9]", slug: "school-and-university"},
    {id: 3, headingColor: "bg-[#DB3931]", descriptionColor: "bg-[#FFE5EE]", slug: "legal-requirements-and-safety"},
    {id: 4, headingColor: "bg-[#4758BD]", descriptionColor: "bg-[#F0E4FF]", slug: "quality-environment-and-sustainability"},
    {id: 5, headingColor: "bg-[#8569BE]", descriptionColor: "bg-[#F0E4FF]", slug: "professional-orders-and-associations"},
    {id: 6, headingColor: "bg-[#D68225]", descriptionColor: "bg-[#FFE8D9]", slug: "technical-vocational"},
    {id: 7, headingColor: "bg-[#81836C]", descriptionColor: "bg-[#F8FFF2]", slug: "social-socio-health-and-third-sector"},
    {id: 8, headingColor: "bg-[#4758BD]", descriptionColor: "bg-[#F0E4FF]", slug: "it-and-technology"},
    {id: 9, headingColor: "bg-[#8569BE]", descriptionColor: "bg-[#F0E4FF]", slug: "languages"},
    {id: 10, headingColor: "bg-[#687663]", descriptionColor: "bg-[#F8FFF2]", slug: "personal-development-and-soft-skills"},
    {id: 11, headingColor: "bg-[#F2A421]", descriptionColor: "bg-[#FFE8D9]", slug: "sales-and-negotiation"},
    {id: 12, headingColor: "bg-[#DB3931]", descriptionColor: "bg-[#FFE5EE]", slug: "tourism-culture-and-hospitality"},
    {id: 13, headingColor: "bg-[#4758BD]", descriptionColor: "bg-[#F0E4FF]", slug: "administration-accounting-and-finance"},
    {id: 14, headingColor: "bg-[#8569BE]", descriptionColor: "bg-[#F0E4FF]", slug: "creative-and-artistic"},
    {id: 15, headingColor: "bg-[#D68225]", descriptionColor: "bg-[#FFE8D9]", slug: "sports-and-motor-activities"},
    {id: 16, headingColor: "bg-[#81836C]", descriptionColor: "bg-[#F8FFF2]", slug: "agriculture-and-agri-food"},
    {id: 17, headingColor: "bg-[#4758BD]", descriptionColor: "bg-[#F0E4FF]", slug: "logistics-transport-and-international-trade"},
    {id: 18, headingColor: "bg-[#8569BE]", descriptionColor: "bg-[#F0E4FF]", slug: "generic-multisectoral"},
]