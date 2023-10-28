import { Box, Button, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { read, utils, writeFile } from "xlsx";
import CreateExcelDocDialog from "./createExcelDoc";
import EditFormDialog from "./editPopupBox";
import FormDialog from "./popupBox";
import axios from "axios";
import { ReactComponent as Save } from "./../images/save.svg";
import { ReactComponent as Delete } from "./../images/deleteButton.svg";
import { ReactComponent as Edit } from "./../images/edit.svg";
import { ReactComponent as Back } from "./../images/back.svg";
import { useHistory } from "react-router-dom";
import { display } from "@mui/system";
import { getApiUrl } from "../apiUtils";


const apiUrl = getApiUrl();

const HomeComponent = (props) => {
  const history = useHistory()
  const [fileName, setFileName] = useState([]);
  const [docName, setDocName] = useState({});
  const [headings, setHeadings] = useState([]);
  const [showEnterData, setShowEnterData] = useState(false);
  const [formFill, setFill] = useState(false);
  const [showEditData, setShowEditData] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [openCreateDoc, setOpenCreateDoc] = useState(false);
  const [createdHeadings, setCreatedHeadings] = useState([]);
  const [user,setUser]=useState(null)

  useEffect(()=>{
    let obj = localStorage.getItem("LoginUser");
      let userObj = JSON.parse(obj);
      // console.log("====",userObj);
      if (userObj && userObj.loggedIn === true) {
        setUser(userObj.userId);
      } else {
        alert("Please Login To Access this Page!");
        history.push("/");
      }
  },[])
  useEffect(() => {
    let unmounted = false;
    if (!unmounted && formFill) {
      setFileName(fileName);
      setFill(false);
      let heading = Object.keys(fileName[0]);
      heading && heading.length > 0 && heading.push("Action");
      if (heading[0] !== "S.No.") {
        let index = heading.indexOf("S.No.");
        // console.log("____>", index);
        heading[0] = [heading[index], (heading[index] = heading[0])][0];
        // console.log("Final Heading====>", heading);
      }
      headings.length === 0 && fileName.length > 0 && setHeadings(heading);
      

      setHeadings(heading);
    }
  }, [fileName]);

  const formFillData = (data) => {
    let file = [...fileName];
    data && file.push(data);
    setFileName(file);
    setFill(true);
  };
  const editFormData = (data) => {
    // console.log("&&&&====>{{{{Dta}}}}", data);
    let myArray = [...fileName];
    let index = myArray.findIndex((item) => item["S.No."] === data["S.No."]);

    myArray.splice(index, 1, data);
    setFileName(myArray);
    setFill(true);
  };
  const handleImport = ($event) => {
    const files = $event.target.files;
    // console.log("Files===>", files);
    if (files.length) {
      const file = files[0];
      // console.log("Fillllle===>", file);
      setDocName(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        // console.log("wb===>", wb);
        const sheets = wb.SheetNames;
        // console.log("sheets===>", sheets);
        if (sheets.length) {
          let rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          if (rows && rows.length > 0 && rows[0]["S.No."] === undefined)
            rows.forEach((i, index) => {
              i["S.No."] = index + 1;
            });
          setFileName(rows);
          let heading = Object.keys(rows[0]);
          heading && heading.length > 0 && heading.push("Action");
          if (heading[0] !== "S.No.") {
            let index = heading.indexOf("S.No.");
            // console.log("____>", index);
            heading[0] = [heading[index], (heading[index] = heading[0])][0];
            // console.log("Final Heading====>", heading);
          }
          headings.length === 0 && rows.length > 0 && setHeadings(heading);
          setShowEnterData(true);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    const headings = [["Movie", "Category", "Director", "Rating"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, fileName, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Movie Report.xlsx");
  };
  // console.log("FileName====>s", headings);
  const handleEditData = (i) => {
    // console.log("===>", i);
    setShowEditData(true);
    setDataToEdit(i);
    setIsEdit(true);
  };

  const handleDeleteData = (i) => {
    alert(`You have deleted the row`);
    let fileDataList = [...fileName];
    let filteredList = fileDataList.filter(
      (item) => item["S.No."] !== i["S.No."]
    );
    // console.log("filter===>", filteredList);
    filteredList.forEach((i, index) => {
      i["S.No."] = index + 1;
    });
    setFileName(filteredList);
  };

  const handleCreateDoc = () => {
    setOpenCreateDoc(true);
  };

  const handleDataSave = () => {

    const body = {
      GROUP_ID: "123",
      GROUP_NAME: "TEST GROUP",
      DOC_NAME: docName && docName.name ? docName.name : "",
      DOC_OBJ: fileName,
      DOC_LABEL: headings,
      CREATED_BY:user ,
    };
    // console.log("=====>", fileName, "----->", headings);
    if (
      user&&
      body.DOC_NAME &&
      body.DOC_OBJ &&
      body.DOC_LABEL &&
      body.DOC_LABEL.length > 0
    ) {
      axios
        .post(`${apiUrl}/doc`, body).then((res)=>res.data)
        .then((res) => {
          if (
            res.status === "success" &&
            res.result
          ) {
            alert("Doc Added successfully");
          } else alert("Doc Addition Unsuccessfully");
        })
        .catch((err) => alert("Something went wrong" + err));
    } else {
      alert("No Data to Save");
    }
  };
  return (
    <>
      <div className="row mb-2 mt-5">
        <div className="col-sm-6 offset-3">
          <div className="row">
            {/* <div className="col-md-6">
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    name="file"
                    className="custom-file-input"
                    id="inputGroupFile"
                    required
                    onChange={handleImport}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div> */}
            
              <div style={{ marginTop: "10px", display:"flex",justifyContent:"space-between" ,padding:"10px"}}>
                <div>
                <Button variant="contained" component="label">
              Upload Doc
        <input
                    type="file"
                    name="file"
                    hidden
                    className="custom-file-input"
                    id="inputGroupFile"
                    required
                    onChange={handleImport}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
      </Button>
            
                </div>
                <div>
              <Button
                variant="outlined"
                startIcon={<Back />}
                onClick={(e)=>{
                  history.push("/view")
                }}
              >
                Back
              </Button>
              </div>
            </div>
            <div className="col-md-6">

              {/* <button
                onClick={handleExport}
                className="btn btn-primary float-right"
              >
                Export <i className="fa fa-download"></i>
              </button>
              <button
                onClick={handleCreateDoc}
                className="btn btn-primary float-right"
              >
                Create Excel Doc <i className="fa fa-download"></i>
              </button> */}
              {docName &&  docName.name &&<><div style={{display:"flex", justifyContent:"space-between" ,alignContent:"center",padding:"10px"}}><span style={{fontWeight:"600",textDecoration:"underline"}}>Name of the Doc: {docName.name}</span> 
              
              {/* <button
              style={{right:"10px"}}
                onClick={handleDataSave}
                className="btn btn-primary float-right"
              >
                Save <i className="fa fa-download"></i>
            </button>*/} <IconButton
                              aria-label="Save Doc"
                              onClick={handleDataSave}
                            >
                              <Save title="Save Doc" />
                            </IconButton> </div></>}
              
            </div>
          </div>
        </div>
      </div>
      <div className="row">
      {showEnterData ? (
        <FormDialog
          headings={headings}
          fileName={fileName}
          setFileName={setFileName}
          formFillData={formFillData}
        />
      ) : (
        <></>
      )}
        <div className="col-sm-6 offset-3">
          
      <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              margin: "10px",
              padding: "10px",
              "& > :not(style)": {
                m: 1,
                width: 1800,
                maxHeight: 510,

                boxShadow: 4,
              },
            }}
          >
            <Paper style={{ padding: "0px",overflow:"auto" }}>
              <div className="tableWrapper" style={{ overflow: "auto", }}>
          <table className="table" style={{
                          borderCollapse: "collapse",
                          width: " 100%",
                          marginTop: "0px",
                          minWidth: "1130px",

                          background: "white"
                        }}>
            <thead >
              {headings.length && fileName.length ? (
                headings.map((data, index) => {
                  return <th style={{
                    backgroundColor: "#ccc",
                    color: "#fff",
                    position: "sticky",
                    fontSize: "16px",
                    fontWeight: "400",
                    textTransform: "uppercase",
                    padding: "5px 10px",
                    top: "0px",
                    textAlign: "left",
                  }}>{data}</th>;
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
                        if (j === "Action") {
                          return (
                            <td style={{
                              borderBottom: "1px solid #ccc",
                              textAlign: "left",
                              fontWeight: "400",
                              fontSize: "14px",

                              background: "white",
                              padding: "5px 10px"
                            }}>
                              {/* <button
                                onClick={(e) => {
                                  handleEditData(i);
                                }}
                              >
                                Edit
                              </button> */}
                              <IconButton
                              aria-label="Edit Row"
                              onClick={(e) => {
                                handleEditData(i);
                              }}
                            >
                              <Edit title="Edit Row" />
                            </IconButton>
                              {" "}
                              {/* <button
                                onClick={(e) => {
                                  handleDeleteData(i);
                                }}
                              >
                                DELETE
                              </button> */}
                              <IconButton
                              aria-label="Delete Row"
                              onClick={(e) => {
                                handleDeleteData(i);
                              }}
                            >
                              <Delete title="Delete Row" />
                            </IconButton>
                            </td>
                          );
                        }
                        return <td style={{
                          borderBottom: "1px solid #ccc",
                          textAlign: "left",
                          fontWeight: "400",
                          fontSize: "14px",

                          background: "white",
                          padding: "5px 10px"
                        }}>{i[`${j}`]}</td>;
                      })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center" style={{fontSize:"20px",fontWeight:"600",padding:"10px",paddingLeft:"630px"}} >
                    No Data Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          </Paper></Box>
        </div>
      </div>
      
      {showEditData ? (
        <EditFormDialog
          headings={headings}
          dataToEdit={dataToEdit}
          isEdit={isEdit}
          setDataToEdit={setDataToEdit}
          setIsEdit={setIsEdit}
          editFormData={editFormData}
        />
      ) : (
        <></>
      )}
      {openCreateDoc && (
        <CreateExcelDocDialog
          setOpenCreateDoc={setOpenCreateDoc}
          setCreatedHeadings={setCreatedHeadings}
        />
      )}
    </>
  );
};

export default HomeComponent;
