import NavigationButtons from '../../shared/NavigationButtons';
import { Button } from '@moving-company/ui';
import { ContactEditForm } from '@moving-company/forms';
import type { ContactFormData } from '@moving-company/types';

interface ContactDetailsEntryProps {
  data: ContactFormData;
  onUpdate: (data: ContactFormData) => void;
  onPrevious: () => void;
}

function ContactDetailsStep({ data, onUpdate, onPrevious }: ContactDetailsEntryProps) {
  const handleSubmit = () => {
    console.log('Form submitted:', data);
    alert('Quote request submitted successfully!');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Add your Contact Information
      </h2>
      <p className="text-gray-600 mb-8">
        Please provide your contact details to receive your moving estimate
      </p>

      <ContactEditForm data={data} onChange={onUpdate} />

      <div className="mt-8 flex gap-4">
        <Button variant="secondary" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleSubmit} fullWidth>
          Submit Quote Request
        </Button>
      </div>
    </div>
  );
}

export default ContactDetailsStep;
