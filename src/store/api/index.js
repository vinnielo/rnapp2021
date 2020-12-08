import { firebase, usersCollection } from '../../firebase';
import "firebase/firestore";




export const registerUser =  async ({ email,password }) =>{
    // firebase.auth()
    // .createUserWithEmailAndPassword(email,password)
    // .then( (response)=>{
    //     const {user} = response;
 
    //     const userProfile = {
    //         uid: user.uid,
    //         email: email
    //     };
        
        
    //    db.collection('users').add(userProfile).then(function(docRef) {
    //     console.warn("Document written with ID: ", docRef.id).catch(err=>{
    //         if(err) throw err
    //     });

      
    // })
            
       
        
    //     return { isAuth: true, 
    //         //         // user:userProfile
    //              }
       
    // })

    try{
        const response = await firebase.auth()
        .createUserWithEmailAndPassword(email,password);

        const {user} = response;
        const DB = firebase.database();
        const userProfile = {
            uid: user.uid,
            email: email
        };
        await DB.ref("users/" + user.uid).set(userProfile)
        return { 
            isAuth: true, 
            user:userProfile
         }
    }catch(error){
        return { error:error.message }
    }
}

const readData = ()=>{
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value')
}

export const loginUser = async({ email,password }) =>{
    try{
        const response =await firebase.auth()
        .signInWithEmailAndPassword(email,password);
        // once the user logs in the data on the RTDB needs to be pushed to the INITIAL_STATE.
        // const userProfile = await usersCollection.doc(response.user.uid).get();
        const data = readData()
         console.warn(data)

        return { 
            isAuth: true,
             user:data 
            }
    }catch(error){
        return { error:error.message }
    }
}