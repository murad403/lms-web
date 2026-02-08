export type TCategory = {
    id: number;
    headingColor?: string;
    descriptionColor?: string;
    title: string;
    description?: string;
}

export const categories: TCategory[] = [
    {id: 1, headingColor: "bg-[#687663]", descriptionColor: "bg-[#F8FFF2]", title: "MED-01 | Healthcare Area", description: "Training for health and wellness professionals."},

    {id: 2, headingColor: "bg-[#F2A421]", descriptionColor: "bg-[#FFE8D9]", title: "EDU-02 | Academic & School Area", description: "Updates for teachers, administrative staff and the academic world."},

    {id: 3, headingColor: "bg-[#DB3931]", descriptionColor: "bg-[#FFE5EE]", title: "Workplace Safety Area", description: "Mandatory and specialized training for HSE Managers, Workers and Managers."},

    {id: 4, headingColor: "bg-[#4758BD]", descriptionColor: "bg-[#F0E4FF]", title: "Quality, Health, Safety & Environment (QHSE) Area", description: "Integrated management systems and technical standards for professionals and consultants"},

    {id: 5, headingColor: "bg-[#8569BE]", descriptionColor: "bg-[#F0E4FF]", title: "National & International Professional Areas", description: "Mandatory and voluntary training for registration with professional boards."},

    {id: 6, headingColor: "bg-[#D68225]", descriptionColor: "bg-[#FFE8D9]", title: "Professional Orders Area", description: "Teacher training, academic credits, methodologies."},

    {id: 7, headingColor: "bg-[#81836C]", descriptionColor: "bg-[#F8FFF2]", title: "Data Protection & Privacy Area", description: "Training for DPOS, Consultants and all staff on privacy regulations."},

    {id: 8, headingColor: "bg-[#4758BD]", descriptionColor: "bg-[#F0E4FF]", title: "Technical & Professional Area (Crafts & Industry)", description: "Specialized courses for advanced technical and operational skills."},

    {id: 9, headingColor: "bg-[#8569BE]", descriptionColor: "bg-[#F0E4FF]", title: "Third Sector & Social Area", description: "Skills for non-profits, volunteering, social and cooperation sectors. "},

    {id: 10, title: "Sales & Negotiation Area", headingColor: "bg-[#8569BE]"},
    {id: 11, title: "Personal Development & Soft Skills Area", headingColor: "bg-[#8569BE]"},
]