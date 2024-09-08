import { useEffect, useState } from "react";
import supabase from "@utils/supabase";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from("scores")
        .select("*")
        .order("score", { ascending: false })
        .limit(10);
      if (error) {
        console.error("Error fetching scores:", error);
      } else {
        setScores(data);
      }
    };
    fetchScores();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-2xl mb-2">Leaderboard</h2>
      <ul>
        {scores.map((s) => (
          <li key={s.id} className="text-lg">
            Score: {s.score} - {new Date(s.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
