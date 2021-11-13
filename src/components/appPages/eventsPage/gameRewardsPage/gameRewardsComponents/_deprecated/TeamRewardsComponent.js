import { useState, useEffect } from "react";
import PlayerRewardsComponent from "./PlayerRewardsComponent";
import BuildSelectFormFromAnARray from "../../../../util/BuildSelectFormFromAnArray";
export default function TeamRewardsComponent({
  team,
  bestPlayerInTeam,
  setBestPlayerInTeam,
  updateTeamRewards
}) {
  const { teamName, teamCaptain, teamPlayers } = team;
  const teamPlayersList = Object.values(teamPlayers).map(
    (player) => player.playerName
  );

  const teamColors = teamName.includes("Red")
    ? { darkShade: "black", lightShade: "#ffd9d9" }
    : { darkShade: "black", lightShade: "lightgreen" };

  //Team Rewards Section
  const [goodList, setGoodList] = useState([]);
  const [greatList, setGreatList] = useState([]);
  const [excellentList, setExcellentList] = useState([]);

  const updateItemList = (item, newList) => {
    if (newList === "good") {
      setGoodList(addToList(item, goodList));
      setGreatList(removeFromList(item, greatList));
      setExcellentList(removeFromList(item, excellentList));
    } else if (newList === "great") {
      setGoodList(removeFromList(item, goodList));
      setGreatList(addToList(item, greatList));
      setExcellentList(removeFromList(item, excellentList));
    } else if (newList === "excellent") {
      setGoodList(removeFromList(item, goodList));
      setGreatList(removeFromList(item, greatList));
      setExcellentList(addToList(item, excellentList));
    } else {
      setGoodList(removeFromList(item, goodList));
      setGreatList(removeFromList(item, greatList));
      setExcellentList(removeFromList(item, excellentList));
    }
    console.log("Called update lists function", item, newList);
  };

  useEffect(() => {
    updateTeamRewards([[...goodList], [...greatList], [...excellentList]]);
    console.log("fired UseEffect");
  }, [updateTeamRewards, goodList, greatList, excellentList]);

  const addToList = (item, list) => {
    if (list.includes(item)) {
      return [...list];
    } else {
      return [...list, item];
    }
  };
  const removeFromList = (item, list) => {
    if (list.includes(item)) {
      const updatedList = [...list].filter((checkItem) => checkItem !== item);
      return [...updatedList];
    }
    return [...list];
  };

  function compare(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  const sortedTeamPlayers = teamPlayersList.sort(compare);

  return (
    <>
      <h4
        style={{
          padding: "10px 0px",
          borderTop: "2px solid black",
          color: `${teamColors.darkShade}`,
          backgroundColor: `${teamColors.lightShade}`
        }}
      >
        {teamName} Rewards{" "}
        <span style={{ fontSize: "smaller" }}>{teamCaptain}(C)</span>:
      </h4>
      <BuildSelectFormFromAnARray
        optionsArray={sortedTeamPlayers}
        selectLabel={`🏆 ${teamName}'s Best Player: ⭐x10`}
        stateVariable={bestPlayerInTeam}
        setStateVariable={setBestPlayerInTeam}
      />

      {bestPlayerInTeam
        ? sortedTeamPlayers
            .filter((i) => i !== bestPlayerInTeam)
            .map((player) => (
              <PlayerRewardsComponent
                key={player}
                playerName={player}
                updateTeamRewards={updateTeamRewards}
              />
            ))
        : ""}
    </>
  );
}
