"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import type { UserFloodReport, WaterGate, WaterGateStatus } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";

interface LeafletMapProps {
  reports: UserFloodReport[];
  waterGates: WaterGate[];
}

const userReportIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const waterGateIcons: Record<WaterGateStatus, L.Icon> = {
    Normal: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    Waspada: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    Siaga: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    Awas: new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
};

const getWaterGateIcon = (status: WaterGateStatus) => {
    return waterGateIcons[status] || waterGateIcons['Normal'];
}

const LeafletMap = ({ reports, waterGates }: LeafletMapProps) => {
  const position: [number, number] = [-6.3, 106.85];

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-lg overflow-hidden border"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Street Map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="Water Gates">
          <LayerGroup>
            {waterGates.map((gate) => (
              <Marker
                key={gate.id}
                position={[gate.latitude, gate.longitude]}
                icon={getWaterGateIcon(gate.status)}
              >
                <Popup>
                  <div className="w-64 space-y-2">
                    <h4 className="font-bold leading-none">{gate.name}</h4>
                    <p className="text-sm">
                      <strong>Status:</strong> {gate.status}
                    </p>
                    <p className="text-sm">
                      <strong>Level:</strong> {gate.level} cm
                    </p>
                     <p className="text-sm text-muted-foreground">
                      Last update: {format(new Date(gate.lastUpdate), "PPp")}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        
        <LayersControl.Overlay checked name="Flood Reports">
          <LayerGroup>
            {reports.map((report) => (
              <Marker
                key={report.id}
                position={[report.latitude, report.longitude]}
                icon={userReportIcon}
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
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default LeafletMap;
