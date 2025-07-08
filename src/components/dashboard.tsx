"use client";

import type { UserFloodReport } from "@/lib/types";
import FloodStatusGrid from "./flood-status-grid";
import ReportSummary from "./report-summary";
import FloodReportList from "./flood-report-list";

interface DashboardProps {
  reports: UserFloodReport[];
}

export default function Dashboard({ reports }: DashboardProps) {
  return (
    <div className="space-y-8">
      <FloodStatusGrid />
      <ReportSummary reports={reports} />
      <FloodReportList reports={reports} />
    </div>
  );
}
