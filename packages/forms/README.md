# Moving Company Forms Package

Reusable form components for all moving company applications. These components are fully typed, self-contained, and ready to use across different apps (CRM, Customer Portal, Mover App, etc.).

## Installation

This package is part of the monorepo workspace. Import it in your app:

```typescript
import { AddressEditForm, ContactEditForm, FragileItemsForm } from '@moving-company/forms';
import type { AddressFormData, ContactFormData } from '@moving-company/types';
```

## Available Form Components

### 1. AddressEditForm
Complete address form with property details and access information.

**Usage:**
```typescript
import { AddressEditForm } from '@moving-company/forms';
import type { AddressFormData } from '@moving-company/types';

const [addressData, setAddressData] = useState<AddressFormData>({
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

<AddressEditForm data={addressData} onChange={setAddressData} />
```

### 2. ContactEditForm
Contact information form with optional moving day contact person.

**Usage:**
```typescript
import { ContactEditForm } from '@moving-company/forms';
import type { ContactFormData } from '@moving-company/types';

const [contactData, setContactData] = useState<ContactFormData>({
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
});

<ContactEditForm data={contactData} onChange={setContactData} />
```

### 3. FragileItemsForm
Form for selecting and managing fragile items.

**Usage:**
```typescript
import { FragileItemsForm } from '@moving-company/forms';
import type { FragileItemsFormData } from '@moving-company/types';

const [fragileData, setFragileData] = useState<FragileItemsFormData>({
  fragileItems: [],
  fragileItemsDetails: '',
});

const handleAddItem = () => {
  // Show modal to add item
};

<FragileItemsForm
  data={fragileData}
  onChange={setFragileData}
  onAddItem={handleAddItem}
/>
```

### 4. HeavyItemsForm
Form for selecting and managing heavy items (+100kg).

**Usage:**
```typescript
import { HeavyItemsForm } from '@moving-company/forms';
import type { HeavyItemsFormData } from '@moving-company/types';

const [heavyData, setHeavyData] = useState<HeavyItemsFormData>({
  heavyItems: [],
  heavyItemsDetails: '',
});

<HeavyItemsForm data={heavyData} onChange={setHeavyData} onAddItem={handleAddItem} />
```

## Complete Example: Customer Portal Modal

```typescript
import { useState } from 'react';
import { AddressEditForm } from '@moving-company/forms';
import type { AddressFormData } from '@moving-company/types';
import { Modal, Button } from '@moving-company/ui';

function CustomerPortal() {
  const [showModal, setShowModal] = useState(false);
  const [addressData, setAddressData] = useState<AddressFormData>({
    streetAddress: '123 Main St',
    city: 'Helsinki',
    state: 'Uusimaa',
    zipCode: '00100',
    propertyType: 'apartment',
    squareMeters: '75',
    squareMetersNotApplicable: false,
    floor: '3',
    multipleFloors: false,
    elevator: 'yes',
    access: 'keycode',
    walkingDistance: '10',
    additionalDetails: '',
  });

  const handleSave = async () => {
    await supabase.from('addresses').update(addressData).eq('id', userId);
    setShowModal(false);
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>
        Edit Departure Address
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Edit Departure Address</h2>
        <AddressEditForm data={addressData} onChange={setAddressData} />
        <Button onClick={handleSave}>Save</Button>
      </Modal>
    </div>
  );
}
```

## All Available Components

1. **AddressEditForm** - Complete address form
2. **ContactEditForm** - Contact information
3. **CustomerTypeSelector** - Private/Business selector
4. **QuoteTypeSelector** - Detailed/Quick selector
5. **ServicesSelector** - Multi-select services
6. **DateTimeSelector** - Date and time selection
7. **InventorySelector** - Item inventory
8. **FragileItemsForm** - Fragile items management
9. **HeavyItemsForm** - Heavy items management
10. **SpecialItemsForm** - Generic special items (base component)

## TypeScript Types

All types available from `@moving-company/types`:

- `AddressFormData`
- `ContactFormData`
- `CustomerTypeFormData`
- `QuoteTypeFormData`
- `ServicesFormData`
- `DateTimeFormData`
- `InventoryFormData`
- `FragileItemsFormData`
- `HeavyItemsFormData`
- `FragileItem`
