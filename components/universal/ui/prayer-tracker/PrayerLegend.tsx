import { CheckCircle2, Clock, XCircle, HelpCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

const legendItems = [
  { icon: CheckCircle2, label: "Prayed", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Clock, label: "Late", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: XCircle, label: "Not Prayed", color: "text-red-500", bg: "bg-red-50" },
];

export function PrayerLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {legendItems.map(({ icon: Icon, label, color, bg }) => (
        <div key={label} className="flex items-center space-x-2">
          <div className={cn("p-1 rounded-full", bg)}>
            <Icon className={cn("w-4 h-4", color)} />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
        </div>
      ))}
    </div>
  );
}

