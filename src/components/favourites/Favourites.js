import React, { Component } from 'react';
import ImageResults from '../image-results/ImageResults';
import {database, auth} from "../../firebase/firebase";
import {MyContext} from '../contextAPI/MyProvider';
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
        //console.log("Remove succeeded.");
        context.handleClickOpenSnackBar('Image Removed from Favourite!');
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
        context.handleClickOpenSnackBar('Unable to Remove from Favourite!');
      });
  };

  componentDidMount(){
    try{
      const uid = auth.currentUser.uid;
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
          //console.log(favourites);
          this.setState({images: favourites});
        });
    }catch(err) {
      this.setState({images: []});
    }
  }

  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <React.Fragment>
            { (context.state.uid === '') ? (
              <Redirect to='/'/>
            ) : (
              <div>
                <h1 className="favorite_header">FAVOURITES</h1>
                <ImageResults images={this.state.images} position={'favouritesPage'} handleRemoveFavourite = {this.handleRemoveFavourite}/>
              </div>
            )}
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Favourites;