import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

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
  render() {
    let imageListContent;
    const {images} = this.props;
    if(images){
      imageListContent = (
        <div className={styles.root}>
          <GridList cellHeight={'auto'} cellWidhth style={{ margin: 0 }} cols={3}>
            {images.map(img => (
              <GridListTile key={img.largeImageURL} style={{height: 300}}>
                <img src={img.largeImageURL} alt={img.tags}/>
                <GridListTileBar
                  title={img.tags}
                  subtitle={<span>by: <strong>{img.user}</strong></span>}
                  actionIcon={
                    <IconButton className={styles.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      );
    }
    return <div>{imageListContent}</div>;
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
