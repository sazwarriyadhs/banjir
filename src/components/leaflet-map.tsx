"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { UserFloodReport } from "@/lib/types";
import Image from "next/image";

interface LeafletMapProps {
  reports: UserFloodReport[];
}

const LeafletMap = ({ reports }: LeafletMapProps) => {
  // Center of Jabodetabek area
  const position: [number, number] = [-6.4, 106.85];

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden border">
      <MapContainer
        center={position}
        zoom={9}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
          >
            <Popup>
              <div className="w-64 space-y-2">
                <h4 className="font-medium leading-none">{report.location}</h4>
                <p className="text-sm text-muted-foreground">
                  {report.description}
                </p>
                {report.imageUrl && (
                  <div className="relative h-32 w-full rounded-md overflow-hidden">
                    <Image
                      src={report.imageUrl}
                      alt={report.description}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint="flood damage"
                    />
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
