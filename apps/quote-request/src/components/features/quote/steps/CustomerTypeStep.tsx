import { Home, Building2, Zap, Edit3, Shield } from 'lucide-react';
import { SelectableCard } from '@moving-company/ui';
import NavigationButtons from '../components/NavigationButtons';

interface CustomerTypeData {
  customerType: string;
}

interface CustomerTypeSelectionProps {
  data: CustomerTypeData;
  onUpdate: (data: CustomerTypeData) => void;
  onNext: () => void;
}

function CustomerTypeStep({ data, onUpdate, onNext }: CustomerTypeSelectionProps) {
  const handleCardClick = (type: string) => {
    onUpdate({ customerType: type });
    onNext();
  };

  return (
    <div>
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 2H15V4H9V2ZM12 6C12.5523 6 13 6.44772 13 7V9H11V7C11 6.44772 11.4477 6 12 6ZM6 10H18V20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20V10ZM4 8V20C4 21.6569 5.34315 23 7 23H17C18.6569 23 20 21.6569 20 20V8H22V6H2V8H4ZM14 12H10V18H14V12Z" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Moving Estimate</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fill in the details below to receive an instant, personalized quote for your move. The process is quick, easy, and you can edit all details later if needed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Instant Quote</h3>
          <p className="text-sm text-gray-600">Get your estimate immediately</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Edit3 className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Easy Editing</h3>
          <p className="text-sm text-gray-600">Modify details anytime</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Secure Process</h3>
          <p className="text-sm text-gray-600">Your data is protected</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Customer Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectableCard
            icon={Home}
            title="Private Customer"
            description="Moving your personal belongings or household items to a new residence."
            selected={data.customerType === 'private'}
            onClick={() => handleCardClick('private')}
          />
          <SelectableCard
            icon={Building2}
            title="Corporate Customer"
            description="Relocating office equipment, furniture, or business assets for your company."
            selected={data.customerType === 'corporate'}
            onClick={() => handleCardClick('corporate')}
          />
        </div>
      </div>

      <NavigationButtons
        onNext={onNext}
        showNext={!!data.customerType}
        isFirstPage={true}
      />
    </div>
  );
}

export default CustomerTypeStep;
