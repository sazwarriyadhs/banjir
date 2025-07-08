"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserFloodReport } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface MapViewProps {
  reports: UserFloodReport[];
}

export default function MapView({ reports }: MapViewProps) {
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
          Visualize user-submitted flood reports. Click on a pin for details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Map reports={reports} />
      </CardContent>
    </Card>
  );
}
