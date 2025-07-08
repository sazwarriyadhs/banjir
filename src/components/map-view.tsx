"use client";

import Image from "next/image";
import { MapPin, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserFloodReport } from "@/lib/types";

interface MapViewProps {
  reports: UserFloodReport[];
}

// Simple normalization function to map lat/lon to 0-1 range for positioning
const normalizeCoords = (lat: number, lon: number) => {
  // Bounding box for Jabodetabek area (approx)
  const minLat = -6.8;
  const maxLat = -6.0;
  const minLon = 106.6;
  const maxLon = 107.1;

  const y = 1 - (lat - minLat) / (maxLat - minLat);
  const x = (lon - minLon) / (maxLon - minLon);

  return { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
};


export default function MapView({ reports }: MapViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flood Report Map</CardTitle>
        <CardDescription>
          Visualize user-submitted flood reports. Click on a pin for details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted border">
          <Image
            src="https://placehold.co/1200x900.png"
            alt="Map of Jabodetabek"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
            data-ai-hint="map jakarta"
          />
          {reports.map((report) => {
            const { x, y } = normalizeCoords(report.latitude, report.longitude);
            return (
              <Popover key={report.id}>
                <PopoverTrigger asChild>
                  <button
                    className="absolute transform -translate-x-1/2 -translate-y-full focus:outline-none"
                    style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
                    aria-label={`Report at ${report.location}`}
                  >
                    <MapPin className="h-8 w-8 text-primary drop-shadow-lg transition-transform hover:scale-110" fill="currentColor" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">{report.location}</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.description}
                      </p>
                    </div>
                    {report.imageUrl && (
                      <div className="relative h-32 w-full rounded-md overflow-hidden">
                        <Image src={report.imageUrl} alt={report.description} layout="fill" objectFit="cover" data-ai-hint="flood damage" />
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
