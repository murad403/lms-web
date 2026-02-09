"use client"
import { useParams } from 'next/navigation';


const Category = () => {
    const { category } = useParams();
    return (
        <div>
            {category}
        </div>
    )
}

export default Category
