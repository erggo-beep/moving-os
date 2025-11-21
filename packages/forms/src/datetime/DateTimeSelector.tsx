import { Clock, Calendar, FileText, Clock3, AlertCircle } from 'lucide-react';
import { Tooltip, SelectableCard, TextArea } from '@moving-company/ui';
import type { DateTimeFormData } from '@moving-company/types';

interface DateTimeSelectorProps {
  data: DateTimeFormData;
  onChange: (data: DateTimeFormData) => void;
  DateSelectorComponent?: React.ComponentType<any>;
  getDateStatus?: (dateString: string) => { isDisabled?: boolean; surcharge?: string };
  formatDateDisplay?: (dateString: string) => string;
  isWeekend?: (dateString: string) => boolean;
  compact?: boolean;
  className?: string;
}

function DateTimeSelector({
  data,
  onChange,
  DateSelectorComponent,
  getDateStatus,
  formatDateDisplay,
  isWeekend,
  compact = false,
  className = '',
}: DateTimeSelectorProps) {
  const handleChange = (field: string, value: any) => {
    const updates: any = { [field]: value };

    if (field === 'startTimePreference' && value === 'flexible') {
      updates.startTimeSlot = '';
    }

    onChange({ ...data, ...updates });
  };

  return (
    <div className={className}>
      <div className="space-y-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-gray-900">Moving Date</h3>
          </div>

          {DateSelectorComponent ? (
            <DateSelectorComponent
              selectedDate={data.movingDate}
              onDateSelect={(date: string) => handleChange('movingDate', date)}
              getDateStatus={getDateStatus}
            />
          ) : (
            <input
              type="date"
              value={data.movingDate}
              onChange={(e) => handleChange('movingDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          )}

          {data.movingDate && isWeekend && isWeekend(data.movingDate) && (
            <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Weekend Surcharge</p>
                <p className="text-sm text-gray-600">
                  {formatDateDisplay ? formatDateDisplay(data.movingDate) : data.movingDate} is a weekend. A 10% surcharge applies to weekend moves.
                </p>
              </div>
            </div>
          )}

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
                    I'm flexible with the date
                  </span>
                  <Tooltip text="Being flexible with your moving date can help us provide better rates and availability options." />
                </div>
                <span className="text-sm text-gray-600">
                  We'll contact you to find the best available date
                </span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-gray-900">Start Time Preference</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectableCard
              title="Specific Time Slot"
              description="Choose a preferred start time"
              icon={Clock3}
              selected={data.startTimePreference === 'specific'}
              onClick={() => handleChange('startTimePreference', 'specific')}
            />
            <SelectableCard
              title="Flexible Timing"
              description="Any time works for me"
              icon={Calendar}
              selected={data.startTimePreference === 'flexible'}
              onClick={() => handleChange('startTimePreference', 'flexible')}
            />
          </div>

          {data.startTimePreference === 'specific' && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['08:00', '10:00', '12:00', '14:00'].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handleChange('startTimeSlot', time)}
                  className={`
                    px-4 py-3 border-2 rounded-lg text-center transition-all font-medium
                    ${
                      data.startTimeSlot === time
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-gray-900">Additional Time Details</h3>
            <span className="text-sm text-gray-500">(Optional)</span>
          </div>

          <TextArea
            value={data.additionalTimeDetails}
            onChange={(value) => handleChange('additionalTimeDetails', value)}
            placeholder="Any specific requirements or constraints regarding timing? (e.g., building access restrictions, preferred move-out/move-in sequence)"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}

export default DateTimeSelector;
