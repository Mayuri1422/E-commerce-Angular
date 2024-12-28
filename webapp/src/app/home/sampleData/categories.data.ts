import { Category } from '../types/category.types';

export const categories: Category[] = [
    {
        id: 1,
        category: 'Men',
    },
    {
        id: 2,
        category: 'Women',
    },
    {
        id: 3,
        category: 'Kids',
    },
    {
        id: 4,
        category: 'Party Wear',
        parent_category_id: 2,
    },
    {
        id: 5,
        category: 'Footwear',
        parent_category_id: 2,
    },
    {
        id: 6,
        category: 'Accesories',
        parent_category_id: 3,
    },
    {
        id: 7,
        category: 'Formal Dresses',
        parent_category_id: 1,
    },
];