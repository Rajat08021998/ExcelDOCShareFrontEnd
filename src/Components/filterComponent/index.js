import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { ReactComponent as Filter } from "./../../images/filter.svg";

const FilterPopup = ({ columns, data, applyFilter, ...props }) => {
  const [selectedColumn, setSelectedColumn] = useState(
    props.selectedColumn ? props.selectedColumn : ""
  );
  const [filterValues, setFilterValues] = useState(
    props.filterValues ? props.filterValues : {}
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeColumn = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleChangeFilterValue = (event) => {
    const { name, value } = event.target;
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [name]: value,
    }));
  };

  const handleApplyFilter = () => {
    // Apply the filter logic based on the selected column and filter values
    const filtered = data.filter((row) =>
      row[selectedColumn]
        .toLowerCase()
        .includes(filterValues[selectedColumn]?.toLowerCase())
    );
    applyFilter(filtered);
    handleClose();
  };

  const handleReset = () => {
    setSelectedColumn("");
    setFilterValues({});
    props.handleResetTable();
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={<Filter style={{ fill: "white" }} />}
        style={{
          marginLeft: "20px",
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        Open Filter
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter Table</DialogTitle>
        <DialogContent>
          <Select
            value={selectedColumn}
            onChange={handleChangeColumn}
            label={`Filter by Selecting Column`}
          >
            <MenuItem value="">Select a column</MenuItem>
            {columns.map((column) => (
              <MenuItem key={column} value={column}>
                {column}
              </MenuItem>
            ))}
          </Select>
          {selectedColumn && selectedColumn !== "" && (
            <TextField
              label={`Filter by ${selectedColumn}`}
              name={selectedColumn}
              value={filterValues[selectedColumn] || ""}
              onChange={handleChangeFilterValue}
              style={{ verticalAlign: "bottom" }}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleApplyFilter} color="primary">
            Apply
          </Button>

          <Button onClick={handleReset} color="primary">
            Reset
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterPopup;
