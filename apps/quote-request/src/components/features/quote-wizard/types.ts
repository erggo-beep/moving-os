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

export type ComponentType = 'CustomerTypeStep' | 'AddressDetailsStep' | 'QuoteTypeStep' | 'InventoryStep' | 'FragileItemsStep' | 'HeavyItemsStep' | 'MovingDateTimeStep' | 'ServicesStep' | 'ContactDetailsStep';

export interface AddressEntryProps {
  title?: string;
  subtitle?: string;
  addressType?: 'pickup' | 'dropoff';
  showAddAnother?: boolean;
}

export interface PageConfig {
  id: string;
  displayStep: number;
  dataKey: string;
  component: ComponentType;
  props?: AddressEntryProps;
  formType?: 'single-selection' | 'multi-step' | 'final';
  requiresSelection?: boolean;
}
