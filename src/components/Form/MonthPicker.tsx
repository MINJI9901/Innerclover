"use client";
import { useState, useContext, ChangeEvent, SetStateAction } from "react";
// MUI
import {
  Box,
  Button,
  Container,
  Menu,
  Typography,
  useTheme,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// CONTEXT
import { UserContext } from "@/src/context/UserContext";

const now = new Date();

let month = now.getMonth();
let year = now.getFullYear();

interface MonthPickerProps {
  value: Date;
  setValue: React.Dispatch<SetStateAction<Date>>;
  submitEvent?: Function;
  fetchData?: Function;
}

export default function MonthPicker({
  value,
  setValue,
  submitEvent,
  fetchData,
}: MonthPickerProps) {
  const { palette } = useTheme();
  const { user } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCalendar = (e: Record<string, number>) => {
    month = e.$M;
    year = e.$y;
  };

  const handleDateSubmit = () => {
    const newValue = new Date(year, month, 1);
    console.log(newValue);
    setValue(newValue);
    setIsOpen(false);

    if (fetchData) {
      fetchData(
        newValue,
        new Date(newValue.getFullYear(), newValue.getMonth() + 1, -1)
      );
    }

    if (submitEvent) {
      submitEvent();
    }
  };

  return (
    <Box>
      <CalendarMonthIcon
        sx={{ fontSize: "2rem", ml: "1rem" }}
        onClick={handleOpen}
      ></CalendarMonthIcon>
      {/* <Typography display="inline-block" margin="0.5rem">
        {`${year}.${month + 1 < 10 ? `0${month + 1}` : month + 1}`}
      </Typography> */}
      <Menu
        id="menu-appbar"
        // anchorEl={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(isOpen)}
        onClose={handleClose}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar"]}>
            <DemoItem>
              <DateCalendar
                defaultValue={dayjs(now)}
                value={dayjs(value)}
                views={["month", "year"]}
                openTo="month"
                // minDate={dayjs(user?.confirmed_at)}
                minDate={dayjs("2024-01-01")}
                maxDate={dayjs(now)}
                onChange={handleCalendar}
                sx={{ height: "fit-content" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "90%",
                }}
              >
                <Button
                  onClick={handleDateSubmit}
                  sx={{
                    bgcolor: palette.primary.main,
                    color: "black",
                    width: "100%",
                    ml: "2rem",
                  }}
                >
                  Done
                </Button>
              </Box>
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Menu>
    </Box>
  );
}
