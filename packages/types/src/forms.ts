export interface AddressFormData {
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

export interface ContactFormData {
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
}

export interface CustomerTypeFormData {
  customerType: string;
}

export interface ServicesFormData {
  services: string[];
}

export interface DateTimeFormData {
  movingDate: string;
  flexibleDate: boolean;
  startTimePreference: string;
  startTimeSlot: string;
  additionalTimeDetails: string;
}

export interface InventoryFormData {
  quoteType: string;
  items: { [key: string]: number };
  additionalNotes: string;
}

export interface QuoteTypeFormData {
  quoteType: string;
}

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

export interface FragileItemsFormData {
  fragileItems: FragileItem[];
  fragileItemsDetails?: string;
}

export interface HeavyItemsFormData {
  heavyItems: FragileItem[];
  heavyItemsDetails?: string;
}
