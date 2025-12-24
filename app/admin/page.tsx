import { getUsers } from "@/action/registration";
import ImagekitImageShow from "@/components/ImagekitImageShow";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const users = await getUsers();

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-blue-500 border-b pb-4">
        Registered Users ({users.length})
      </h1>

      <div className="flex flex-col gap-4">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6 transition hover:shadow-lg"
            >
              {/* --- Left Side: Image --- */}
              <div className="shrink-0">
                <ImagekitImageShow image={user.photo} />
              </div>

              {/* --- Right Side: Information --- */}
              <div className="flex-1 w-full text-center md:text-left">
                {/* Header: Name and Status */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 capitalize">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500 font-medium">
                      Batch: {user.batch}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide mt-2 md:mt-0 ${
                      user.status === "success"
                        ? "bg-green-100 text-green-700"
                        : user.status === "cancel"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600 border-t pt-4">
                  <div className="flex flex-col gap-1">
                    <p>
                      <span className="font-semibold text-gray-800">
                        Email:
                      </span>{" "}
                      {user.email}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">
                        Phone:
                      </span>{" "}
                      {user.phone}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>
                      <span className="font-semibold text-gray-800">
                        TNX ID:
                      </span>{" "}
                      {user.TNXid}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">
                        Applied On:
                      </span>{" "}
                      {new Date(user.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
            <p className="text-gray-500 text-lg">No registrations found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
