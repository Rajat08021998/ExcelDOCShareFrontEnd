import React from "react";
import "./index.css";
import { Box, Button, Modal, Paper } from "@mui/material";
const PopupTable = ({ fileName, headings, closePopup, type = "view" }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        {/* <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: "10px",
            padding: "10px",
            "& > :not(style)": {
              m: 1,
              width: 1200,
              maxHeight: 540,

              boxShadow: 4,
            },
          }}
        >
          <Paper style={{ padding: "0px", overflow: "auto" }}>
            <div className="row">
              <div className="col-sm-6 offset-3" style={{ overflow: "auto" }}>
                <table
                  className="table"
                  style={{
                    borderCollapse: "collapse",
                    width: " 100%",
                    marginTop: "0px",
                    minWidth: "1130px",

                    background: "white",
                  }}
                >
                  <thead>
                    {headings.length ? (
                      headings.map((data, index) => {
                        if (data === "Action" && type && type === "view") {
                          return (
                            <th
                              style={{
                                backgroundColor: "#ccc",
                                color: "#fff",
                                position: "sticky",
                                fontSize: "16px",
                                fontWeight: "400",
                                textTransform: "uppercase",
                                padding: "5px 10px",
                                top: "0px",
                                textAlign: "left",
                              }}
                            ></th>
                          );
                        }
                        return (
                          <th
                            style={{
                              backgroundColor: "#ccc",
                              color: "#fff",
                              position: "sticky",
                              fontSize: "16px",
                              fontWeight: "400",
                              textTransform: "uppercase",
                              padding: "5px 10px",
                              top: "0px",
                              textAlign: "left",
                            }}
                          >
                            {data}
                          </th>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </thead>
                  <tbody>
                    {fileName.length ? (
                      fileName.map((i, index) => (
                        <tr key={index}>
                          {headings.length &&
                            headings.map((j) => {
                              if (
                                j === "Action" &&
                                (!type || type !== "view")
                              ) {
                                return (
                                  <td
                                    style={{
                                      borderBottom: "1px solid #ccc",
                                      textAlign: "left",
                                      fontWeight: "400",
                                      fontSize: "14px",

                                      background: "white",
                                      padding: "5px 10px",
                                    }}
                                  ></td>
                                );
                              }
                              return (
                                <td
                                  style={{
                                    borderBottom: "1px solid #ccc",
                                    textAlign: "left",
                                    fontWeight: "400",
                                    fontSize: "14px",

                                    background: "white",
                                    padding: "5px 10px",
                                  }}
                                >
                                  {i[`${j}`]}
                                </td>
                              );
                            })}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No Data Found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Paper>
        </Box>
        <div style={{ marginLeft: "50%" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={closePopup}
            className="close-button"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupTable;
