// import getDbConnection from "@/lib/database";
// import { doesUserExist, hasCancelledSubscription } from "@/lib/user-helpers";
// import { currentUser } from "@clerk/nextjs/server";
// import { getPlanType } from "@/lib/user-helpers";
// import { updateUser } from "@/lib/user-helpers";

// export default async function Dashboard() {
//   const clerkUser = await currentUser();
//   const email = clerkUser?.emailAddresses[0].emailAddress ?? "";
//   const sql = await getDbConnection();

//   // update the user id
//   let userId = null;
//   let planType = "starter";
//   // let hasUserCancelled = false;

//   const user = await doesUserExist(sql, email);
//   const hasUserCancelled = await hasCancelledSubscription(sql, email);

//   /*Run this query to check if user exists, it it does exist,
//   then asign the clerkId to the userId column in database
//   */

//   if (user) {
//     // Update the user_id in users table
//     userId = clerkUser?.id;
//     if (userId) {
//       await updateUser(sql, userId, email);
//     }

//     const priceId = user[0].price_id;
//     planType = getPlanType(priceId);
//   }

//   const isStarterPlan = planType === "starter";
//   const isBasicPlan = planType === "basic";
//   const isProPlan = planType === "pro";

//   return <section>Dashboard</section>;
// }

import getDbConnection from "@/lib/database";
import { doesUserExist, hasCancelledSubscription } from "@/lib/user-helpers";
import { currentUser } from "@clerk/nextjs/server";
import { getPlanType } from "@/lib/user-helpers";
import { updateUser } from "@/lib/user-helpers";
import UploadDashboard from "@/app/(logged-in)/dashboard/upload-dashboard";

export default async function Dashboard() {
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0].emailAddress ?? "";
  const sql = await getDbConnection();

  // update the user id
  let userId = null;
  let planType = "starter";
  // let hasUserCancelled = false;

  const user = await doesUserExist(sql, email);
  const hasUserCancelled = await hasCancelledSubscription(sql, email);

  /*Run this query to check if user exists, it it does exist,
  then asign the clerkId to the userId column in database
  */

  if (user) {
    // Update the user_id in users table
    userId = clerkUser?.id;
    if (userId) {
      await updateUser(sql, userId, email);
    }

    const priceId = user[0].price_id;
    planType = getPlanType(priceId);
  }

  // const isStarterPlan = planType === "starter";
  // const isBasicPlan = planType === "basic";
  // const isProPlan = planType === "pro";

  const userName = clerkUser?.firstName ?? "there";
  const userInitials = clerkUser?.firstName
    ? `${clerkUser.firstName[0]}${clerkUser.lastName?.[0] ?? ""}`.toUpperCase()
    : email.slice(0, 2).toUpperCase();

  return (
    <UploadDashboard
      userName={userName}
      userInitials={userInitials}
      planType={planType as "starter" | "basic" | "pro"}
      hasCancelled={hasUserCancelled}
    />
  );
}
