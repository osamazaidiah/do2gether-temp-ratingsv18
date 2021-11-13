import { useState, useEffect } from "react";
import TeamRewardsComponent from "./gameRewardsComponents/TeamRewardsComponentv2";
import BuildSelectFormFromAnArray from "../../../util/BuildSelectFormFromAnArray";
import setDocWithIdInFirestore from "../../../firebase/setDocumentWithIdInFirestore";

export default function GameRewardsComponent({
  teamOne,
  teamTwo,
  docId,
  gameNumber
}) {
  const [saveStatus, setSaveStatus] = useState(false);
  const updateGameRewards = () => {
    setDocWithIdInFirestore({
      collectionId: "SoccerMastersEventsCollection",
      docId: docId,
      document: {
        rewards: {
          [raterName]: { ...completeRewardsData, gameNumber: gameNumber }
        }
      }
    }).then(() => setSaveStatus(true));
  };
  //Function to sort alphabatically
  function compare(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  const hasUnratedPlayers = (rewardsList) => {
    const unratedPlayers = Object.values(rewardsList).some((i) => i === 0);
    return unratedPlayers;
  };

  //Teams data
  const team1Name = teamOne.teamName;
  const team1Captain = teamOne.teamCaptain;
  const team1PlayersList = Object.values(teamOne.teamPlayers).reduce(
    (acc, player) => acc.concat(player.playerName).sort(compare),
    []
  );

  const team2Name = teamTwo.teamName;
  const team2Captain = teamTwo.teamCaptain;
  const team2PlayersList = Object.values(teamTwo.teamPlayers).reduce(
    (acc, player) => acc.concat(player.playerName).sort(compare),
    []
  );

  const completePlayersList = [...team1PlayersList, ...team2PlayersList].sort(
    compare
  );

  const [raterName, setRaterName] = useState("");
  //team 1 players lists
  const [team1Rewards, setTeam1Rewards] = useState({});

  //team 2 players lists
  const [team2Rewards, setTeam2Rewards] = useState({});

  const [gameBestPlayerReward, setGameBestPlayerReward] = useState("");
  const team1HasUnratedPlayers = hasUnratedPlayers(team1Rewards);
  const team2HasUnratedPlayers = hasUnratedPlayers(team2Rewards);

  //Updating the complete list of ratings and best players
  const [completeRewardsData, setCompleteRewardsData] = useState({});
  useEffect(() => {
    setCompleteRewardsData({
      raterName: raterName,
      team1Rewards: { ...team1Rewards },
      team2Rewards: { ...team2Rewards },
      kingOfTheMatch: gameBestPlayerReward
    });
  }, [raterName, team1Rewards, team2Rewards, gameBestPlayerReward]);

  if (saveStatus) return <p>Thank you, your response has been submitted 💝</p>;

  return (
    <>
      {/* Area to enter rater's name for control purposes */}
      <label htmlFor="user">
        Please enter your name: 💖
        <input
          type="text"
          value={raterName}
          onChange={(e) => setRaterName(e.target.value)}
        />
      </label>

      <BuildSelectFormFromAnArray
        optionsArray={completePlayersList}
        selectLabel="👑 Please choose the KING OF THE MATCH: 👑 (⭐x7)"
        stateVariable={gameBestPlayerReward}
        setStateVariable={setGameBestPlayerReward}
      />

      {/* Display team rewards components for both teams */}
      {gameBestPlayerReward !== "" ? (
        <TeamRewardsComponent
          teamPlayers={team1PlayersList.filter(
            (p) => p !== gameBestPlayerReward
          )}
          teamName={team1Name}
          teamCaptain={team1Captain}
          updateTeamRewards={setTeam1Rewards}
        />
      ) : (
        ""
      )}

      <hr />

      {gameBestPlayerReward !== "" ? (
        <TeamRewardsComponent
          teamPlayers={team2PlayersList.filter(
            (p) => p !== gameBestPlayerReward
          )}
          teamName={team2Name}
          teamCaptain={team2Captain}
          updateTeamRewards={setTeam2Rewards}
        />
      ) : (
        ""
      )}

      {gameBestPlayerReward === "" ? (
        ""
      ) : raterName === "" ? (
        <p className="alert">Please Enter your name to submit</p>
      ) : team1HasUnratedPlayers ? (
        <p className="alert">Please rate all players in {team1Name}.</p>
      ) : team2HasUnratedPlayers ? (
        <p className="alert">Please rate all players in {team2Name}.</p>
      ) : (
        <div
          onClick={updateGameRewards}
          className="usableButton"
          style={{ textAlign: "center", margin: "10px auto" }}
        >
          Ready to Submit 🥰
        </div>
      )}
    </>
  );
}
