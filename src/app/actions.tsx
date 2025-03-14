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
export async function getMessagesByUserId(
  userId: string,
  start?: number,
  end?: number
) {
  const supabase = await createAdminClient();

  if (typeof start === "number" && typeof end === "number") {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .range(start, end);

    console.log("messages by userId: ", data);

    if (error) {
      console.log("error getting messages by userId: ", error);
      throw error;
    }

    return data;
  }

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

export async function getMessagesByUserIdAndPeriod(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  console.log("start date: ", startDate);
  console.log("end date: ", endDate);

  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString());

  console.log("today's message by userId: ", data);

  if (error) {
    console.log("error getting today message by userId: ", error);
    throw error;
  }

  return data;
}

export async function getPublicMessages(start?: number, end?: number) {
  const supabase = await createAdminClient();

  if (typeof start === "number" && typeof end === "number") {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("is_public", true)
      .range(start, end);

    if (error) {
      console.log("error getting row by id: ", error);
      throw error;
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("is_public", true);

    if (error) {
      console.log("error getting row by id: ", error);
      throw error;
    }

    return data;
  }
}
