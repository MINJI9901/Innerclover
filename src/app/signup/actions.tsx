"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/src/utils/supabase/server";

export async function login(formData: { email: string; password: string }) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  //   const data = {
  //     email: formData.get("email") as string,
  //     password: formData.get("password") as string,
  //   };

  console.log("sign in: ", formData);

  const { data, error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    // redirect("/error");
    console.log("error while login: ", error);
    return false;
  }

  //   revalidatePath("/", "layout");
  //   redirect("/");
  return data?.user;
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("error signing out: ", error);
  }
}

export async function signup(formData: {
  email: string;
  password: string;
  name: string;
}) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  //   const data = {
  //     email: formData.get("email") as string,
  //     password: formData.get("password") as string,
  //   };

  console.log("sign up: ", formData);

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.log("error while signup: ", error);
    return false;
    // redirect("/error");
  }

  console.log("sign up: ", data);

  if (data.user) {
    const { data: database, error: databaseError } = await supabase
      .from("users")
      .insert([
        { id: data.user?.id, email: formData.email, name: formData.name },
      ])
      .select();

    if (databaseError) {
      console.log(databaseError);
    }

    // console.log("sign up: ", database);
  }

  //   revalidatePath("/", "layout");
  //   redirect("/");
  return data?.user;
}

export async function checkEmailVerified(email: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.log("error fetching users: ", error);
    return false;
  }

  const user = data.users.find((user) => user.email === email);

  if (user) {
    console.log("user email verified?: ", user.email_confirmed_at);
    console.log("user check before sign up: ", user);
    return user.email_confirmed_at ? true : false;
  } else {
    console.log("User not foud");
    return false;
  }
}

export async function changePassword(password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    console.log("error updating password: ", error);
    return false;
  }

  return data;
}

export async function sendPasswordResetEmail(email: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_URL}/reset-password`,
  });

  if (error) {
    console.log("error sending password reset email: ", error);
    return false;
  }

  return data;
}

export async function deleteAccount(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.log("error deleting user: ", error);
    return false;
  }

  return data;
}
