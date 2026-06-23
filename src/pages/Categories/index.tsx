import { useEffect } from 'react';
import { CategoryTable } from '../../components/tables/CategoryTable';
import { useCategoryStore } from '../../store/categoryStore';

export const CategoriesPage = () => {
  const { fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className='p-6'>
      <CategoryTable />
    </div>
  );
};
