import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';
import database from "../../firebase/firebase";
import runtimeEnv from '@mars/heroku-js-runtime-env';

//variables to Manage State Between routes
let images = [];
let searchText = '';
let amount = 15;

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 10,
    paddingRight: 10
  },
  formControl: {
    margin: 8,
    minWidth: 120,
  },
};

const env = runtimeEnv();

  class Search extends React.Component {

  state = {
    searchText: searchText,
    amount: amount,
    apiUrl: 'https://pixabay.com/api',
    apiKey: process.env.REACT_APP_PIXABAY_API_KEY,
    images: images
  };

  updateDefaultValue = () => {
    images = this.state.images;
    searchText = this.state.searchText;
    amount = this.state.amount;
  };

  queryRequest = () => {
    axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
      .then((res) =>
        this.setState({images: res.data.hits}, this.updateDefaultValue))
      .catch(err => console.log(err));
  };

  onTextChange = (event) => {
    this.setState({searchText: event.target.value}, this.queryRequest);
    this.updateDefaultValue();
  };

  onAmountChange = (event) => {
    this.setState({ amount: event.target.value }, this.queryRequest);
    this.updateDefaultValue();
  };

  render(){

    //console.log(this.state.images);
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.container}>
          <TextField
            id="standard-name"
            label="Search For Images"
            className={classes.textField}
            value={this.state.searchText}
            onChange={this.onTextChange}
            margin="normal"
            fullWidth={true}
          />
        </div>
        <div className={classes.container}>
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Amount</InputLabel>
          <Select
            onChange={this.onAmountChange}
            value={this.state.amount}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </Select>
          </FormControl>
        </div>
        <br/>
        {this.state.images.length > 0 ? (<ShowImages images={this.state.images}/>) : null}
      </div>
    );
  }
}

class ShowImages extends React.Component{

  constructor(props){
    super(props);
    this.handleAddFavourite = this.handleAddFavourite.bind(this);
  }

  handleAddFavourite = (user, tags, url) => {
    database.ref('favourites').push({
      user,
      tags,
      url
    }).then((success) => {
      console.log(`Saved Data ${success}`);
    });
  };

  render(){
    return (
      <div>
        <ImageResults images={this.props.images} handleAddFavourite={this.handleAddFavourite} position={'mainPage'}/>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);