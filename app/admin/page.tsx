// app/admin/page.js

import { getUsers } from "@/action/registration";


// পেজটি রিফ্রেশ না করে ডাটা আপডেট পেতে চাইলে:
export const dynamic = 'force-dynamic'; 

export default async function AdminPage() {
  // ডাটা কল করা হচ্ছে
  const users = await getUsers();
// console.log('users:', users); 
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Registered Users ({users.length})</h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Phone</th>
              <th className="py-3 px-6 text-right">TNXid</th>
              <th className="py-3 px-6 text-right">batch </th>
              <th className="py-3 px-6 text-right">createdAt </th>
              <th className="py-3 px-6 text-right">status </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                    {user.name}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {user.email}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {user.phone}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {user.TNXid}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {user.batch}
                  </td>
                  <td className="py-3 px-6 text-right">
                    { new Date(user.createdAt).toLocaleString() }
                  </td>
                  <td className={`py-3 px-6 text-right font-semibold ${user.status === 'success' ? 'text-green-600' : user.status === 'cancel' ? 'text-red-600' : 'text-yellow-600'}`}>
                    <span className={`py-3 my-2 px-6 text-right font-semibold rounded-full ${user.status === 'success' ? 'bg-green-100' : user.status === 'cancel' ? 'bg-red-100' : 'bg-yellow-100'}`}>{user.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No registrations found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}