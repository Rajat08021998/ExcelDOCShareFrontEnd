import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(props.anchorEl);
  const [data, setData] = React.useState(
    props.labelData ? props.labelData : []
  );
  React.useEffect(() => {
    // console.log("------------>", props.anchorEl);
    setAnchorEl(props.anchorEl);
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
    setData([]);
    props.handleLabelClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: 180,
            minHeight:100,
            overflow: "auto",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          {data &&
            data.length > 0 &&
            data.map((label) => {
              return <label key={label}>{label}</label>;
            })}
        </div>
      </Popover>
    </div>
  );
}
