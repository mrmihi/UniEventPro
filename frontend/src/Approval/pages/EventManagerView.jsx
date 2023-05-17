import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import API from '../components/api.approval';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';

function EventManagerView() {
  const { id: eventID } = useParams();
  const boxColor = '#f2f2f2';
  const [error, setError] = useState({});
  const [eventData, setEventData] = useState({});
  const [venueData, setVenueData] = useState(null);
  const [resourceData, setResourceData] = useState({});
  const [budgetData, setBudgetData] = useState({});
  const [approvalData, setApprovalData] = useState({});

  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [serverSuccessMessage, setServerSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getEventDetails = async () => {
      await API.get(`/events/${eventID}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
        .then((res) => {
          // console.log(res.data.data)
          setEventData(res.data.data);
        })
        .catch((err) => {
          setEventData({});
          setError(err.response.data);
        });
    };

    const getApprovalDetails = async () => {
      const createApprovalRequest = async () => {
        await API.post(
          `approval/event/`,
          {
            event_id: eventID.toString(),
            status: 'Initiated',
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
          .then((res) => {
            console.log('Event Approval Reference Created');
            if (res.data.data._id != '') {
              setApprovalData(res.data.data);
            } else {
              toast.error('Could not create a reference to event', {
                position: 'top-right',
              });
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error('Failed to create a reference to event', {
              position: 'top-right',
            });
          });
      };

      await API.get(`approval/event/events/${eventID}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.data[0] != '') {
            // console.log(res.data.data[0]);
            setApprovalData(res.data.data[0]);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setApprovalData({});
          if (err.response.data.data.length == 0) {
            createApprovalRequest();
          } else {
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        });
    };

    //kavindi
    const getResourceDetails = async () => {};

    //Maleesha
    const getBudgetDetails = async () => {};

    //Sapumal
    const getVenueDetails = async () => {
      await API.get(`bookings/event/${eventID}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
        .then((res) => {
          //   console.log(res.data[0]);
          setVenueData(res.data[0]);
        })
        .catch((err) => {
          setVenueData({});
          console.log(err.response);
        });
    };

    getEventDetails();
    getApprovalDetails();
    getVenueDetails();
  }, [eventID]);

  const handleAddVenueBtn = () => {
    navigate(`/venue/${eventID}/list`);
  };

  const handleAddResourceBtn = () => {
    navigate(`/admin/resources`);
  };
  const handleCreateBudgetBtn = () => {
    navigate(`/org/event/budget/${eventID}`);
  };
  const handleFillApprovalRequestBtn = () => {
    navigate(`/approval/${eventID}`);
  };
  const handleRequestAppointment = () => {

    navigate(`/org/dashboard/appointment/${eventID}`);
  };
  const handleMakePaymentBtn = () => {
    navigate(`/venue/payment`);
  };
  const handleViewSpeakersRequestBtn = () => {
    navigate(`/org/dashboard/speakers/${eventID}`);
  };
  const handleViewSponsorsRequestBtn = () => {
    navigate(`/org/dashboard/sponsors/${eventID}`);
  };
  const handleViewOpportunitiesRequestBtn = () => {
    navigate(`/org/dashboard/opportunities/${eventID}`);
  };

  const handlePublishBtn = async () => {
    //Dinal
    try {
      const response = await axios.put(`/api/events/${eventID}`, {
        status: 'Published',
      });
      setServerSuccessMessage(response.data.message);
      if (serverSuccessMessage !== '') {
        Swal.fire('', response.data.message, 'success');
      }
    } catch (error) {
      setServerErrorMessage(error.response.data.message);
    }
  };

  function approvalStatus(status) {
    switch (status) {
      case 'Initiated':
        return 'Initiated';
      case 'Draft':
        return 'Draft';
      case 'LIC_Awaiting':
        return 'Request Sent To LIC';
      case 'FM_Awaiting':
        return 'LIC Approved';
      case 'VM_Awaiting':
        return 'Budget Approved';
      case 'Admin_Awaiting':
        return 'Venue Manager Approved';
      case 'Approved':
        return 'Event Approved';
      case 'Rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  return (
    <div className="w-full">
      <ToastContainer />
      <Box className="px-8 w-full">
        <Typography id="eventName" variant="h2">
          {eventData != null ? eventData.name : 'Event Name'}
        </Typography>
        <Typography id="eventDescription" variant="h4">
          {eventData != null ? eventData.description : 'Description'}
        </Typography>
        <Typography id="eventDate" variant="h5">
          {eventData != null
            ? String(eventData.startTime).split('T')[0]
            : 'Date'}
        </Typography>
        <Typography id="eventStartTime" variant="h5">
          {eventData != null
            ? String(eventData.startTime).split('T')[1]
            : 'Start Time'}
        </Typography>
        <Typography id="eventEndTime" variant="h5">
          {eventData != null
            ? String(eventData.endTime).split('T')[1]
            : 'End Time'}
        </Typography>

        <Box className="flex flex-row flex-wrap my-4">
          <Box
            id="venueBox"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            mr="1%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventVenue" color="secondary">
                Event Venue
              </Typography>
              <Typography variant="h5" id="eventVenue" color="secondary">
                {venueData != null
                  ? 'Location : ' + venueData.venue.name
                  : 'Not added yet'}
              </Typography>
              <Typography variant="h5" id="eventVenueStatus" color="secondary">
                {venueData != null
                  ? 'Status : ' + venueData.booking_status
                  : ''}
              </Typography>
              <Typography
                variant="h6"
                id="eventVenue"
                color="secondary"
              ></Typography>
              <Box className="flex w-full justify-around flex-row my-2">
                {venueData == null ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleAddVenueBtn}
                  >
                    Add Venue
                  </Button>
                ) : null}
                {venueData == null ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    disabled
                  >
                    Request Approval
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleRequestAppointment}
                  >
                    Request Approval
                  </Button>
                )}
              </Box>
            </div>
          </Box>

          <Box
            id="Box"
            width="48%"
            bgcolor={boxColor}
            mb="1%"
            ml="1%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventResource" color="secondary">
                Event Resources
              </Typography>
              <Typography
                variant="h5"
                id="eventResourceStatus"
                color="secondary"
              >
                Not Added Yet
              </Typography>
              <Typography
                variant="h6"
                id="eventResource"
                color="secondary"
              ></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleAddResourceBtn}
                >
                  Add Resources
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Request Approval
                </Button>
              </Box>
            </div>
          </Box>

          <Box
            id="budgetBox"
            width="48%"
            bgcolor={boxColor}
            mt="1%"
            mr="1%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventbudget" color="secondary">
                Event Budget
              </Typography>
              <Typography variant="h5" id="eventBudgetStatus" color="secondary">
                Not Created Yet
              </Typography>
              <Typography
                variant="h6"
                id="eventBudget"
                color="secondary"
              ></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleCreateBudgetBtn}
                >
                  Create Budget
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Request Approval
                </Button>
              </Box>
            </div>
          </Box>

          <Box
            id="approvalBox"
            width="48%"
            bgcolor={boxColor}
            mt="1%"
            ml="1%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="eventApproval" color="secondary">
                Event Approval
              </Typography>
              <Typography
                variant="h5"
                id="eventApprovalStatus"
                color="secondary"
              >
                Status :{' '}
                {approvalData != null
                  ? approvalStatus(approvalData.status)
                  : 'Unavailable'}
              </Typography>
              <Typography
                variant="h6"
                id="eventApproval"
                color="secondary"
              ></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleFillApprovalRequestBtn}
                >
                  Fill Request Form
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Request Approval
                </Button>
              </Box>
            </div>
          </Box>

          <Box
            id="partnerBox"
            width="48%"
            bgcolor={boxColor}
            mt="1%"
            ml="0.5%"
            height={200}
            className="rounded-lg hover:border-2 hover:cursor-pointer hover:border-slate-400"
          >
            <div className="p-4 flex flex-col justify-between h-full">
              <Typography variant="h4" id="partner" color="secondary">
                Event Partners
              </Typography>
              {/* <Typography variant="h5" id="partnerStatus" color="secondary">
                Status :{' '}
                {approvalData != null
                  ? approvalStatus(approvalData.status)
                  : 'Unavailable'}
              </Typography> */}
              <Typography
                variant="h6"
                id="partner"
                color="secondary"
              ></Typography>

              <Box className="flex w-full justify-around flex-row my-2">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleViewSpeakersRequestBtn}
                >
                  View Speakers
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleViewSponsorsRequestBtn}
                >
                  View Sponsors
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleViewOpportunitiesRequestBtn}
                >
                  View Opportunities
                </Button>
                {/* <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  disabled
                >
                  Request Approval
                </Button> */}
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default EventManagerView;
