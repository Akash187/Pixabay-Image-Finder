import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart as farFaHeart} from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasFaHeart} from '@fortawesome/free-solid-svg-icons';

library.add(fasFaHeart, farFaHeart);


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
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
              <GridListTile className={'listTile'} key={img.largeImageURL}>
                <img src={img.largeImageURL} alt={img.tags}/>
                <GridListTileBar
                  title={img.tags}
                  subtitle={<span>by: <strong>{img.user}</strong></span>}
                  actionIcon={
                    <IconButton onClick={() => this.handleClickOpen(img.largeImageURL)} className={styles.icon}>
                      <FontAwesomeIcon icon={['far', 'heart']} size="lg"/>
                    </IconButton>
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

let AlertDialog = (props) => {
  return (
    <div>
      <Dialog open={props.open}
              onClose={props.handleClose}>
        <DialogContent>
          <img src={props.ImageURL} style={{width:"100%", height:"100%"}} alt=""/>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
