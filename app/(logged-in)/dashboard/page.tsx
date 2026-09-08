import getDbConnection from "@/lib/database";
import { updateUser } from "@/lib/user-helpers";
import { getUserSubscription } from "@/lib/payment-helpers";
import { getUploadCount } from "@/lib/usage-helpers";
import { FREE_UPLOAD_LIMIT } from "@/lib/constants";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import UploadDashboard from "@/app/(logged-in)/dashboard/upload-dashboard";
import FinalizingCheckout from "./finalizing-checkout";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const sql = await getDbConnection();

  const subscription = await getUserSubscription(sql, email);

  const { session_id } = await searchParams;

  if (session_id) {
    if (subscription?.status === "active") {
      redirect("/dashboard");
    }
    return <FinalizingCheckout />;
  }

  await updateUser(sql, clerkUser.id, email);

  const isSubscribed = subscription?.status === "active";
  const isCancelled = subscription?.status === "cancelled";

  const uploadCount = isSubscribed
    ? 0
    : await getUploadCount(sql, clerkUser.id);

  const uploadsRemaining = isSubscribed
    ? null
    : Math.max(0, FREE_UPLOAD_LIMIT - uploadCount);

  const canUpload = isSubscribed || uploadCount < FREE_UPLOAD_LIMIT;

  const userName = clerkUser.firstName ?? "there";

  return (
    <UploadDashboard
      userName={userName}
      email={email}
      canUpload={canUpload}
      uploadsRemaining={uploadsRemaining}
      isSubscribed={isSubscribed}
      isCancelled={isCancelled}
    />
  );
}
