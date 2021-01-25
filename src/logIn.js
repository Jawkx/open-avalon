const logIn = (db, uid, setSignedIn, setPopUpMessage) => {
  const userDbRef = db.collection("usersInfo");
  userDbRef
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data.gameID) {
          setPopUpMessage(
            "You are already in game" +
              data.gameID +
              ", do you want to continue or Log Out"
          );
        } else {
          setSignedIn(true);
        }
      } else {
        //User not exist
        userDbRef
          .doc(uid)
          .set({
            state: "none",
            gameID: null,
          })
          .then(setSignedIn(true));
      }
    });
};

export default logIn;
