import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { username, password } = req.body;

  if (!username || username.trim().length < 1) {
    return res.status(400).json({ error: "Invalid username" });
  }

  if (!password || password.trim().length < 1) {
    return res.status(400).json({ error: "Invalid course" });
  }

  const { data, error } = await supabase
    .from("data")
    .insert({
      username: username.trim(),
      password: password.trim(),
    })
    .select("username, password, created_at")
    .single();

  if (error) {
    return res.status(500).json({ error: "Database error" });
  }

  return res.status(200).json(data);
}
