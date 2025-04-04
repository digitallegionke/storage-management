import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6 md:p-10">
        <AnalyticsDashboard />
      </main>
    </div>
  )
}

