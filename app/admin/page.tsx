import RefreshBtn from "@/components/RefreshBtn";
import { Suspense } from "react";
import UserData, { getUserCount } from "./_components/UserData";
import TableLoader from "./_components/TableLoader";

export const revalidate = 86400; // Revalidate every 24 hours
export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-2 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-500">
              Registered Users
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage and view all student registrations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Added Refresh Button Here */}
            <RefreshBtn />

            <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Total: {getUserCount()}
            </span>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* User Data Table Component */}
          <Suspense fallback={<TableLoader />}>
            <UserData/>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
