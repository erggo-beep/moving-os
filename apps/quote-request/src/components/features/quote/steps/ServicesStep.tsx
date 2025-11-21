import { ListChecks } from 'lucide-react';
import { Tooltip } from '@moving-company/ui';
import { SelectableCard } from '@moving-company/ui';
import NavigationButtons from '../components/NavigationButtons';
import { services, type Service } from '../../../../data/services';

interface ServicesData {
  services: string[];
}

interface AdditionalServicesSelectionProps {
  data: ServicesData;
  onUpdate: (data: ServicesData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

function ServicesStep({ data, onUpdate, onNext, onPrevious }: AdditionalServicesSelectionProps) {
  const toggleService = (serviceId: string) => {
    const newServices = data.services.includes(serviceId)
      ? data.services.filter((id) => id !== serviceId)
      : [...data.services, serviceId];
    onUpdate({ ...data, services: newServices });
  };

  const includedServices = services.filter((s) => s.included);
  const optionalServices = services.filter((s) => !s.included);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'supplies':
        return 'Moving Supplies';
      case 'bathroom':
        return 'Bathroom Installations';
      case 'other':
        return 'Other Installations';
      case 'protection':
        return 'Protections';
      case 'additional':
        return 'Additional Services';
      default:
        return '';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'supplies':
        return 'With delivery or self-pickup';
      case 'bathroom':
        return '';
      case 'other':
        return '';
      case 'protection':
        return 'When risking is just not an option';
      case 'additional':
        return '';
      default:
        return '';
    }
  };

  const groupedServices = optionalServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Choose Additional Services
      </h2>
      <p className="text-gray-600 mb-8">
        Select any additional services you'd like to include with your move
      </p>

      <div className="space-y-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Included Services</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {includedServices.map((service) => (
              <SelectableCard
                key={service.id}
                variant="included"
                icon={service.IconComponent}
                title={service.name}
                description={service.description}
                badge="INCLUDED"
                badgeColor="green"
                selected={false}
                onClick={() => {}}
                disabled={true}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-gray-900">Optional Services</h3>
            <Tooltip text="These services can be added now or later. Final pricing will be confirmed before your move." />
          </div>
          <p className="text-sm text-gray-600 mb-6">You can also add or remove these later.</p>

          <div className="space-y-8">
            {Object.entries(groupedServices).map(([category, categoryServices]) => (
              <div key={category}>
                <div className="flex items-center gap-1.5 mb-1">
                  <h4 className="text-base font-bold text-gray-900">
                    {getCategoryTitle(category)}
                  </h4>
                  {category === 'protection' && (
                    <Tooltip text="Protection services are recommended for delicate surfaces or valuable properties. Ask us if you're unsure what you need." />
                  )}
                  {category === 'additional' && getCategoryTitle(category) === 'Additional Services' && (
                    <Tooltip text="We can pack everything for you, from books to fragile items. This saves you time and ensures professional packing." />
                  )}
                </div>
                {getCategoryDescription(category) && (
                  <p className="text-sm text-gray-600 mb-4">
                    {getCategoryDescription(category)}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categoryServices.map((service) => (
                    <SelectableCard
                      key={service.id}
                      icon={service.IconComponent}
                      title={service.name}
                      description={service.description}
                      selected={data.services.includes(service.id)}
                      onClick={() => toggleService(service.id)}
                      price={service.price}
                      priceSubtext={service.priceSubtext}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavigationButtons onPrevious={onPrevious} onNext={onNext} />
    </div>
  );
}

export default ServicesStep;
