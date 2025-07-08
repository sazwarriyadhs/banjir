"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserFloodReport, WaterGate } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface MapViewProps {
  reports: UserFloodReport[];
  waterGates: WaterGate[];
}

export default function MapView({ reports, waterGates }: MapViewProps) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/leaflet-map"), {
        loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
        ssr: false,
      }),
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flood Report Map</CardTitle>
        <CardDescription>
          Visualize user reports and water gate levels. Use layers to toggle views.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Map reports={reports} waterGates={waterGates} />
      </CardContent>
    </Card>
  );
}
