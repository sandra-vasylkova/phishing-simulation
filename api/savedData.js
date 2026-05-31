import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { playerName, game } = req.body;

  if (!playerName || playerName.trim().length < 2) {
    return res.status(400).json({ error: "Invalid player name" });
  }

  const { data, error } = await supabase
    .from("players")
    .insert({
      player_name: playerName.trim(),
      game,
    })
    .select("id, player_name, game, created_at")
    .single();

  if (error) {
    return res.status(500).json({ error: "Database error" });
  }

  return res.status(200).json(data);
}
