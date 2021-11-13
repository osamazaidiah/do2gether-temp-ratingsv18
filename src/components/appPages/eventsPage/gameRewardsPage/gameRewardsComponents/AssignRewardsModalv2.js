import RewardsButton from "./RewardsButton";

export default function AssignPlayerRewardsModal({
  isVisible,
  setVisibility,
  playerName,
  setRewardEmoji,
  updateTeamRewards
}) {
  return isVisible ? (
    <div className="ModalViewContainer">
      <div className="AssignPlayerRewardsModal ModalViewComponent">
        <div className="ModalViewTitle">
          <h2>{playerName}</h2>
          <span
            className="usableButton"
            onClick={(e) => {
              setVisibility(false);
              setRewardEmoji("REWARD👍");
              updateTeamRewards(playerName, "remove");
            }}
            role="img"
            aria-label="give a player a reward"
          >
            X No Reward
          </span>
        </div>
        <div className="rewards-buttons-container">
          <RewardsButton
            playerName={playerName}
            emoji="🥉"
            description="GOOD ⚽x1"
            setRewardEmoji={setRewardEmoji}
            setVisibility={setVisibility}
            updateTeamRewards={updateTeamRewards}
          />
          <RewardsButton
            playerName={playerName}
            emoji="🥈"
            description="GREAT ⚽x2"
            setRewardEmoji={setRewardEmoji}
            setVisibility={setVisibility}
            updateTeamRewards={updateTeamRewards}
          />
          <RewardsButton
            playerName={playerName}
            emoji="🥇"
            description="TOP ⚽x3"
            setRewardEmoji={setRewardEmoji}
            setVisibility={setVisibility}
            updateTeamRewards={updateTeamRewards}
          />
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
