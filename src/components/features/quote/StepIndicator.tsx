import { useTranslation } from '../../../locales';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center space-x-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${
                step === currentStep
                  ? 'bg-red-600 text-white'
                  : step < currentStep
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-200 text-gray-500'
              }
            `}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div
              className={`
                w-8 h-0.5 mx-1
                ${step < currentStep ? 'bg-red-600' : 'bg-gray-200'}
              `}
            />
          )}
        </div>
      ))}
      <span className="ml-4 text-sm text-gray-600 font-medium">
        {t('stepIndicator.step')} {currentStep} {t('stepIndicator.of')} {totalSteps}
      </span>
    </div>
  );
}

export default StepIndicator;
