export const en = {
  wizard: {
    customerType: {
      title: 'Get Your Moving Estimate',
      subtitle: 'Fill in the details below to receive an instant, personalized quote for your move. The process is quick, easy, and you can edit all details later if needed.',
      selectLabel: 'Select Customer Type',
      private: {
        title: 'Private Customer',
        description: 'Moving your personal belongings or household items to a new residence.',
      },
      corporate: {
        title: 'Corporate Customer',
        description: 'Relocating office equipment, furniture, or business assets for your company.',
      },
      features: {
        instant: {
          title: 'Instant Quote',
          description: 'Get your estimate immediately',
        },
        editing: {
          title: 'Easy Editing',
          description: 'Modify details anytime',
        },
        secure: {
          title: 'Secure Process',
          description: 'Your data is protected',
        },
      },
    },
    address: {
      pickup: {
        title: 'Add pickup address',
        titleAnother: 'Add another pickup address',
        subtitle: 'Update your delivery location information to ensure accurate moving estimates',
      },
      dropoff: {
        title: 'Add drop-off address',
        titleAnother: 'Add another drop-off address',
        subtitle: 'Update your delivery location information to ensure accurate moving estimates',
      },
      sections: {
        address: 'Address',
        property: 'Property',
        access: 'Access',
      },
    },
    quoteType: {
      title: 'Select Quote Type',
      subtitle: 'Choose the type of service you need for your move',
    },
    inventory: {
      title: 'What needs to be moved?',
      subtitle: 'Select items to calculate total volume and plan your move efficiently',
      volumeLabel: 'Estimated Volume of Selected Items',
      selectedItemsLabel: 'SELECTED ITEMS',
      categories: {
        smallItems: {
          title: 'Small Items',
          description: 'Essential packing containers and storage items',
        },
        seating: {
          title: 'Items to Sit On',
          description: 'Chairs, sofas, benches, and seating furniture',
        },
        beds: {
          title: 'Beds',
          description: 'All bed sizes and mattresses',
        },
        tables: {
          title: 'Tables',
          description: 'Dining, coffee, and desk tables',
        },
        storage: {
          title: 'Storage',
          description: 'Wardrobes, shelves, and storage units',
        },
        outdoor: {
          title: 'Outdoor',
          description: 'Garden and outdoor equipment',
        },
        lighting: {
          title: 'Lighting',
          description: 'Lamps and light fixtures',
        },
      },
    },
    fragileItems: {
      title: 'Add Fragile Items',
      subtitle: 'Let us know about any fragile or special items that require extra care',
    },
    movingDateTime: {
      title: 'Select Moving Date & Time',
      subtitle: 'Choose your preferred moving date and time slot',
    },
    services: {
      title: 'Choose Additional Services',
      subtitle: "Select any additional services you'd like to include with your move",
      includedLabel: 'Included Services',
      optionalLabel: 'Optional Services',
      optionalNote: 'You can also add or remove these later.',
      categories: {
        supplies: {
          title: 'Moving Supplies',
          description: 'With delivery or self-pickup',
        },
        bathroom: {
          title: 'Bathroom Installations',
        },
        other: {
          title: 'Other Installations',
        },
        protection: {
          title: 'Protections',
          description: 'When risking is just not an option',
        },
        additional: {
          title: 'Additional Services',
        },
      },
    },
    contact: {
      title: 'Add your Contact Information',
      subtitle: 'Please provide your contact details to receive your moving estimate',
      customerTypeLabel: 'Are you a new or returning customer?',
      newCustomer: {
        title: 'New Customer',
        description: 'First time using our service',
      },
      returningCustomer: {
        title: 'Returning Customer',
        description: "You've used our service before",
      },
      contactDetailsLabel: 'Contact Details',
      differentContactLabel: 'Use different contact details for moving day',
      differentContactDescription: 'Check this if you want us to use different contact information on the day of your move',
      differentContactNote: 'Use this if someone else will be present on moving day, or if you want us to reach a different person for day-of coordination.',
      movingDayContactLabel: 'Contact Person on Moving Day',
      privacyLabel: 'Privacy & Communications',
      agreePrivacy: 'I agree to the Privacy Policy and consent to the processing of my personal data',
      receiveUpdates: {
        label: 'Receive important updates and offers',
        description: 'Get emails about service updates, moving tips, and special promotions',
      },
    },
  },
  form: {
    labels: {
      streetAddress: 'Street address',
      postalCode: 'Postal code',
      city: 'City',
      propertyType: 'Property type',
      floor: 'Floor',
      apartmentSize: 'Apartment Size',
      access: 'Access',
      walkingDistance: 'Walking distance to car is approximately',
      additionalDetails: 'Additional arrival details',
      firstName: 'First Name',
      lastName: 'Last Name',
      phoneNumber: 'Phone Number',
      emailAddress: 'Email Address',
      additionalNotes: 'Additional notes',
    },
    placeholders: {
      streetAddress: 'Enter street address',
      postalCode: 'Enter postal code',
      city: 'Enter city',
      selectFloor: 'Select floor...',
      walkingDistance: '0',
      additionalDetails: 'e.g., door code, specific instructions for the driver...',
      firstName: 'Enter your first name',
      firstNameContact: "Contact's first name",
      lastName: 'Enter your last name',
      lastNameContact: "Contact's last name",
      phoneNumber: '+1 (555) 000-0000',
      emailAddress: 'your.email@example.com',
      additionalNotes: 'Any special items or additional information...',
    },
    required: '*',
    meters: 'meters',
    squareMeters: 'm²',
    cubicMeters: 'm³',
  },
  buttons: {
    continue: 'Continue',
    back: 'Back',
    sendForm: 'Send Form',
    addAnother: 'Add another',
    cancel: 'Cancel',
    addItem: 'Add Item',
  },
  stepIndicator: {
    step: 'Step',
    of: 'of',
  },
  propertyTypes: {
    apartment: 'Apartment building',
    detached: 'Detached house',
    rowhouse: 'Rowhouse / Semi-detached',
    warehouse: 'Warehouse',
  },
  elevatorTypes: {
    goods: 'Goods elevator',
    normal: 'Normal elevator',
    small: 'Small elevator',
    none: 'No elevator',
  },
  accessTypes: {
    direct: 'Direct access',
    walking: 'Longer walking distance',
  },
  floorOptions: {
    ground: 'Ground Floor',
    '1': '1st Floor',
    '2': '2nd Floor',
    '3': '3rd Floor',
    '4': '4th Floor',
    '5+': '5th Floor or Higher',
  },
  tooltips: {
    propertyType: "Select the type of property you're moving from. This helps us prepare the right equipment and plan access routes.",
    multipleFloors: 'Check this if your apartment has stairs inside, like a loft or maisonette.',
    floor: 'The floor level affects pricing. Ground floor moves are typically faster and easier.',
    elevator: 'Elevator type affects how we plan the move. Goods elevators are ideal, but we can work with any type or stairs.',
    apartmentSize: "Enter the approximate size or select 'Not Applicable' if you're only moving a few items. This helps us estimate the move duration.",
    access: 'Tell us about vehicle access. Direct access allows us to park close to the entrance, saving time and cost.',
    inventory: "Select all items you're moving. We calculate the total volume to give you an accurate estimate. Don't worry if you're not sure about quantities - you can adjust these later.",
    services: 'These services can be added now or later. Final pricing will be confirmed before your move.',
    protectionServices: "Protection services are recommended for delicate surfaces or valuable properties. Ask us if you're unsure what you need.",
    packingService: 'We can pack everything for you, from books to fragile items. This saves you time and ensures professional packing.',
    differentContact: 'Use this if someone else will be present on moving day, or if you want us to reach a different person for day-of coordination.',
  },
  messages: {
    formSubmitted: 'Quote request submitted successfully!',
  },
};
