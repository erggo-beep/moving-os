import { Clock, Calendar, FileText, Clock3, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, SelectableCard } from '@moving-company/ui';
import DateSelector from '../components/DateSelector';
import NavigationButtons from '../components/NavigationButtons';
import { isWeekend, isBeforeToday, formatDateDisplay } from '@moving-company/utils';

interface MovingDateTimeData {
  movingDate: string;
  flexibleDate: boolean;
  startTimePreference: string;
  startTimeSlot: string;
  additionalTimeDetails: string;
}

interface MovingDateTimeSelectionProps {
  data: MovingDateTimeData;
  onUpdate: (data: MovingDateTimeData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

function MovingDateTimeStep({ data, onUpdate, onNext, onPrevious }: MovingDateTimeSelectionProps) {
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);

  const handleChange = (field: string, value: any) => {
    const updates: any = { [field]: value };

    // Clear startTimeSlot when changing to flexible
    if (field === 'startTimePreference' && value === 'flexible') {
      updates.startTimeSlot = '';
    }

    onUpdate({ ...data, ...updates });
  };

  const getDateStatus = (dateString: string) => {
    // Disable all dates before today
    if (isBeforeToday(dateString)) {
      return { isDisabled: true };
    }

    // Add surcharge for weekends
    if (isWeekend(dateString)) {
      return { surcharge: '+10%' };
    }

    return {};
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Moving Date Details
      </h2>
      <p className="text-gray-600 mb-8">
        Please provide your preferred moving date and time to help us schedule your move efficiently
      </p>

      <div className="space-y-10">
        {/* Moving Date Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-gray-900">Moving Date</h3>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <label className="block text-sm font-semibold text-gray-900">
                Planned Moving Date <span className="text-red-600">*</span>
              </label>
              <Tooltip text="Choose your preferred moving date. We recommend booking at least 2-3 weeks in advance for the best availability." />
            </div>
            <button
              type="button"
              onClick={() => setIsDateSelectorOpen(true)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            >
              <span className={data.movingDate ? "text-gray-900" : "text-gray-500"}>
                {data.movingDate ? formatDateDisplay(data.movingDate) : "Select moving date..."}
              </span>
              <Calendar className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <DateSelector
            isOpen={isDateSelectorOpen}
            selectedDate={data.movingDate}
            onDateSelect={(date) => handleChange('movingDate', date)}
            onClose={() => setIsDateSelectorOpen(false)}
            getDateStatus={getDateStatus}
            title="Select Moving Date"
            subtitle="Choose a date that works for you"
          />

          {data.movingDate && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.flexibleDate}
                  onChange={(e) => handleChange('flexibleDate', e.target.checked)}
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-900 font-semibold block">
                      My moving date is flexible
                    </span>
                    <Tooltip text="Flexible dates can sometimes help us offer better pricing or availability, especially during busy seasons." />
                  </div>
                  <span className="text-sm text-gray-600">
                    Check this if you can move within a few days of your planned date
                  </span>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Start Time Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-gray-900">Start Time</h3>
            <Tooltip text="Morning start can be agreed to a specific time. Afternoon and later starts cannot be promised to an exact time, as the schedule depends on earlier moves of the day. You can however write your preferred time in additional details, and we will try to match it to your schedule." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                value: 'flexible',
                label: 'Flexible',
                description: 'Any time during the day',
                IconComponent: Clock
              },
              {
                value: 'preferred',
                label: 'Preferred Time',
                description: 'I prefer a specific start time',
                IconComponent: Clock3
              },
              {
                value: 'required',
                label: 'Required Time',
                description: 'Start must be at a specific time',
                IconComponent: AlertCircle
              },
            ].map((option) => (
              <SelectableCard
                key={option.value}
                icon={option.IconComponent}
                title={option.label}
                description={option.description}
                selected={data.startTimePreference === option.value}
                onClick={() => handleChange('startTimePreference', option.value)}
              />
            ))}
          </div>

          {(data.startTimePreference === 'preferred' || data.startTimePreference === 'required') && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Select Start Time Slot
              </label>
              <div className="space-y-3">
                {[
                  { value: 'morning-8', label: 'Morning start at 08:00', description: 'Fixed start time' },
                  { value: 'daytime-12-15', label: 'Daytime start (12:00 or 15:00)', description: 'After earlier move' },
                  { value: 'later', label: 'Later start', description: 'Evening or specific time' },
                ].map((slot) => (
                  <label
                    key={slot.value}
                    className={`
                      flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${
                        data.startTimeSlot === slot.value
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="startTimeSlot"
                      value={slot.value}
                      checked={data.startTimeSlot === slot.value}
                      onChange={(e) => handleChange('startTimeSlot', e.target.value)}
                      className="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">{slot.label}</div>
                      <div className="text-sm text-gray-600">{slot.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Additional Details Section */}
        {data.movingDate && data.startTimePreference && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-bold text-gray-900">Additional Details</h3>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Additional Time Details
              </label>
              <textarea
                value={data.additionalTimeDetails}
                onChange={(e) => handleChange('additionalTimeDetails', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Any additional information about timing requirements, preferred exact time, or special considerations..."
              />
            </div>
          </div>
        )}
      </div>

      <NavigationButtons onPrevious={onPrevious} onNext={onNext} />
    </div>
  );
}

export default MovingDateTimeStep;
