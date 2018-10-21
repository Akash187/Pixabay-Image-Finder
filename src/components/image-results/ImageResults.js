import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart as farFaHeart} from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasFaHeart, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import AlertDialog from './AlertDialog';
library.add(fasFaHeart, farFaHeart, faTrashAlt);

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  }
});

class ImageResults extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false,
      currentImage: ''
    };
  }

  handleClickOpen = (imageUrl) => {
    this.setState({ open: true , currentImage: imageUrl});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const {images} = this.props;
    if(images){
      imageListContent = (
        <div className={styles.root}>
          <GridList cellHeight={'auto'} style={{ margin: 0 }} cols={4}>
            {images.map(img => (
              <GridListTile className={'listTile'} key={img.id ? img.id : img.largeImageURL}>
                <img src={img.largeImageURL} alt={img.tags} onClick={() => this.handleClickOpen(img.largeImageURL)}/>
                <GridListTileBar
                  title={img.tags}
                  subtitle={<span>by: <strong>{img.user}</strong></span>}
                  actionIcon={
                    this.props.position === 'mainPage' ?
                      (
                      <IconButton onClick={
                        () => this.props.handleAddFavourite(img.user, img.tags , img.largeImageURL)
                      }>
                      <FontAwesomeIcon icon={['far', 'heart']} color="red" size="1x"/>
                    </IconButton>) :
                      (
                      <IconButton onClick={
                        () => this.props.handleRemoveFavourite(img.id)
                      }>
                        <FontAwesomeIcon icon="trash-alt" color="brown" size="1x"/>
                      </IconButton>
                    )
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      );
    }
    return <div>
      {imageListContent}
      <AlertDialog open={this.state.open} ImageURL={this.state.currentImage} handleClose={this.handleClose}/>
    </div>;
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
