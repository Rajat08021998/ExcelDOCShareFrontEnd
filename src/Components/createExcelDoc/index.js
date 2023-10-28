import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactComponent as Add } from "./../../images/addButton.svg";
import { ReactComponent as Delete } from "./../../images/deleteButton.svg";
import { IconButton } from "@mui/material";
import zIndex from "@material-ui/core/styles/zIndex";
import axios from "axios";
import { getApiUrl } from "../../apiUtils";

const apiUrl = getApiUrl();
export default function CreateExcelDocDialog(props) {
  const [open, setOpen] = useState(false);
  const [formObject, setFormObject] = useState({});
  const [inputFields, setInputFields] = useState([]);
  const [headingCount, setHeadingCount] = useState(0);
  const [docName, setDocName] = useState("");

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setOpen(true);
    }

    return () => {
      unmounted = true;
    };
  }, []);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    props.setOpenCreateDoc(false);
  };

  const handleOnChange = (e, id) => {
    let allInputs = [...inputFields];
    let searchIndex = allInputs.findIndex((i) => i.id === id);
    // console.log("SearchIndex===>", searchIndex);
    allInputs[searchIndex]["labelValue"] = e.target.value;
    setInputFields([...allInputs]);
  };

  const handleOnDocName = (e) => {
    setDocName(e.target.value);
  };

  const handleOnCreate = () => {
    // console.log("=====>", inputFields, docName);
    let headings = inputFields.map((i) => i.labelValue);
    if (headings.length > 0) {
      const body = {
        GROUP_ID: "123",
        GROUP_NAME: "TEST GROUP",
        DOC_NAME: docName ? docName : "Test.xls",
        DOC_OBJ: [],
        DOC_LABEL: headings,
        CREATED_BY: props.user,
      };
      // console.log("=====>",body);
      if (
        body.DOC_NAME &&
        body.DOC_LABEL &&
        body.DOC_LABEL.length > 0
      ) {
        axios
          .post(`${apiUrl}/doc`, body)
          .then(res=>res.data)
          .then((res) => {
            if (res.status === "success" && res.result) {
              alert("Doc Added successfully");
              props.handleAfterCreatedDoc(res.result);
              handleClose();
            } else alert("Doc Addtion Unsuccessfully");
          })
          .catch((err) => alert("Something went wrong" + err));
      } else {
        alert("No Data to Save");
      }
    }else{
      alert("Please Enter the Doc name and heading")
    }
  };

  const addFields = () => {
    let newField = { labelValue: "", id: headingCount };
    setHeadingCount(headingCount + 1);
    // console.log("n=======>", inputFields);
    setInputFields([...inputFields, newField]);
  };

  const handleDeleteLabel = (id) => {
    let allInputs = [...inputFields];
    allInputs.splice(id, 1);
    setInputFields([...allInputs]);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Excel Doc</DialogTitle>
        <DialogContent>
          <DialogContentText style={{paddingBottom:"10px"}}>
            This Popup is used to Create User Own Excel Document Within the Application

          </DialogContentText>
          <TextField
              fullWidth
              label="Enter the Name of Doc "
              id="fullWidth"
              value={docName}
              onChange={(e) => {
                handleOnDocName(e);
              }}
              
            />
          <DialogContentText>
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add style={{fill:"white"}}/>}
                onClick={addFields}
              >
                Add Heading
              </Button>
            </div>
          </DialogContentText>
          {inputFields &&
            inputFields.map((i, index) => {
              return (
                <div style={{ marginTop: "10px" }}>
                  <TextField
                    id={`label_${i.id}`}
                    label="Heading Label"
                    variant="outlined"
                    value={i.labelValue}
                    onChange={(e) => {
                      handleOnChange(e, i.id);
                    }}
                  />
                  <IconButton
                    aria-label="delete"
                    title="Delete Heading Label"
                    onClick={(e) => handleDeleteLabel(index)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              handleOnCreate(e);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
