import { auth } from "@/auth";
import PrivateContent from "@/components/PrivatePageContent/PrivateContent";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";

const privateData = async (accessToken: string | undefined) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/private/getPrivateData`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (res.status !== 200 || !res.data.success) {
      return {
        data: null,
        status: res.status,
        error: res.data.message || "Failed to fetch private data.",
      };
    }

    return { data: res.data, error: null, status: 200 };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || null;
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching private data.";

      console.error("Error fetching private data:", errorMessage);

      return { data: null, error: errorMessage, status };
    }

    console.log("Error fetching private data:", error);
    return { data: null, error: "Unexpected error occurred.", status: null };
  }
};

const PrivatePage = async () => {
  const session = await auth();

  console.log("Session data in PrivatePage:", session);

  if (!session?.accessToken) {
    redirect("/signin");
  }

  const { data, error, status } = await privateData(session?.accessToken);

  console.log("Private data fetched:", data);

   if (status === null || (status >= 400 && status <= 500)) {
    redirect("/signin");
  }

  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <section>
        <PrivateContent />
      </section>
    </div>
  );
};

export default PrivatePage;
