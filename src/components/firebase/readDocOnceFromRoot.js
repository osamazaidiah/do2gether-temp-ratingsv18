import firebase from "firebase";

export const readDocOnceFromRoot = async ({
  collectionId,
  docId,
  setLoadingFunction,
  updateObjectFunction
}) => {
  setLoadingFunction(true);
  const db = firebase.firestore();
  const documentRef = db.collection(collectionId).doc(docId);
  await documentRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const firestoreDataAcquired = doc.data();
        // setEventName(firestoreDataAcquired.eventName);
        updateObjectFunction(firestoreDataAcquired);
      } else {
        // doc.data() will be undefined in this case
        return console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  setLoadingFunction(false);
};
