import React, { Component } from 'react';
import ImageResults from '../image-results/ImageResults';
import {database, auth} from "../../firebase/firebase";

class Favourites extends Component {

  constructor(props){
    super(props);
    this.state = {
      images: []
    };
    this.handleRemoveFavourite =this.handleRemoveFavourite.bind(this);
  }

  handleRemoveFavourite = (id) => {
    const uid = auth.currentUser.uid;
    database.ref(`/users/${uid}/favourites/${id}`).remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  };

  componentDidMount(){
    const uid = 'TpyYKrRSSzLuKcZ5MC78BmHbz162';
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
  }

  render() {
    return (
      <div>
        <h1 className="favorite_header">FAVOURITES</h1>
        <ImageResults images={this.state.images} position={'favouritesPage'} handleRemoveFavourite = {this.handleRemoveFavourite}/>
      </div>
    );
  }
}

export default Favourites;