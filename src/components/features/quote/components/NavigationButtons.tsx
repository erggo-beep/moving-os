import { useTranslation } from '../../../../locales';

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  showNext?: boolean;
  nextLabel?: string;
  isFirstPage?: boolean;
  isLastPage?: boolean;
}

function NavigationButtons({
  onPrevious,
  onNext,
  showNext = true,
  nextLabel,
  isFirstPage = false,
  isLastPage = false
}: NavigationButtonsProps) {
  const { t } = useTranslation();
  const showBackButton = !isFirstPage && onPrevious;
  const showNextButton = showNext && onNext;
  const finalNextLabel = nextLabel || (isLastPage ? t('buttons.sendForm') : t('buttons.continue'));

  return (
    <div className={`flex ${showBackButton ? 'justify-between' : 'justify-end'} mt-8`}>
      {showBackButton && (
        <button
          type="button"
          onClick={onPrevious}
          className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {t('buttons.back')}
        </button>
      )}
      {showNextButton && (
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {finalNextLabel}
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
