"use client";

import { useState } from "react";
import { Droplets, Gauge, Map, MessageSquareQuote, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Dashboard from "@/components/dashboard";
import MapView from "@/components/map-view";
import ReportForm from "@/components/report-form";
import type { UserFloodReport, WaterGate } from "@/lib/types";

const initialReports: UserFloodReport[] = [
  {
    id: "1",
    location: "Kelapa Gading, Jakarta Utara",
    description: "Banjir setinggi pinggang orang dewasa. Listrik padam.",
    time: "2024-08-15T08:00:00.000Z",
    latitude: -6.1563,
    longitude: 106.9084,
    imageUrl: "https://placehold.co/600x400.png",
  },
  {
    id: "2",
    location: "Vila Nusa Indah, Bogor",
    description: "Luapan sungai Cileungsi, ketinggian air sekitar 1 meter.",
    time: "2024-08-15T07:30:00.000Z",
    latitude: -6.3672,
    longitude: 106.9442,
    imageUrl: "https://placehold.co/600x400.png",
  },
  {
    id: "3",
    location: "Ciledug Indah, Tangerang",
    description: "Genangan air 30-50 cm akibat hujan deras semalam.",
    time: "2024-08-15T09:15:00.000Z",
    latitude: -6.2369,
    longitude: 106.7029,
  },
];

const initialWaterGates: WaterGate[] = [
  {
    id: 'wg-1',
    name: 'Pintu Air Katulampa',
    latitude: -6.6343,
    longitude: 106.8492,
    status: 'Normal',
    level: 40,
    lastUpdate: '2024-08-15T09:00:00.000Z',
  },
  {
    id: 'wg-2',
    name: 'Pintu Air Depok',
    latitude: -6.4025,
    longitude: 106.8222,
    status: 'Waspada',
    level: 180,
    lastUpdate: '2024-08-15T09:10:00.000Z',
  },
  {
    id: 'wg-3',
    name: 'Pintu Air Manggarai',
    latitude: -6.2088,
    longitude: 106.849,
    status: 'Siaga',
    level: 860,
    lastUpdate: '2024-08-15T09:20:00.000Z',
  },
  {
    id: 'wg-4',
    name: 'Pintu Air Karet',
    latitude: -6.207,
    longitude: 106.8183,
    status: 'Normal',
    level: 420,
    lastUpdate: '2024-08-15T09:25:00.000Z',
  },
   {
    id: 'wg-5',
    name: 'Pintu Air Angke Hulu',
    latitude: -6.155,
    longitude: 106.78,
    status: 'Awas',
    level: 260,
    lastUpdate: '2024-08-15T09:15:00.000Z',
  },
];


export default function Home() {
  const [reports, setReports] = useState<UserFloodReport[]>(initialReports);
  const [waterGates, setWaterGates] = useState<WaterGate[]>(initialWaterGates);

  const addReport = (report: Omit<UserFloodReport, "id" | "time">) => {
    const newReport: UserFloodReport = {
      ...report,
      id: (reports.length + 1).toString(),
      time: new Date().toISOString(),
    };
    setReports((prevReports) => [newReport, ...prevReports]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold tracking-tight">
              BanjirOnline Mobile
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-[600px] mx-auto">
            <TabsTrigger value="dashboard">
              <Gauge className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="map">
              <Map className="mr-2 h-4 w-4" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="report">
              <PlusCircle className="mr-2 h-4 w-4" />
              Submit Report
            </TabsTrigger>
          </TabsList>
          
          <Card className="mt-4 border-none shadow-none bg-transparent">
            <CardContent className="p-0 sm:p-2 md:p-4">
              <TabsContent value="dashboard">
                <Dashboard reports={reports} />
              </TabsContent>
              <TabsContent value="map">
                <MapView reports={reports} waterGates={waterGates} />
              </TabsContent>
              <TabsContent value="report">
                <ReportForm addReport={addReport} />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </main>

       <footer className="mt-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BanjirOnline Mobile. All rights reserved.</p>
      </footer>
    </div>
  );
}
