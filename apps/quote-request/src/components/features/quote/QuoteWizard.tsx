import { useState, useMemo } from 'react';
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

type ComponentType = 'CustomerTypeStep' | 'AddressDetailsStep' | 'QuoteTypeStep' | 'InventoryStep' | 'FragileItemsStep' | 'HeavyItemsStep' | 'MovingDateTimeStep' | 'ServicesStep' | 'ContactDetailsStep';

interface AddressEntryProps {
  title?: string;
  subtitle?: string;
  addressType?: 'pickup' | 'dropoff';
  showAddAnother?: boolean;
}

interface PageConfig {
  id: string;
  displayStep: number;
  dataKey: string;
  component: ComponentType;
  props?: AddressEntryProps;
  formType?: 'single-selection' | 'multi-step' | 'final';
  requiresSelection?: boolean;
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


const buildNavigationFlow = (pickupAddressCount: number, dropoffAddressCount: number): PageConfig[] => {
  const flow: PageConfig[] = [
    {
      id: 'customer-type',
      displayStep: 1,
      dataKey: 'step0',
      component: 'CustomerTypeStep',
      formType: 'single-selection',
      requiresSelection: true,
    },
  ];

  for (let i = 0; i < pickupAddressCount; i++) {
    flow.push({
      id: `address-from-${i}`,
      displayStep: 2,
      dataKey: `step1[${i}]`,
      component: 'AddressDetailsStep',
      formType: 'multi-step',
      props: {
        title: i === 0 ? 'Add pickup address' : 'Add another pickup address',
        subtitle: 'Update your delivery location information to ensure accurate moving estimates',
        showAddAnother: true,
        addressType: 'pickup',
      },
    });
  }

  for (let i = 0; i < dropoffAddressCount; i++) {
    flow.push({
      id: `address-to-${i}`,
      displayStep: 3,
      dataKey: `step2[${i}]`,
      component: 'AddressDetailsStep',
      formType: 'multi-step',
      props: {
        title: i === 0 ? 'Add drop-off address' : 'Add another drop-off address',
        subtitle: 'Update your delivery location information to ensure accurate moving estimates',
        showAddAnother: true,
        addressType: 'dropoff',
      },
    });
  }

  flow.push(
    {
      id: 'quote-type',
      displayStep: 4,
      dataKey: 'step3',
      component: 'QuoteTypeStep',
      formType: 'single-selection',
      requiresSelection: true,
    },
    {
      id: 'inventory',
      displayStep: 4,
      dataKey: 'step3',
      component: 'InventoryStep',
      formType: 'multi-step',
    },
    {
      id: 'fragile-items',
      displayStep: 4,
      dataKey: 'step3',
      component: 'FragileItemsStep',
      formType: 'multi-step',
    },
    {
      id: 'heavy-items',
      displayStep: 4,
      dataKey: 'step3',
      component: 'HeavyItemsStep',
      formType: 'multi-step',
    },
    {
      id: 'moving-date',
      displayStep: 5,
      dataKey: 'step4',
      component: 'MovingDateTimeStep',
      formType: 'multi-step',
    },
    {
      id: 'additional-services',
      displayStep: 6,
      dataKey: 'step5',
      component: 'ServicesStep',
      formType: 'multi-step',
    },
    {
      id: 'contact-details',
      displayStep: 7,
      dataKey: 'step6',
      component: 'ContactDetailsStep',
      formType: 'final',
    }
  );

  return flow;
};

const TOTAL_DISPLAY_STEPS = 7;

function QuoteWizard() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
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

  const navigationFlow = useMemo(
    () => buildNavigationFlow(formData.step1.length, formData.step2.length),
    [formData.step1.length, formData.step2.length]
  );

  const currentPage = useMemo(
    () => navigationFlow[currentPageIndex],
    [navigationFlow, currentPageIndex]
  );

  const handleNext = () => {
    if (currentPageIndex < navigationFlow.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddPickupAddress = () => {
    setFormData((prev) => ({
      ...prev,
      step1: [...prev.step1, createEmptyAddress()],
    }));
    setCurrentPageIndex(currentPageIndex + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddDropoffAddress = () => {
    setFormData((prev) => ({
      ...prev,
      step2: [...prev.step2, createEmptyAddress()],
    }));
    setCurrentPageIndex(currentPageIndex + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateFormData = (dataKey: string, data: unknown) => {
    if (dataKey.includes('[')) {
      const match = dataKey.match(/(\w+)\[(\d+)\]/);
      if (match) {
        const [, key, index] = match;
        const arrayIndex = parseInt(index, 10);
        setFormData((prev) => {
          const array = [...(prev[key as keyof FormData] as any[])];
          array[arrayIndex] = data;
          return {
            ...prev,
            [key]: array,
          };
        });
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [dataKey]: data,
      }));
    }
  };

  const currentDisplayStep = currentPage.displayStep;

  const getPageData = (dataKey: string): unknown => {
    if (dataKey.includes('[')) {
      const match = dataKey.match(/(\w+)\[(\d+)\]/);
      if (match) {
        const [, key, index] = match;
        const arrayIndex = parseInt(index, 10);
        const data = formData[key as keyof FormData];
        if (Array.isArray(data) && arrayIndex >= 0 && arrayIndex < data.length) {
          return data[arrayIndex];
        }
      }
    }
    return formData[dataKey as keyof FormData];
  };

  const renderPage = () => {
    const pageData = getPageData(currentPage.dataKey);
    const commonProps = {
      data: pageData as never,
      onUpdate: (data: unknown) => updateFormData(currentPage.dataKey, data),
      onNext: handleNext,
      onPrevious: currentPageIndex > 0 ? handlePrevious : undefined,
    };

    switch (currentPage.component) {
      case 'CustomerTypeStep':
        return <CustomerTypeStep {...commonProps} />;

      case 'AddressDetailsStep':
        const addressType = currentPage.props?.addressType;
        const onAddAnotherHandler = currentPage.props?.showAddAnother
          ? addressType === 'pickup'
            ? handleAddPickupAddress
            : handleAddDropoffAddress
          : undefined;
        return (
          <AddressDetailsStep
            {...commonProps}
            title={currentPage.props?.title || ''}
            subtitle={currentPage.props?.subtitle || ''}
            addressType={currentPage.props?.addressType}
            showAddAnother={currentPage.props?.showAddAnother}
            onAddAnother={onAddAnotherHandler}
          />
        );

      case 'QuoteTypeStep':
        return (
          <QuoteTypeStep
            data={{ quoteType: (pageData as any).quoteType || '' }}
            onUpdate={(data) => updateFormData(currentPage.dataKey, { ...(pageData as object), ...data })}
            onSelect={handleNext}
            onPrevious={handlePrevious}
          />
        );

      case 'InventoryStep':
        return <InventoryStep {...commonProps} onPrevious={handlePrevious} />;

      case 'FragileItemsStep':
        return <FragileItemsStep {...commonProps} onPrevious={handlePrevious} />;

      case 'HeavyItemsStep':
        return <HeavyItemsStep {...commonProps} onPrevious={handlePrevious} />;

      case 'MovingDateTimeStep':
        return <MovingDateTimeStep {...commonProps} onPrevious={handlePrevious} />;

      case 'ServicesStep':
        return <ServicesStep {...commonProps} onPrevious={handlePrevious} />;

      case 'ContactDetailsStep':
        return <ContactDetailsStep {...commonProps} onPrevious={handlePrevious} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen lg:bg-gray-50 lg:py-8 lg:px-4">
      <div className="max-w-3xl mx-auto">
        {currentPageIndex > 0 && (
          <div className="bg-white lg:bg-transparent py-4 px-4 lg:px-0 lg:py-0 lg:mb-6">
            <StepIndicator currentStep={currentDisplayStep} totalSteps={TOTAL_DISPLAY_STEPS} />
          </div>
        )}

        <div className="bg-white lg:rounded-lg lg:shadow-sm p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default QuoteWizard;
