import { useState, useEffect } from "react";
import "./styles.css";
import { readDocOnceFromRoot } from "./components/firebase/readDocOnceFromRoot";
import AppLogo from "./components/appSkeleton/siteHeader/AppLogo";
import GameRewardsComponent from "./components/appPages/eventsPage/gameRewardsPage/GameRewardsComponent";

export default function App() {
  const closed = false;
  const [loading, setLoading] = useState(true);
  const [eventInformation, setEventInformation] = useState({});
  const docId = "event195-teams";

  useEffect(() => {
    if (!closed) {
      readDocOnceFromRoot({
        collectionId: "SoccerMastersEventsCollection",
        docId: docId,
        setLoadingFunction: setLoading,
        updateObjectFunction: setEventInformation
      });
    }
  }, [closed]);

  if (closed)
    return (
      <div className="App">
        <section className="SiteHeader">
          <AppLogo />
        </section>
        <section className="MainContent">
          <h1>Voting is closed now. Play a game to rate 💪</h1>
        </section>
      </div>
    );
  if (loading) {
    return (
      <div className="App">
        <section className="SiteHeader">
          <AppLogo />
        </section>
        <section className="MainContent">
          <h1>Loading ya Qamar 🥰</h1>
        </section>
      </div>
    );
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const urlGameID = urlParams.get("gid");
    const { eventName, eventNumber, eventGames } = eventInformation;
    const gameNumber = urlGameID ? urlGameID : 0;
    const gameOne = eventGames[gameNumber];
    const { gameLocation, gameName, gameTeams } = gameOne;
    const teamOne = gameTeams[0];
    const teamTwo = gameTeams[1];
    return (
      <div className="App">
        <section className="SiteHeader">
          <AppLogo />
        </section>
        <section className="MainContent">
          <h2>
            {eventName} #{eventNumber}
          </h2>
          <h3>
            {gameName} @ {gameLocation}
          </h3>
          <p></p>
          <GameRewardsComponent
            teamOne={teamOne}
            teamTwo={teamTwo}
            docId={docId}
            gameNumber={gameNumber}
          />
        </section>
      </div>
    );
  }
}
