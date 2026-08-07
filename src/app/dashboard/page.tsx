import { auth } from "@/auth";
import AdminView from "@/components/AdminPage/AdminView";
import UserView from "@/components/UserPage/UserView";
import React from "react";

const DashboardHome = async () => {
  const session = await auth()
  const role = session?.user?.role || "user";

  return (
    <div>
      {role === "admin" ? (
        <section>
          <AdminView />
        </section>
      ) : (
        <section>
          <UserView />
        </section>
      )}
    </div>
  );
};

export default DashboardHome;
