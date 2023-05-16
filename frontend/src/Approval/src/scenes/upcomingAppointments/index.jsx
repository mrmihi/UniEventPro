import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Container, Typography } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const localizer = momentLocalizer(moment);

const UpcomingAppointments = () => {
    // const { id : requestID } = useParams();
    // const navigate = useNavigate();
    // const [request, setRequest] = useState(null);
    // const [requestTo, setRequestTo] = useState(null);

    // const handleSelectEvent = (event) => {
    //     setSelectedEvent(event);
    // };

    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    // const handleStartDateChange = (date) => {
    //     setStartDate(date);
    // };
    // const handleEndDateChange = (date) => {
    //     setEndDate(date);
    // };
    // const handleBookingSubmit = () => {
    //     const start = new Date(startDate).toISOString();
    //     const end = new Date(endDate).toISOString();

    //     if (moment(end).diff(moment(start), 'hours') < 1) {
    //         toast.error('Booking duration should be atleast 1 hour!', {
    //             position: toast.POSITION.TOP_CENTER,
    //         });
    //         return;
    //     }
    // };

    // useEffect(() => {
    //     // Fetch request details
    //     axios
    //     .get(`http://localhost:5000/api/approval/appointments/`)
    //     .then((res) => {
    //         console.log(res.data.data);
    //         setAppointments(res.data.data)
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }, [id]);

    // return (
    //     <Container>
    //         <Typography variant="h1" align="left" gutterBottom>
    //             Venue Booking Calendar
    //         </Typography>

    //         <Box mt={10}>
    //             <Calendar
    //                 localizer={localizer}
    //                 appoinments={appointments}
    //                 eventPropGetter={(event, start, end, isSelected) => {
    //                     let backgroundColor = '#3174ad';

    //                     if (event.status === 'approved') {
    //                         backgroundColor = '#4caf50';
    //                     } else if (event.status === 'pending') {
    //                         backgroundColor = '#ff9800';
    //                     } else if (event.status === 'rejected') {
    //                         backgroundColor = '#f44336';
    //                     }

    //                     return {
    //                         style: {
    //                             backgroundColor,
    //                             borderRadius: '0px',
    //                             opacity: 0.8,
    //                             color: 'white',
    //                             border: '0px',
    //                             display: 'block'
    //                         }
    //                     };
    //                 }}
    //                 selectable
    //                 onSelectEvent={handleSelectEvent}
    //                 startAccessor="start"
    //                 endAccessor="end"
    //                 defaultView="week"
    //                 views={["week"]}
    //                 step={60}
    //                 showMultiDayTimes
    //                 style={{ height: 500 }}
    //             />
    //             {selectedEvent && (
    //                 <Box mt={3}>
    //                     <Typography variant="h3">{selectedEvent.title}</Typography>
    //                     <Typography variant="body1">
    //                         Start: {moment(selectedEvent.start).format("YYYY-MM-DD hh:mm A")}
    //                     </Typography>
    //                     <Typography variant="body1">
    //                         End: {moment(selectedEvent.end).format("YYYY-MM-DD hh:mm A")}
    //                     </Typography>
    //                     <Typography variant="body1">Status: {selectedEvent.status}</Typography>
    //                 </Box>
    //             )}
    //         </Box>

    //         <Box mt={10}>
    //             <Typography variant="h1" align="left" gutterBottom>
    //                 Book Venue
    //             </Typography>
    //             <Container maxWidth="sm" style={{ paddingBottom: "200px" }}>
    //                 <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={3}>
    //                     <MobileDateTimePicker
    //                         label="Start Date & Time"
    //                         onChange={handleStartDateChange}
    //                         inputFormat="dd/MM/yyyy hh:mm a"
    //                         renderInput={(props) => <TextField {...props} />}
    //                         ampm
    //                         style={{ marginRight: "10px" }}
    //                         disablePast
    //                     />
    //                     <MobileDateTimePicker
    //                         label="End Date & Time"
    //                         onChange={handleEndDateChange}
    //                         inputFormat="dd/MM/yyyy hh:mm a"
    //                         renderInput={(props) => <TextField {...props} />}
    //                         ampm
    //                         disablePast
    //                     />
    //                 </Box>
    //                 <Box display="flex" justifyContent="center" mt={2}>
    //                     <Button onClick={handleBookingSubmit} variant="contained">
    //                         Submit
    //                     </Button>
    //                 </Box>
    //             </Container>
    //         </Box>
    //         <ToastContainer />
    //     </Container>
    // );
};

export default UpcomingAppointments;