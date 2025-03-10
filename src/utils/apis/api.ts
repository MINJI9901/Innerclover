import { createClient } from "../supabase/client";

export async function getRowById(table: string, id: string) {
  const supabase = createClient();

  const { data: users, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id);

  if (error) {
    console.log("error getting row by id: ", error);
    throw error;
  }

  return users;
}
