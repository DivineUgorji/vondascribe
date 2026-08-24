import getDbConnection from "@/lib/database";
import { doesUserExist, updateUser } from "@/lib/user-helpers";
import { currentUser } from "@clerk/nextjs/server";
import UploadDashboard from "@/app/(logged-in)/dashboard/upload-dashboard";

export default async function Dashboard() {
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";
  const sql = await getDbConnection();

  const user = await doesUserExist(sql, email);
  if (user && clerkUser?.id) {
    await updateUser(sql, clerkUser.id, email);
  }

  const userName = clerkUser?.firstName ?? "there";

  return <UploadDashboard userName={userName} />;
}
