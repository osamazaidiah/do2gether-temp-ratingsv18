import firebase from "firebase";

const setDocWithIdInFirestore = async ({
  collectionId = "new collection",
  docId,
  document
}) => {
  const db = firebase.firestore();
  const documentRef = db.collection(collectionId).doc(docId);

  await documentRef
    .set(document, { merge: true })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export default setDocWithIdInFirestore;
