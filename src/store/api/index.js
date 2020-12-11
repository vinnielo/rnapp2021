import { firebase, usersCollection, storiesCollection } from "../../firebase";

export const registerUser = async ({ email, password }) => {
  try {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const { user } = response;
    const userProfile = {
      uid: user.uid,
      email: email,
    };
    await usersCollection.doc(user.uid).set(userProfile);
    return { isAuth: true, user: userProfile };
  } catch (error) {
    return { error: error.message };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const userProfile = await usersCollection.doc(response.user.uid).get();
    const data = userProfile.data();

    return { isAuth: true, user: data };
  } catch (error) {
    return { error: error.message };
  }
};

export const autoSignIn = () =>
  new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersCollection
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            resolve({ isAuth: true, user: snapshot.data() });
          });
      } else {
        return { isAuth: false, user: [] };
      }
    });
  });

export const logoutUser = () => firebase.auth().signOut();

/// stories

export const getStories = async () => {
  try{
    const response = await storiesCollection
    .where('public','==',1)
    .orderBy('createdAt')
    .limit(4)
    .get();

    const lastStoryVisible = response.docs[response.docs.length-1];
    const stories = response.docs.map( doc => ({
        id: doc.id,...doc.data()
    }));
    return { posts: stories,lastPostVisible: lastStoryVisible }
}catch(error){
    console.log(error);
    return error
}
};

export const getMoreStories = async (stories) => {
  let posts = [...stories.posts];
    let lastPostVisible = stories.lastPostVisible

    try {
        if(lastPostVisible){
            const response = await storiesCollection
            .where('public','==',1)
            .orderBy('createdAt')
            .startAfter(lastPostVisible)
            .limit(2)
            .get();

            lastPostVisible = response.docs[response.docs.length-1];     
            const newStories = response.docs.map( doc => ({
                id: doc.id,...doc.data()
            }));
            return { posts:[...stories.posts,...newStories], lastPostVisible}
        }
        return { posts,lastPostVisible}
    } catch(error){
        alert(error)
        return { posts,lastPostVisible}
    }
};