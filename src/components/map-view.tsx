"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserFloodReport, WaterGate } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const Map = dynamic(() => import("@/components/leaflet-map"), {
  loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
  ssr: false,
});

interface MapViewProps {
  reports: UserFloodReport[];
  waterGates: WaterGate[];
  active: boolean;
}

export default function MapView({ reports, waterGates, active }: MapViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flood Report Map</CardTitle>
        <CardDescription>
          Visualize user reports and water gate levels. Use layers to toggle views.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Map reports={reports} waterGates={waterGates} active={active} />
      </CardContent>
    </Card>
  );
}
