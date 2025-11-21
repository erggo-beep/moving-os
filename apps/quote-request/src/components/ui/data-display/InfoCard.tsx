import { Info } from 'lucide-react';

interface InfoCardProps {
  children: React.ReactNode;
}

function InfoCard({ children }: InfoCardProps) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 flex items-start gap-3 shadow-sm">
      <div className="flex-shrink-0">
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <Info className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
}

export default InfoCard;
