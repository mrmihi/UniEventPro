import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import FlexBetween from "Approval/src/components/FlexBetween";
import Header from "Approval/src/components/Header";
import Cookies from "js-cookie";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast, ToastContainer } from "react-toastify";

const Approvals = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  const StaffID = Cookies.get("staff_id");

  const getData = async () => {
    try {
      const response = await axios.get(`/api/approval/request`);
      // const response = await axios.get(`/api/approval/request/user/${StaffID}`);
      const data = response.data.data.map((request) => {
        request.type = String(request.type).replace("_", " ")
        if (request.status == "Sent" || request.status == "Viewed")
          return request;
      });
      setTableData(data);
    } catch (error) {
      console.log(error.response.data);
      toast.info(error.response.data.message, {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const fetchRegisteredData = async () => {
      await getData();
    };
    fetchRegisteredData();
  }, [StaffID]);

  const APPROVAL_REQUEST_STATUS = {
    NOT_YET_SENT: "Not_Yet_Sent",
    SENT: "Sent",
    VIEWED: "Viewed",
    APPROVED: "Approved",
    REJECTED: "Rejected",
  };

  const REQUEST_TYPE = {
    LIC: "LIC_Request",
    VENUE: "Venue_Request",
    FINANCE: "Budget_Request",
    ADMIN: "Admin_Request",
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, // disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "approval_id",
        header: "Approval ID",
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 120,
      },
      {
        accessorKey: "type",
        header: "Type",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          select: true,
          selectOptions: REQUEST_TYPE.map((type) => ({
            label: type,
            value: type,
          })),
        }),
      },
      {
        accessorKey: "requested_at",
        header: "Requested At",
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "request_note",
        header: "Requested Note",
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "requested_by.name",
        header: "Requested By",
      },
    ],
    []
  );

  const handleViewBtn = (row) => {
    Swal.fire({
      title: "Request Note",
      text: row.getValue("request_note"),
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Okay",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.info(`View Btn clicked on ${row.getValue("approval_id")}`, {
          position: "top-center",
        });
      }
    });
  };

  const handleApproveBtn = (row) => {
    toast.info(`Approve Btn clicked on ${row.getValue("approval_id")}`, {
      position: "top-right",
    });
  };

  const handleRejectBtn = (row) => {
    toast.info(`Reject Btn clicked on ${row.getValue("approval_id")}`, {
      position: "top-right",
    });
  };

  return (
    <div className="mb-20 ml-10 mr-10">
      <ToastContainer />
      <Box>
        <div className="mb-10">
          <FlexBetween>
            <Header
              id="headerText"
              title="Approval Requests to be Reviewed"
              subtitle="Welcome!"
            />
          </FlexBetween>
        </div>
      </Box>
      <div className="text-lg">
        <MaterialReactTable
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
              hidden: true,
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              fontWeight: "normal",
              fontSize: "20px",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              fontWeight: "bold",
              fontSize: "20px",
            },
          }}
          columns={columns}
          data={tableData}
          enableColumnOrdering
          enableEditing
          enableSorting
          initialState={{
            columnVisibility: {
              _id: false,
              approval_id: false,
              requested_to: false,
              request_note: false,
            },
          }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="View Event">
                <IconButton onClick={() => handleViewBtn(row)}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Approve Request">
                <IconButton
                  color="success"
                  onClick={() => handleApproveBtn(row)}
                >
                  <CheckCircleOutlineIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Reject Request">
                <IconButton color="error" onClick={() => handleRejectBtn(row)}>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </div>
    </div>
  );
};

export default Approvals;