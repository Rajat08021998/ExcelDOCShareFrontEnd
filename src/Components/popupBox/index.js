import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [formObject, setFormObject] = useState({});
  const maxL = props.fileName.length+1
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      let formObj = {};
      props.headings &&
        props.headings.map((i) => {
          formObj[i] = i==="S.No."?maxL:"";
        });
      setFormObject(formObj);
    }
    return () => {
      unmounted = true;
    };
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e, i) => {
    let formData = { ...formObject };
    formData[i] = e.target.value;
    setFormObject(formData);
  };

  const handleOnSave = () => {
    // console.log("=====>", formObject);
    props.formFillData && props.formFillData(formObject);
    handleClose()
  };
// console.log("===========>",formObject);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Enter Data
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Enter the New Value in Table Below are the Fields given.
          </DialogContentText>
          {props.headings &&
            props.headings.map((i, index) => {
              // console.log("====>LOg",formObject[i]);
              return (i !== "Action" ?
              
                <>
                  {" "}
                
                  <TextField
                    autoFocus
                    margin="dense"
                    id={`${i}_${index}`}
                    label={`${i}`}
                    value={i==="S.No."?maxL:formObject[i]}
                    type={i==="S.No."?"number":"text"}
                    fullWidth
                    variant="standard"
                    disabled={i === "S.No." ? true : false}
                    onChange={(e) => {
                      handleOnChange(e, i);
                    }}
                  />
                </>:<></>
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              handleOnSave();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
