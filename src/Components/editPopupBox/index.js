import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditFormDialog(props) {
  const [open, setOpen] = useState(false);
  const [formObject, setFormObject] = useState({});

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      if (props.isEdit && props.isEdit === true) {
        setOpen(props.isEdit);
        props.dataToEdit && setFormObject({ ...props.dataToEdit });
      }
    }

    return () => {
      unmounted = true;
    };
  }, [props.isEdit]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    props.setDataToEdit(null);
    props.setIsEdit(false);
    setOpen(false);
  };

  const handleOnChange = (e, i) => {
    let formData = { ...formObject };
    formData[i] = e.target.value;
    setFormObject(formData);
  };

  const handleOnUpdate = () => {
    // console.log("=====>", formObject);
    props.editFormData && props.editFormData(formObject);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          {props.headings &&
            props.headings.map((i, index) => {
              return i !== "Action" ? (
                <>
                  {" "}
                  <TextField
                    autoFocus
                    margin="dense"
                    id={`${i}_${index}`}
                    label={`${i}`}
                    value={formObject[i]}
                    type={i === "S.No." ? "number" : "text"}
                    fullWidth
                    variant="standard"
                    disabled={i === "S.No." ? true : false}
                    onChange={(e) => {
                      handleOnChange(e, i);
                    }}
                  />
                </>
              ) : (
                <></>
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              handleOnUpdate();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
