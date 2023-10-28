import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { useContext } from "react";
import { SocketContext } from "../../socket/socket";
import { getApiUrl } from "../../apiUtils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const apiUrl = getApiUrl();

export default function SelectDialog(props) {
  //   const [open, setOpen] = React.useState(false);
  //   const [age, setAge] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(props.anchorEl);
  const [names, setNames] = React.useState([]);
  const socket = useContext(SocketContext);

  const open = Boolean(anchorEl);
  //   const handleChange = (event) => {
  //     setAge(Number(event.target.value) || '');
  //   };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  React.useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setNames(props.userList);
      setPersonName(
        props.selectObj && props.selectKey && props.selectObj[props.selectKey]
          ? props.selectObj[props.selectKey]
          : []
      );
    }
    return () => {
      unmounted = true;
    };
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleOnSubmit = () => {
    // console.log("========ON Submit======>", props.selectKey);
    if(props.selectObj){
    let id = props.selectObj["_id"]?props.selectObj["_id"]:null
    const body = {
        DOC_NAME: props.selectObj["DOC_NAME"] ? props.selectObj["DOC_NAME"] : "",
        [props.selectKey]:personName,
        UPDATED_BY:props.user
      };
      
      if (
        body    
      ) {
        axios
          .put(`${apiUrl}/doc/list/${id}`, body).then(res=>res.data)
          .then((res) => {
            if (res.status === "success" && res.result) {

              alert("Doc Updated successfully");
            } else alert("Doc Updation Unsuccessfully");
          })
          .catch((err) => alert("Something went wrong" + err));
      } else {
        alert("No Data to Save");
      }
    }else{
        alert("Error in Update")
    }
    props.handleSelectClose()
  };

  const getStyles = (name, personName, theme) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  return (
    <div>
      {/* <Button onClick={handleClickOpen}>Open select dialog</Button> */}
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={props.handleSelectClose}
      >
        <DialogTitle>{props.selectType}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">List</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleSelectClose}>Cancel</Button>
          <Button onClick={handleOnSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
