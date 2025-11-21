import { useRef, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryNavigationProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

function CategoryNavigation({
  categories,
  activeCategory,
  onCategoryClick
}: CategoryNavigationProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeButtonRef.current && navRef.current) {
      const button = activeButtonRef.current;
      const nav = navRef.current;

      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const navWidth = nav.offsetWidth;

      const scrollPosition = buttonLeft - (navWidth / 2) + (buttonWidth / 2);

      nav.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2">
      <nav
        ref={navRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              ref={isActive ? activeButtonRef : null}
              onClick={() => onCategoryClick(category.id)}
              className={`
                flex-shrink-0 py-2 text-sm font-medium whitespace-nowrap
                transition-all duration-200 relative
                ${isActive
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {category.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default CategoryNavigation;
