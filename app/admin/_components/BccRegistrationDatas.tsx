import { BccRegistrationData } from "@/action/registration";
import StatusDropdown from "./StatusDropdown";

export default async function BccRegistrationDatas() {
  const users = await BccRegistrationData();

  return (
    <>
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          {/* Table Head */}
          <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">
                Profile
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Contact Info
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Batch
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Payment Info
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium">
                Applied Date
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Column: Profile */}
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 capitalize">
                      {user.name}
                    </div>
                  </td>

                  {/* Column: Contact */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-gray-900">{user.email}</span>
                      <span className="text-xs text-gray-500">
                        {user.phone}
                      </span>
                    </div>
                  </td>

                  {/* Column: Batch */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {user.batch}
                    </span>
                  </td>

                  {/* Column: Payment (TNX) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-gray-600 font-mono text-xs">
                      <span>TNX:</span>
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {user.TNXid}
                      </span>
                    </div>
                  </td>

                  {/* Column: Status (UPDATED) */}
                  <td className="px-1 py-4 whitespace-nowrap">
                    {/* Pass current status and the ID needed to find the row in Google Sheet */}
                    <StatusDropdown
                      currentStatus={user.status}
                      tnxId={user.TNXid}
                    />
                  </td>

                  {/* Column: Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <div className="text-xs text-gray-400">
                      {new Date(user.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                    <svg
                      className="h-8 w-8 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p>No registered users found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
