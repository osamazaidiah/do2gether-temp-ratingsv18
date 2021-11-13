import PlayerRewardsComponent from "./PlayerRewardsComponent";
export default function TeamRewardsComponent({
  teamPlayers,
  teamName,
  teamCaptain,
  updateTeamRewards
}) {
  return (
    <>
      <h4
        style={{
          padding: "10px 0px"
        }}
      >
        {teamName} Rewards{" "}
        <span style={{ fontSize: "smaller" }}>{teamCaptain}(C)</span>:
      </h4>

      {teamPlayers.map((player) => (
        <PlayerRewardsComponent
          key={player}
          playerName={player}
          updateTeamRewards={updateTeamRewards}
        />
      ))}
    </>
  );
}
