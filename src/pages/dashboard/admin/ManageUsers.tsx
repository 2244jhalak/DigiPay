"use client";

import {
  useGetAllUsersQuery,
  useToggleUserBlockMutation,
  useToggleAgentMutation,
  useToggleUserRoleMutation,
} from "@/redux/authSlice";
import { getUser } from "@/utilities/Auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserCog, ShieldBan, ShieldCheck, ShieldX } from "lucide-react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function ManageUsers() {
  const loggedInUser = getUser();
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery(
    loggedInUser?.id,
    { skip: !loggedInUser?.id, pollingInterval: 1000, }
  );

  const [toggleBlock] = useToggleUserBlockMutation();
  const [toggleAgent] = useToggleAgentMutation();
  const [toggleRole] = useToggleUserRoleMutation();

  const showAlert = (title: string, text: string, icon: any) => {
    Swal.fire({ title, text, icon, timer: 1500, showConfirmButton: false });
  };

  const handleBlock = async (user: any) => {
    if (user.role === "admin") return showAlert("Permission Denied", "Cannot block an admin", "error");
    try {
      await toggleBlock(user._id).unwrap();
      refetch();
      showAlert("Success", "User status updated", "success");
    } catch {
      showAlert("Error", "Failed to update user", "error");
    }
  };

  const handleAgent = async (user: any) => {
    if (user.role === "admin") return showAlert("Permission Denied", "Cannot change admin approval", "error");
    try {
      await toggleAgent(user._id).unwrap();
      refetch();
      showAlert("Updated", "Agent approval updated", "success");
    } catch {
      showAlert("Error", "Failed to update agent", "error");
    }
  };

  const handleRole = async (user: any) => {
    if (user.role === "admin") return showAlert("Permission Denied", "Cannot change admin role", "error");
    try {
      await toggleRole(user._id).unwrap();
      refetch();
      showAlert("Updated", "User role updated", "success");
    } catch {
      showAlert("Error", "Failed to update role", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <svg
          className="h-8 w-8 text-[#18BC9C] animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-center mt-4">Failed to load users.</p>;
  }

  const users = data?.users || [];

  return (
    <Card className="w-full max-w-6xl mx-auto mt-6 shadow-2xl rounded-3xl bg-gradient-to-tr from-white/30 to-white/10 backdrop-blur-lg border border-white/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
          All Users
        </CardTitle>
      </CardHeader>

      <CardContent>
        {users.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No users found</p>
        ) : (
          <div className="h-[calc(100vh-300px)] overflow-auto space-y-4">
            {/* Mobile View */}
            <div className="flex flex-col space-y-4 md:hidden">
              {users.map((u: any, index: number) => (
                <motion.div
                  key={u._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
                >
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <span className="font-semibold text-gray-700 dark:text-white">
                      #{index + 1} {u.name}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      <Badge className="px-2 py-1 text-xs capitalize" variant="outline">{u.role}</Badge>
                      {u.role === "agent" && (
                        <Badge className={`px-2 py-1 text-xs ${u.isApproved === "approve" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
                          {u.isApproved}
                        </Badge>
                      )}
                      <Badge className={`px-2 py-1 text-xs ${u.isBlocked ? "bg-red-500 text-white" : "bg-green-600 text-white"}`}>
                        {u.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-3 break-all">{u.email}</p>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="destructive" className="w-full rounded-xl flex items-center justify-center" onClick={() => handleBlock(u)}>
                      {u.isBlocked ? <><ShieldCheck className="w-4 h-4 mr-1"/> Unblock</> : <><ShieldX className="w-4 h-4 mr-1"/> Block</>}
                    </Button>
                    {u.role === "agent" && (
                      <Button size="sm" variant="secondary" className="w-full rounded-xl flex items-center justify-center" onClick={() => handleAgent(u)}>
                        {u.isApproved === "approve" ? <><ShieldBan className="w-4 h-4 mr-1"/> Suspend</> : <><ShieldCheck className="w-4 h-4 mr-1"/> Approve</>}
                      </Button>
                    )}
                    <Button size="sm" variant="default" className="w-full rounded-xl flex items-center justify-center" onClick={() => handleRole(u)}>
                      <UserCog className="w-4 h-4 mr-1"/> Role
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop/Tablet View */}
            <div className="hidden md:block">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">#</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((u: any, index: number) => (
                    <tr key={u._id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-colors">
                      <td className="px-4 py-3 text-sm">{index + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium">{u.name}</td>
                      <td className="px-4 py-3 text-sm break-all">{u.email}</td>
                      <td className="px-4 py-3 flex flex-col flex-wrap gap-1">
                        <Badge className="px-2 py-1 text-xs capitalize" variant="outline">{u.role}</Badge>
                        {u.role === "agent" && (
                          <Badge className={`px-2 py-1 text-xs ${u.isApproved === "approve" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}`}>
                            {u.isApproved}
                          </Badge>
                        )}
                        <Badge className={`px-2 py-1 text-xs ${u.isBlocked ? "bg-red-500 text-white" : "bg-green-600 text-white"}`}>
                          {u.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                       <div className="flex flex-col md:flex-col md:justify-start gap-2">
                         <Button size="sm" variant="destructive" className="rounded-xl cursor-pointer flex items-center justify-center" onClick={() => handleBlock(u)}>
                           {u.isBlocked ? <><ShieldCheck className="w-4 h-4 mr-1"/> Unblock</> : <><ShieldX className="w-4 h-4 mr-1"/> Block</>}
                         </Button>
                         {u.role === "agent" && (
                           <Button size="sm" variant="secondary" className="rounded-xl cursor-pointer flex items-center justify-center" onClick={() => handleAgent(u)}>
                             {u.isApproved === "approve" ? <><ShieldBan className="w-4 h-4 mr-1"/> Suspend</> : <><ShieldCheck className="w-4 h-4 mr-1"/> Approve</>}
                           </Button>
                         )}
                         <Button size="sm" variant="default" className="rounded-xl cursor-pointer flex items-center justify-center" onClick={() => handleRole(u)}>
                           <UserCog className="w-4 h-4 mr-1"/> Change Role
                         </Button>
                       </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
