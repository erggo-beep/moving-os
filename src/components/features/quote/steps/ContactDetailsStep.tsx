import { UserPlus, UserCheck } from 'lucide-react';
import Tooltip from '../../../ui/overlay/Tooltip';
import TextInput from '../../../ui/forms/TextInput';

interface ContactDetailsData {
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

interface ContactDetailsEntryProps {
  data: ContactDetailsData;
  onUpdate: (data: ContactDetailsData) => void;
}

function ContactDetailsStep({ data, onUpdate }: ContactDetailsEntryProps) {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Add your Contact Information
      </h2>
      <p className="text-gray-600 mb-8">
        Please provide your contact details to receive your moving estimate
      </p>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Are you a new or returning customer?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleChange('customerType', 'new')}
              className={`
                flex items-center p-5 border-2 rounded-lg text-left transition-all h-full
                ${
                  data.customerType === 'new'
                    ? 'border-red-600 bg-red-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }
              `}
            >
              <UserPlus className="w-7 h-7 text-red-600 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">New Customer</div>
                <div className="text-sm text-gray-600">First time using our service</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleChange('customerType', 'returning')}
              className={`
                flex items-center p-5 border-2 rounded-lg text-left transition-all h-full
                ${
                  data.customerType === 'returning'
                    ? 'border-red-600 bg-red-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }
              `}
            >
              <UserCheck className="w-7 h-7 text-red-600 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Returning Customer</div>
                <div className="text-sm text-gray-600">You've used our service before</div>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Details</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="First Name"
                value={data.firstName}
                onChange={(value) => handleChange('firstName', value)}
                placeholder="Enter your first name"
                required
              />

              <TextInput
                label="Last Name"
                value={data.lastName}
                onChange={(value) => handleChange('lastName', value)}
                placeholder="Enter your last name"
                required
              />
            </div>

            <TextInput
              type="tel"
              label="Phone Number"
              value={data.phone}
              onChange={(value) => handleChange('phone', value)}
              placeholder="+1 (555) 000-0000"
              required
            />

            <TextInput
              type="email"
              label="Email Address"
              value={data.email}
              onChange={(value) => handleChange('email', value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.differentContact}
              onChange={(e) => handleChange('differentContact', e.target.checked)}
              className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-900 font-semibold block">
                  Use different contact details for moving day
                </span>
                <Tooltip text="Use this if someone else will be present on moving day, or if you want us to reach a different person for day-of coordination." />
              </div>
              <span className="text-sm text-gray-600">
                Check this if you want us to use different contact information on the day of your move
              </span>
            </div>
          </label>
        </div>

        {data.differentContact && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Contact Person on Moving Day
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="First Name"
                  value={data.contactFirstName}
                  onChange={(value) => handleChange('contactFirstName', value)}
                  placeholder="Contact's first name"
                  required
                />

                <TextInput
                  label="Last Name"
                  value={data.contactLastName}
                  onChange={(value) => handleChange('contactLastName', value)}
                  placeholder="Contact's last name"
                  required
                />
              </div>

              <TextInput
                type="tel"
                label="Phone Number"
                value={data.contactPhone}
                onChange={(value) => handleChange('contactPhone', value)}
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Privacy & Communications</h3>

          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.agreePrivacy}
                onChange={(e) => handleChange('agreePrivacy', e.target.checked)}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
              />
              <div>
                <span className="text-gray-900">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    Privacy Policy
                  </a>{' '}
                  and consent to the processing of my personal data{' '}
                  <span className="text-red-600">*</span>
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.receiveUpdates}
                onChange={(e) => handleChange('receiveUpdates', e.target.checked)}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
              />
              <div>
                <span className="text-gray-900 font-semibold block">
                  Receive important updates and offers
                </span>
                <span className="text-sm text-gray-600">
                  Get emails about service updates, moving tips, and special promotions
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetailsStep;
