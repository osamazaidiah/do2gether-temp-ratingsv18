import { useState } from "react";
export default function RewardsButton({
  emoji,
  description,
  setRewardEmoji,
  setVisibility,
  playerName,
  updateTeamRewards
}) {
  const sendUpdatesToTeamRewards = () => {
    if (emoji === "🥉") {
      updateTeamRewards(playerName, "good");
    } else if (emoji === "🥈") {
      updateTeamRewards(playerName, "great");
    } else if (emoji === "🥇") {
      updateTeamRewards(playerName, "excellent");
    } else {
      updateTeamRewards(playerName, "remove");
    }
  };
  return (
    <div
      className="usableButton rewards-button-container"
      onClick={() => {
        setRewardEmoji(`${emoji}${description}`);
        setVisibility(() => false);
        sendUpdatesToTeamRewards();
      }}
    >
      <span className="" role="img" aria-label="give a player a good job">
        {emoji}
      </span>
      <span>{description}</span>
    </div>
  );
}
