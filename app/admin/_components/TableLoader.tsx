import { Skeleton } from "@/components/ui/skeleton";

export default function TableLoader() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        {/* Table Head */}
        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-medium">Profile</th>
            <th className="px-6 py-4 font-medium">Contact Info</th>
            <th className="px-6 py-4 font-medium">Batch</th>
            <th className="px-6 py-4 font-medium">Payment Info</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Applied Date</th>
          </tr>
        </thead>

        {/* Skeleton Body */}
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i} className="bg-white">
              {/* Profile */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </td>

              {/* Contact */}
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </td>

              {/* Batch */}
              <td className="px-6 py-4">
                <Skeleton className="h-5 w-16 rounded-md" />
              </td>

              {/* Payment */}
              <td className="px-6 py-4">
                <Skeleton className="h-5 w-24 rounded-md" />
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <Skeleton className="h-5 w-20 rounded-full" />
              </td>

              {/* Date */}
              <td className="px-6 py-4">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
