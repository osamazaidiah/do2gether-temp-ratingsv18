import firebase from "firebase";

export const updateFieldInDoc = async ({
  raterId = "newRater",
  collectionId,
  docId,
  documentToUpdate
}) => {
  const {
    raterName,
    team1Rewards,
    team2Rewards,
    kingOfTheMatch
  } = documentToUpdate;
  const team1RewardsToUpload = [
    {
      good: [...team1Rewards[0]],
      great: [...team1Rewards[1]],
      top: [...team1Rewards[2]],
      bestPlayerInTeam: [team1Rewards[3]]
    }
  ];
  const team2RewardsToUpload = [
    {
      good: [...team2Rewards[0]],
      great: [...team2Rewards[1]],
      top: [...team2Rewards[2]],
      bestPlayerInTeam: [team2Rewards[3]]
    }
  ];

  const db = firebase.firestore();
  const documentRef = db.collection(collectionId).doc(docId);
  documentRef
    .update({
      [`rewards.${raterId}`]: {
        raterName,
        kingOfTheMatch,
        team1Rewards: [],
        team2Rewards: []
      }
    })
    .then(
      documentRef.update({
        [`rewards.${raterId}.team1Rewards`]: firebase.firestore.FieldValue.arrayUnion(
          ...team1RewardsToUpload
        )
      })
    )
    .then(
      documentRef.update({
        [`rewards.${raterId}.team2Rewards`]: firebase.firestore.FieldValue.arrayUnion(
          ...team2RewardsToUpload
        )
      })
    )
    .then(() => {
      console.log("Thank You! Your rewards were successfully saved!");
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

export default updateFieldInDoc;
