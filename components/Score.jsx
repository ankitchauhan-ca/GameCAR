import { useEffect } from "react";
import supabase from "@utils/supabase";

const Score = () => {
  useEffect(() => {
    const saveScore = async () => {
      const { data, error } = await supabase.from("scores").insert([{ Score }]);
      if (error) {
        console.error("Error saving score:", error);
      } else {
        console.log("Score saved:", data);
      }
    };
    saveScore();
  }, [Score]);

  return null;
};

export default Score;
