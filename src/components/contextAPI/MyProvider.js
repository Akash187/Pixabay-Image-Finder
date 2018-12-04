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

  componentDidMount(){
    this.subscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({
          name: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          email: user.email
        });
        localStorage.setItem("authSecret", JSON.stringify({uid : user.uid}));
      } else {
        // No user is signed in.
        this.setState({
          name: '',
          uid: '',
          photoURL: '',
          email: ''
        });
        localStorage.setItem("authSecret", JSON.stringify({uid : 'null'}));
        //console.log("sign out successful!");
      }
    });
  }

  componentWillUnmount(){
    this.subscribed();
    //console.log("unsbscribed");
  }

  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        signInUsingGoogle: async () => {
          try{
            await auth.signInWithPopup(provider);
          }catch(error){
            // Handle Errors here.
          }
        },
        signOut: async () => {
          try{
            await auth.signOut();
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
