import { useTranslation } from '../../../../locales';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

function NavigationButtons({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}: NavigationButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('buttons.back')}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={isLastStep}
        className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLastStep ? t('buttons.sendForm') : t('buttons.continue')}
      </button>
    </div>
  );
}

export default NavigationButtons;
