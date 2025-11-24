import { useState } from 'react';
import CustomerTypeStep from './steps/CustomerTypeStep';
import AddressDetailsStep from './steps/AddressDetailsStep';
import InventoryStep from './steps/InventoryStep';
import QuoteTypeStep from './steps/QuoteTypeStep';
import FragileItemsStep from './steps/FragileItemsStep';
import HeavyItemsStep from './steps/HeavyItemsStep';
import MovingDateTimeStep from './steps/MovingDateTimeStep';
import ServicesStep from './steps/ServicesStep';
import ContactDetailsStep from './steps/ContactDetailsStep';
import StepIndicator from './StepIndicator';
import NavigationButtons from './components/NavigationButtons';

export interface FragileItem {
  id: string;
  name: string;
  type: 'predefined' | 'custom';
  length?: string;
  width?: string;
  height?: string;
  alreadyIncluded?: boolean;
  sourceItemId?: string;
  additionalDetails?: string;
}

export interface AddressData {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  squareMeters: string;
  squareMetersNotApplicable: boolean;
  floor: string;
  multipleFloors: boolean;
  elevator: string;
  access: string;
  walkingDistance: string;
  additionalDetails: string;
}

export interface FormData {
  step0: {
    customerType: string;
  };
  step1: AddressData[];
  step2: AddressData[];
  step3: {
    quoteType: string;
    items: { [key: string]: number };
    additionalNotes: string;
    fragileItems: FragileItem[];
    fragileItemsDetails: string;
    heavyItems: FragileItem[];
    heavyItemsDetails: string;
  };
  step4: {
    movingDate: string;
    flexibleDate: boolean;
    startTimePreference: string;
    startTimeSlot: string;
    additionalTimeDetails: string;
  };
  step5: {
    services: string[];
  };
  step6: {
    customerType: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    differentContact: boolean;
    contactFirstName: string;
    contactLastName: string;
    contactPhone: string;
    agreePrivacy: boolean;
    receiveUpdates: boolean;
  };
}

const createEmptyAddress = (): AddressData => ({
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  propertyType: '',
  squareMeters: '',
  squareMetersNotApplicable: false,
  floor: '',
  multipleFloors: false,
  elevator: '',
  access: '',
  walkingDistance: '',
  additionalDetails: '',
});

const STEPS = [
  'customer-type',
  'pickup-address',
  'dropoff-address',
  'quote-type',
  'inventory',
  'fragile-items',
  'heavy-items',
  'moving-date',
  'services',
  'contact-details',
] as const;

const TOTAL_STEPS = STEPS.length;

function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    step0: {
      customerType: '',
    },
    step1: [createEmptyAddress()],
    step2: [createEmptyAddress()],
    step3: {
      quoteType: '',
      items: {},
      additionalNotes: '',
      fragileItems: [],
      fragileItemsDetails: '',
      heavyItems: [],
      heavyItemsDetails: '',
    },
    step4: {
      movingDate: '',
      flexibleDate: false,
      startTimePreference: '',
      startTimeSlot: '',
      additionalTimeDetails: '',
    },
    step5: {
      services: [],
    },
    step6: {
      customerType: 'new',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      differentContact: false,
      contactFirstName: '',
      contactLastName: '',
      contactPhone: '',
      agreePrivacy: false,
      receiveUpdates: false,
    },
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStep = () => {
    const stepName = STEPS[currentStep];

    switch (stepName) {
      case 'customer-type':
        return (
          <CustomerTypeStep
            data={formData.step0}
            onUpdate={(data) => setFormData((prev) => ({ ...prev, step0: data }))}
          />
        );

      case 'pickup-address':
        return (
          <AddressDetailsStep
            title="Add pickup address"
            subtitle="Update your delivery location information to ensure accurate moving estimates"
            data={formData.step1[0]}
            onUpdate={(data) =>
              setFormData((prev) => ({
                ...prev,
                step1: [data, ...prev.step1.slice(1)],
              }))
            }
          />
        );

      case 'dropoff-address':
        return (
          <AddressDetailsStep
            title="Add drop-off address"
            subtitle="Update your delivery location information to ensure accurate moving estimates"
            data={formData.step2[0]}
            onUpdate={(data) =>
              setFormData((prev) => ({
                ...prev,
                step2: [data, ...prev.step2.slice(1)],
              }))
            }
          />
        );

      case 'quote-type':
        return (
          <QuoteTypeStep
            data={{ quoteType: formData.step3.quoteType }}
            onUpdate={(data) =>
              setFormData((prev) => ({
                ...prev,
                step3: { ...prev.step3, ...data },
              }))
            }
          />
        );

      case 'inventory':
        return (
          <InventoryStep
            data={formData.step3}
            onUpdate={(data) => setFormData((prev) => ({ ...prev, step3: { ...prev.step3, ...data } }))}
          />
        );

      case 'fragile-items':
        return (
          <FragileItemsStep
            data={formData.step3}
            onUpdate={(data) => setFormData((prev) => ({ ...prev, step3: { ...prev.step3, ...data } }))}
          />
        );

      case 'heavy-items':
        return (
          <HeavyItemsStep
            data={formData.step3}
            onUpdate={(data) => setFormData((prev) => ({ ...prev, step3: { ...prev.step3, ...data } }))}
          />
        );

      case 'moving-date':
        return (
          <MovingDateTimeStep
            data={formData.step4}
            onUpdate={(data) => setFormData((prev) => ({ ...prev, step4: data }))}
          />
        );

      case 'services':
        return (
          <ServicesStep
            data={formData.step5}
            onUpdate={(data) => setFormData((prev) => ({ ...prev, step5: data }))}
          />
        );

      case 'contact-details':
        return (
          <ContactDetailsStep
            data={formData.step6}
            onUpdate={(data) => setFormData((prev) => ({ ...prev, step6: data }))}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen lg:bg-gray-50 lg:py-8 lg:px-4">
      <div className="max-w-3xl mx-auto">
        {currentStep > 0 && (
          <div className="bg-white lg:bg-transparent py-4 px-4 lg:px-0 lg:py-0 lg:mb-6">
            <StepIndicator currentStep={currentStep + 1} totalSteps={TOTAL_STEPS} />
          </div>
        )}

        <div className="bg-white lg:rounded-lg lg:shadow-sm p-4 sm:p-6 lg:p-8">
          {renderStep()}

          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === TOTAL_STEPS - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default QuoteWizard;
