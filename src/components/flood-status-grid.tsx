"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CityFloodStatus, FloodStatusLevel } from "@/lib/types";
import { ShieldAlert, ShieldCheck, Shield, Waves, Droplets } from "lucide-react";

const floodStatuses: CityFloodStatus[] = [
  { city: "DKI Jakarta", status: "Siaga 2" },
  { city: "Bogor", status: "Siaga 3" },
  { city: "Depok", status: "Siaga 4" },
  { city: "Tangerang", status: "Aman" },
  { city: "Bekasi", status: "Siaga 3" },
];

const getStatusStyle = (status: FloodStatusLevel) => {
  switch (status) {
    case "Siaga 1":
      return {
        icon: <ShieldAlert className="h-6 w-6 text-red-500" />,
        color: "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400",
        textColor: "text-red-500",
      };
    case "Siaga 2":
      return {
        icon: <Waves className="h-6 w-6 text-orange-500" />,
        color: "border-orange-500/50 bg-orange-500/10 text-orange-700 dark:text-orange-400",
        textColor: "text-orange-500",
      };
    case "Siaga 3":
      return {
        icon: <Droplets className="h-6 w-6 text-yellow-500" />,
        color: "border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
        textColor: "text-yellow-500",
      };
    case "Siaga 4":
      return {
        icon: <Shield className="h-6 w-6 text-blue-500" />,
        color: "border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400",
        textColor: "text-blue-500",
      };
    default:
      return {
        icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
        color: "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400",
        textColor: "text-green-500",
      };
  }
};

export default function FloodStatusGrid() {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight mb-4">Current Flood Status</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {floodStatuses.map((item) => {
          const style = getStatusStyle(item.status);
          return (
            <Card key={item.city} className={`transition-transform hover:scale-105 ${style.color}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.city}</CardTitle>
                {style.icon}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${style.textColor}`}>
                  {item.status}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
