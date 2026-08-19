import getDbConnection from "@/lib/database";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function TranscriptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const sql = await getDbConnection();

  const transcripts = await sql`SELECT * from POSTS where 
  user_id = ${user.id} and id = ${id}`;
  return <div>{JSON.stringify(transcripts)}</div>;
}
