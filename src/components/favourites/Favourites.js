import React, { Component } from 'react';
import ImageResults from '../image-results/ImageResults';
import {database, auth} from "../../firebase/firebase";
import {Redirect} from "react-router-dom";

class Favourites extends Component {

  constructor(props){
    super(props);
    this.state = {
      images: []
    };
    this.handleRemoveFavourite =this.handleRemoveFavourite.bind(this);
  }

  handleRemoveFavourite = (context,id) => {
    const uid = auth.currentUser.uid;
    database.ref(`/users/${uid}/favourites/${id}`).remove()
      .then(function() {
        //Remove succeeded.
        context.handleClickOpenSnackBar('Image Removed from Favourite!');
      })
      .catch(function(error) {
        //Remove failed
        context.handleClickOpenSnackBar('Unable to Remove from Favourite!');
      });
  };

  componentDidMount(){
    this.subscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        database.ref(`/users/${uid}/favourites`)
          .on('value', (snapshot) => {
            const favourites = [];
            snapshot.forEach((childSnapshot) => {
              favourites.push({
                id: childSnapshot.key,
                webformatURL: childSnapshot.val().url,
                ...childSnapshot.val()
              })
            });
            this.setState({images: favourites});
          });
      } else {
        // No user is signed in.
        this.props.history.push('/');
      }
    });
  }

  componentWillUnmount(){
    this.subscribed();
    //console.log("unsbscribed");
  }

  render() {
    return (
       <div>
         {
           (JSON.parse(localStorage.getItem("authSecret")).uid === 'null') ? (
             <Redirect to='/'/>
           ) : (
             <div>
               <h1 className="favorite_header">FAVOURITES</h1>
               <p>{this.state.uid}</p>
               <ImageResults images={this.state.images} position={'favouritesPage'} handleRemoveFavourite = {this.handleRemoveFavourite}/>
             </div>
           )
         }
       </div>
    );
  }
}

export default Favourites;