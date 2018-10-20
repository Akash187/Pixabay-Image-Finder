import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";

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


export default AlertDialog;