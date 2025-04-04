import { DashboardHeader } from "@/components/dashboard-header"
import { GeneralStorageDashboard } from "@/components/general-storage-dashboard"

export default function GeneralStoragePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 p-6 md:p-10">
        <GeneralStorageDashboard />
      </main>
    </div>
  )
}

