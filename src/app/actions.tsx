"use server";
import { createClient } from "../utils/supabase/server";
import { createAdminClient } from "../utils/supabase/admin";

// -------------------- GENERAL APIs --------------------
// ---------- GET ----------
export async function getRowById(table: string, id: string) {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.from(table).select("*").eq("id", id);

  if (error) {
    console.log("error getting row by id: ", error);
    throw error;
  }

  return data;
}

// ---------- POST ----------
export async function insertOneRow(table: string, row: Record<string, any>) {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.from(table).insert([row]).select();

  if (error) {
    console.log("error inserting a row: ", error);
    throw error;
  }

  return data;
}

// ---------- PATCH ----------
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

// ---------- PATCH ----------
export async function updateArrayColumnById(
  table: string,
  id: string,
  columnName: string,
  newValue: string
) {
  const supabase = await createAdminClient();

  const { data: getData, error: getError } = await supabase
    .from(table)
    .select(`${columnName}`)
    .eq("id", id);

  if (getError) {
    console.log(`error to get column ${columnName}: `, getError);
    throw getError;
  }

  console.log(getData[0]);

  const dataObj = getData[0] as unknown as Record<string, any>;

  const array = dataObj[columnName] || [];

  array.push(newValue);
  console.log(array);

  const { data, error } = await supabase
    .from(table)
    .update({ [columnName]: array })
    .eq("id", id);

  if (error) {
    console.log("error updating columns: ", error);
    throw error;
  }

  return data;
}

// -------------------- MESSAGES APIs --------------------
// ---------- GET ----------
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

// ---------- GET ----------
export async function getMessagesByUserIdAndPeriod(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  console.log("start date: ", startDate.toISOString());
  console.log("end date: ", endDate.toISOString());

  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString());

  console.log("message by userId and period: ", data);

  if (error) {
    console.log("error getting today message by userId: ", error);
    throw error;
  }

  return data;
}

// ---------- GET ----------
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
