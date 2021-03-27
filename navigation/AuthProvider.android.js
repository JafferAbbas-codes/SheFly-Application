// import React, {createContext, useEffect, useState} from 'react';
// import auth from '@react-native-firebase/auth';
// import {Children} from 'react';
// import {GoogleSignin} from '@react-native-community/google-signin';
// import {LoginManager, AccessToken} from 'react-native-fbsdk';
// import io from 'socket.io-client';

// export const AuthContext = createContext();
// const temp = "http://192.168.18.155:3000";
// const socket = io(temp);
// // console.log('socket',socket)
// export const AuthProvider = ({children}) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // useEffect(() => {
//   //   const socket = io();
//   //   console.log('socket',socket)
//   // }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         // socket,
//         user,
//         setUser,
//         loading,
//         login: async (email, password) => {
//           try {
//             setLoading(true);
//             await auth().signInWithEmailAndPassword(email, password);
//             setLoading(false);
//           } catch (e) {
//             setLoading(false);
//             console.log(e);
//           }
//         },
//         googleLogin: async () => {
//           try {
//             // Get the users ID token
//             console.log('here', user);
//             setLoading(true);
//             const {idToken} = await GoogleSignin.signIn();
//             console.log('idToken', idToken);
//             console.log('here2', user);
//             //Create Google credential with the token
//             if (idToken) {
//               const googleCredential = await auth.GoogleAuthProvider.credential(
//                 idToken,
//               );
//               console.log('googleCredential', googleCredential);
//               // Sign-in the user with the credential
//               const loggedIn = await auth().signInWithCredential(
//                 googleCredential,
//               );
//               console.log('loggedIn', loggedIn);
//               setLoading(false);
//               return loggedIn;
//             }
//             setLoading(false);
//             return;
//           } catch (e) {
//             setLoading(false);
//             console.log({e});
//           }
//         },
//         fbLogin: async () => {
//           try {
//             setLoading(true);
//             // Attempt login with permissions
//             console.log('inhere');
//             const result = await LoginManager.logInWithPermissions([
//               'public_profile',
//               'email',
//             ]);

//             if (result.isCancelled) {
//               throw 'User cancelled the login process';
//             }
//             console.log('result is ', result);

//             // Once signed in, get the users AccesToken
//             const data = await AccessToken.getCurrentAccessToken();

//             if (!data) {
//               throw 'Something went wrong obtaining access token';
//             }
//             console.log('data is ', data);

//             // Create a Firebase credential with the AccessToken
//             const facebookCredential = auth.FacebookAuthProvider.credential(
//               data.accessToken,
//             );
//             console.log('facebookCredential is ', facebookCredential);
//             // Sign-in the user with the credential
//             const signedIn = await auth().signInWithCredential(
//               facebookCredential,
//             );
//             console.log('signedIn is ', signedIn);
//             setLoading(false);
//           } catch (e) {
//             setLoading(false);
//             console.log({e});
//           }
//         },
//         register: async (email, password) => {
//           try {
//             setLoading(true);
//             await auth().createUserWithEmailAndPassword(email, password);
//             setLoading(false);
//           } catch (e) {
//             console.log(e);
//           }
//         },
//         logout: async () => {
//           try {
//             await auth().signOut();
//           } catch (e) {
//             console.log(e);
//           }
//         },
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
