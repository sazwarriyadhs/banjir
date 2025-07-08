"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { List, MapPin, Clock } from "lucide-react";
import type { UserFloodReport } from "@/lib/types";

interface FloodReportListProps {
  reports: UserFloodReport[];
}

export default function FloodReportList({ reports }: FloodReportListProps) {
  const [filterLocation, setFilterLocation] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const locations = useMemo(() => ["all", ...new Set(reports.map(r => r.location.split(',')[1]?.trim() || 'Unknown').filter(Boolean))], [reports]);

  const filteredAndSortedReports = useMemo(() => {
    let result = reports;
    if (filterLocation !== "all") {
      result = result.filter(report => report.location.includes(filterLocation));
    }
    result.sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
    return result;
  }, [reports, filterLocation, sortOrder]);

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight mb-4">User Flood Reports</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-card rounded-lg border">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Filter by Location</label>
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(loc => <SelectItem key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium mb-1 block">Sort by</label>
          <div className="flex gap-2">
            <Button variant={sortOrder === 'newest' ? 'default' : 'outline'} onClick={() => setSortOrder('newest')} className="w-full">Newest First</Button>
            <Button variant={sortOrder === 'oldest' ? 'default' : 'outline'} onClick={() => setSortOrder('oldest')} className="w-full">Oldest First</Button>
          </div>
        </div>
      </div>

      {filteredAndSortedReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedReports.map((report) => (
            <Card key={report.id} className="flex flex-col">
              <CardHeader>
                {report.imageUrl && (
                  <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
                    <Image src={report.imageUrl} alt={report.description} layout="fill" objectFit="cover" data-ai-hint="flood water" />
                  </div>
                )}
                <CardTitle className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-1 text-primary" />
                  <span>{report.location}</span>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(report.time), { addSuffix: true })}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{report.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-lg border border-dashed">
          <List className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Reports Found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            There are no reports matching your criteria.
          </p>
        </div>
      )}
    </section>
  );
}
