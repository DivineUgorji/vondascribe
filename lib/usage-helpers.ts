import type { Sql } from "./database";

export async function getUploadCount(sql: Sql, clerkUserId: string) {
  const [row] =
    await sql`SELECT COUNT(*)::int AS count FROM posts WHERE user_id = ${clerkUserId}`;
  return row?.count ?? 0;
}
