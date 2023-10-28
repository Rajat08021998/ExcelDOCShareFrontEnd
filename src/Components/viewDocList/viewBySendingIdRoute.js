import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import FolderIcon from '@mui/icons-material/Folder';
// import DeleteIcon from '@mui/icons-material/Delete';
import { ReactComponent as FolderIcon } from "./../../images/excelIcon.svg";
import { ReactComponent as DeleteIcon } from "./../../images/deleteButton.svg";
import { ReactComponent as View } from "./../../images/view.svg";
import { useState } from "react";
import CircularIndeterminate from "../circularLoader";
import axios from "axios";
import { useEffect } from "react";
import { Button, Modal, Paper } from "@mui/material";
import BasicPopover from "../popover";
import { ReactComponent as Add } from "./../../images/addButton.svg";
import { ReactComponent as Edit } from "./../../images/edit.svg";
import CreateExcelDocDialog from "../createExcelDoc";
import { useHistory } from "react-router-dom";
import EditUpdatePage from "../editUpdatePage";
import SelectDialog from "./SelectDialog";
import { socket, SocketContext } from "./../../socket/socket";
import { useContext } from "react";
import { getApiUrl } from "../../apiUtils";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const apiUrl = getApiUrl();
export default function ViewBySendingIdRoute(props) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [labelOpen, setLabelOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectObj, setSelectObj] = useState(null);
  const [selectType, setSelectType] = useState("");
  const [selectKey, setSelectKey] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [labelData, setLabelData] = useState([]);
  const [openCreateDoc, setOpenCreateDoc] = useState(false);
  const [createdHeadings, setCreatedHeadings] = useState([]);
  const [editDoc, setEditDoc] = useState(false);
  const [editDataObj, setEditDataObj] = useState([]);
  const [editHeadingObj, setEditHeadingObj] = useState([]);
  const [wholeObj, setWholeObj] = useState({});
  const [allLoggedUser, setAllLoggedUser] = useState([]);
  const viewsocket = useContext(SocketContext);
  const [listHeadings, setListHeadings] = useState([
    {
      label: "File Name",
      key: "DOC_NAME",
      width: "600",
      sort: { enable: true, order: "asc", type: "s", default: false },
    },
    {
      label: "Edit User List",
      key: "EDIT_LIST",
      width: "520",
      sort: { enable: true, order: "asc", type: "s", default: false },
    },
    {
      label: "View User List",
      key: "VIEW_LIST",
      width: "520",
      sort: { enable: true, order: "asc", type: "s", default: false },
    },
    {
      label: "Updated By",
      key: "UPDATED_BY",
      width: "520",
      sort: { enable: true, order: "asc", type: "s", default: false },
    },
    {
      label: "Updated On",
      key: "UPDATED_ON",
      width: "520",
      sort: { enable: true, order: "asc", type: "s", default: false },
    },
    {
      label: "Created By",
      key: "CREATED_BY",
      width: "520",
      sort: { enable: true, order: "asc", type: "s", default: false },
    },
    {
      label: "Created On",
      key: "CREATED_ON",
      width: "520",
      sort: { enable: true, order: "asc", type: "s", default: false },
    },
    {
      label: "Action",
      key: "Action",
      width: "520",
      sort: { enable: true, order: "asc", type: "s", default: false },
    },
  ]);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setLoading(true);
      let obj = localStorage.getItem("LoginUser");
      let userObj = JSON.parse(obj);
      if (userObj && userObj.loggedIn === true) {
        setUser(userObj.userId);
        getData(userObj);
      } else {
        alert("Please Login To Access this Page!");
        history.push("/");
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);
  const getData = (user) => {
    axios
      .get(`${apiUrl}/doc/main/${user.userId}`, {})
      .then((res) => res.data)
      .then((res) => {
        // console.log("Data===>", res);
        if (res.status === "success" && res.result && res.result.length > 0) {
          // console.log("Data Added sucessfull");
          setData(res.result);
          setLoading(false);
          handleAllUserList(user.userId);
        } else {
          // console.log("Data Added Unsucessfull");
          setLoading(false);
          setData(res.result);
        }
      })
      .catch((err) => {
        alert("Something went wrong" + err);
        setLoading(false);
      });
  };
  const handleLabelOpen = () => setLabelOpen(true);
  const handleSelectBoxOpen = () => setSelectOpen(true);
  const handleLabelClose = () => {
    setLabelOpen(false);
    setAnchorEl(null);
    setLabelData([]);
  };

  const handleSelectClose = () => {
    setAnchorEl(null);
    setSelectOpen(false);
    setSelectObj(null);
    setSelectType("");
    setSelectKey("");
    window.location.reload(true);
  };

  const handleViewLabel = (e, labelArray, id) => {
    setAnchorEl(e.currentTarget);
    setLabelData(labelArray);
  };

  const handleSelectBox = (e, obj, type, key, id) => {
    setAnchorEl(e.currentTarget);
    setSelectObj(obj);
    setSelectType(type);
    setSelectKey(key);
  };

  const handleDelete = (id) => {
    // console.log("---------->", id);
    setLoading(true);
    axios
      .delete(`${apiUrl}/doc/${id}`, {})
      .then((res) => res.data)
      .then((res) => {
        // console.log("Data===>", res);
        if (res.status === "success" && res.result) {
          const filteredData = data.filter((item) => item._id !== id);
          const deletedDoc = data.filter((item) => item._id === id);

          setData(filteredData);
          if (deletedDoc && deletedDoc.length > 0) {
            let receivers = [
              ...deletedDoc[0].EDIT_LIST,
              ...deletedDoc[0].VIEW_LIST,
            ];
            let receiverArr = [...new Set(receivers)];
            if (receiverArr && receiverArr.length > 0) {
              viewsocket?.emit("deleteNotification", {
                updatedBy: deletedDoc[0].CREATED_BY,
                receiverName: receiverArr,
                docName: deletedDoc[0].DOC_NAME,
              });
            }
          }

          alert("Data Deleted sucessfull");
          setLoading(false);
        } else {
          // console.log("Data Added Unsucessfull");
        }
      })
      .catch((err) => {
        alert("Something went wrong" + err);
        console.log("Data Added Unsucessfull", err);
        setLoading(false);
      });
  };

  const handleCreateDoc = () => {
    setOpenCreateDoc(true);
  };

  const handleAfterCreatedDoc = (obj) => {
    if (obj && Object.keys(obj).length > 0) {
      let newData = [...data];
      newData.push(obj);
      setData(newData);
    }
  };

  const handleAddDoc = () => {
    history.push("/add");
  };

  const handleEditDoc = (obj) => {
    setEditDataObj(obj.DOC_OBJ);
    setEditHeadingObj(obj.DOC_LABEL);
    setWholeObj(obj);
    setEditDoc(true);
  };

  const handleUpdateDoc = (rowData) => {
    let wholeObj = rowData,
      editDataObj = rowData.DOC_OBJ,
      editHeadingObj = rowData.DOC_LABEL;
    let dataObj = editDataObj,
      headingObj = editHeadingObj,
      obj = wholeObj;
    const action = "MAIN";
    history.push({
      pathname: `/updateTable/${rowData._id}`,
      state: { obj, dataObj, headingObj, user, action },
    });
  };
  const handleAllUserList = (user) => {
    axios
      .get(`${apiUrl}/user/getAll`, {})
      .then((res) => res.data)
      .then((res) => {
        // console.log("Data===>", res);
        if (res.status === "success" && res.result && res.result.length > 0) {
          // console.log("Data Added sucessfull");
          let list = [...res.result];
          list = list.filter((e) => e !== user);
          setAllLoggedUser(list);
        } else {
          // console.log("Data Added Unsucessfull");
        }
      })
      .catch((err) => {
        // console.log("Something went wrong" + err);
        setLoading(false);
      });
  };
  return (
    <>
      {!editDoc ? (
        <Box sx={{ flexGrow: 1 }}>
          <h2 style={{ marginLeft: "10px" }}>List of Doc Added By User</h2>
          <div
            style={{
              margin: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add style={{ fill: "white" }} />}
              onClick={handleAddDoc}
              style={{ alignContent: "center", alignItems: "center" }}
            >
              Upload Doc
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<Add style={{ fill: "white" }} />}
              onClick={handleCreateDoc}
              style={{ marginLeft: "20px" }}
            >
              Create New Doc
            </Button>
          </div>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              margin: "10px",
              padding: "10px",
              "& > :not(style)": {
                m: 1,
                width: 1800,
                maxHeight: 560,

                boxShadow: 4,
              },
            }}
          >
            <Paper style={{ padding: "0px", overflow: "auto" }}>
              {loading ? (
                <CircularIndeterminate />
              ) : (
                <>
                  {data && data.length > 0 ? (
                    <div className="tableWrapper" style={{ overflow: "auto" }}>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: " 100%",
                          marginTop: "0px",
                          minWidth: "1130px",

                          background: "white",
                        }}
                      >
                        <thead>
                          <tr>
                            {listHeadings &&
                              listHeadings.map((i) => {
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
                                    {i["label"]}
                                  </th>
                                );
                              })}
                          </tr>
                        </thead>
                        <tbody style={{ background: "lightgrey" }}>
                          {data &&
                            data.length > 0 &&
                            data.map((i, index) => (
                              <tr key={index}>
                                {listHeadings.length &&
                                  listHeadings.map((j) => {
                                    if (j["label"] === "Action") {
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
                                          <IconButton
                                            aria-label="delete"
                                            onClick={(e) => {
                                              handleLabelOpen();
                                              handleViewLabel(
                                                e,
                                                i.DOC_LABEL,
                                                index
                                              );
                                            }}
                                          >
                                            <View title="View Label" />
                                          </IconButton>

                                          <IconButton
                                            aria-label="delete"
                                            title="Delete Tabel"
                                            onClick={(e) => {
                                              handleDelete(i._id);
                                            }}
                                          >
                                            <DeleteIcon />
                                          </IconButton>

                                          <IconButton
                                            aria-label="Edit"
                                            title="Edit Tabel Data"
                                            onClick={(e) => {
                                              // handleEditDoc(i);
                                              handleUpdateDoc(i);
                                            }}
                                          >
                                            <Edit />
                                          </IconButton>
                                        </td>
                                      );
                                    }
                                    if (
                                      j["label"] === "Edit User List" ||
                                      j["label"] === "View User List"
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
                                        >
                                          {i[`${j["key"]}`] &&
                                          i[`${j["key"]}`].length > 0
                                            ? i[`${j["key"]}`].join(",")
                                            : "No User Selected"}{" "}
                                          <IconButton
                                            aria-label="Edit List"
                                            title="Edit List"
                                            onClick={(e) => {
                                              handleSelectBoxOpen();
                                              handleSelectBox(
                                                e,
                                                i,
                                                j["label"],
                                                j["key"],
                                                index
                                              );
                                            }}
                                          >
                                            <Edit />
                                          </IconButton>
                                        </td>
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
                                        {i[`${j["key"]}`]}
                                      </td>
                                    );
                                  })}
                              </tr>
                            ))}
                        </tbody>
                      </table>{" "}
                    </div>
                  ) : (
                    <>
                      <div
                        className="NoData"
                        style={{
                          fontSize: "20px",
                          fontWeight: "600",
                          padding: "10px",
                          paddingLeft: "630px",
                        }}
                      >
                        No Data Found{" "}
                      </div>
                    </>
                  )}
                </>
              )}
            </Paper>
          </Box>
          <></>
        </Box>
      ) : (
        <SocketContext.Provider value={socket}>
          <EditUpdatePage
            dataObj={editDataObj}
            headingObj={editHeadingObj}
            obj={wholeObj}
            user={user}
            action={"MAIN"}
          />
        </SocketContext.Provider>
      )}
      <>
        {labelOpen ? (
          <BasicPopover
            anchorEl={anchorEl}
            handleLabelClose={handleLabelClose}
            labelData={labelData}
          />
        ) : (
          <></>
        )}
        {selectOpen && selectObj && selectType !== "" ? (
          <SocketContext.Provider value={socket}>
            <SelectDialog
              anchorEl={anchorEl}
              handleSelectClose={handleSelectClose}
              selectObj={selectObj}
              selectType={selectType}
              selectKey={selectKey}
              userList={allLoggedUser}
              user={user}
            />
          </SocketContext.Provider>
        ) : (
          <></>
        )}
      </>
      <>
        {openCreateDoc && (
          <CreateExcelDocDialog
            setOpenCreateDoc={setOpenCreateDoc}
            setCreatedHeadings={setCreatedHeadings}
            handleAfterCreatedDoc={handleAfterCreatedDoc}
            user={user}
          />
        )}
      </>
    </>
  );
}
