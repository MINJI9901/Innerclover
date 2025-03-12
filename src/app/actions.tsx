"use server";
import { createClient } from "../utils/supabase/server";
import { createAdminClient } from "../utils/supabase/admin";

// -------------------- GENERAL APIs --------------------
export async function getRowById(table: string, id: string) {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.from(table).select("*").eq("id", id);

  if (error) {
    console.log("error getting row by id: ", error);
    throw error;
  }

  return data;
}

export async function insertOneRow(table: string, row: Record<string, any>) {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.from(table).insert([row]).select();

  if (error) {
    console.log("error inserting a row: ", error);
    throw error;
  }

  return data;
}

export async function updateRowById(
  table: string,
  id: string,
  updateQuery: Record<string, any>
) {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from(table)
    .update(updateQuery)
    .eq("id", id)
    .select();

  if (error) {
    console.log("error updating columns: ", error);
    throw error;
  }

  return data;
}

// -------------------- MESSAGES APIs --------------------
export async function getMessageByUserId(
  userId: string,
  getToday: boolean = false
) {
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).toISOString();

  console.log("today: ", today);

  const supabase = await createAdminClient();

  if (getToday) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", today);

    console.log("today's message by userId: ", data);

    if (error) {
      console.log("error getting today message by userId: ", error);
      throw error;
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId);

    console.log("messages by userId: ", data);

    if (error) {
      console.log("error getting messages by userId: ", error);
      throw error;
    }

    return data;
  }
}
