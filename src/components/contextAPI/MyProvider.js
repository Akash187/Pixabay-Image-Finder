import React, {Component} from 'react';
import {auth, provider} from "../../firebase/firebase";

// first we will make a new context
const MyContext = React.createContext({});

// Then create a provider Component
class MyProvider extends Component {
  state = {
    name: '',
    uid: '',
    photoURL: '',
    email: '',
    openSnackbar: false,
    snackbarMessage: ''
  };

  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        signInUsingGoogle: async () => {
          try{
            const result = await auth.signInWithPopup(provider);
            let user = result.user.providerData[0];
            this.setState({
              name: user.displayName,
              uid: user.uid,
              photoURL: user.photoURL,
              email: user.email
            });
          }catch(error){
              // Handle Errors here.
              let errorCode = error.code;
              let errorMessage = error.message;
              //console.log(`Sign In Error: ${errorCode} ${errorMessage}`);
          }
        },
        signOut: async () => {
          try{
            await auth.signOut();
            this.setState({
              name: '',
              uid: '',
              photoURL: '',
              email: ''
            });
            //console.log("sign out successful!")
          }catch(error){
            //console.log(`SignOut Error : ${error}`)
          }
        },
        handleClickOpenSnackBar: (msg) => {
          this.setState({snackbarMessage: msg, openSnackbar: true});
        },
        handleCloseSnackBar: () => {
          //console.log('close Snackbar fired');
          this.setState({openSnackbar: false});
        }
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export {
  MyProvider,
  MyContext
};
