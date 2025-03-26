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

// ---------- GET ----------
export async function getRowsInArray(
  table: string,
  array: string[],
  start?: number,
  end?: number
) {
  const supabase = await createAdminClient();

  if (start && end) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .in("id", array)
      .range(start, end);

    if (error) {
      console.log("error getting row by id: ", error);
      throw error;
    }

    return data;
  }

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .in("id", array);

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
  item: string,
  removeItem: Boolean = false
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

  const dataObj = getData[0] as unknown as Record<string, any>;

  const array = dataObj[columnName] || [];

  if (removeItem) {
    const idx = array.indexOf(item);
    if (idx > -1) {
      array.splice(idx, 1);
    }
  } else {
    array.push(item);
  }

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

// ---------- DELETE ----------
export async function deleteRowById(table: string, id: string) {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    console.log("error deleting row by id: ", error);
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
    console.log("error getting message by userId and period: ", error);
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

// -------------------- STORAGE IMG UPLOAD --------------------
export async function getPublicUrl(filePath: string) {
  const supabase = await createAdminClient();

  const { data } = supabase.storage
    .from("innerclover-1")
    .getPublicUrl(filePath);
  const publicUrl = data.publicUrl;

  return publicUrl;
}

export async function getSignedUrl(filePath: string) {
  const supabase = await createAdminClient();

  const { data } = await supabase.storage
    .from("innerclover-1")
    .createSignedUrl(filePath, 60);
  const signedUrl = data?.signedUrl;

  return signedUrl;
}

export async function uploadImgFile(file: File, userId: string) {
  const fileExt = file?.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `profile_pictures/${fileName}`;

  const supabase = await createAdminClient();
  const { data, error } = await supabase.storage
    .from("innerclover-1")
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.log("error uploading profile picture: ", error);
    return null;
  }

  // return filePath;

  const publicUrl = getPublicUrl(filePath);

  return publicUrl;
}
