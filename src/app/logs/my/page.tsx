"use client";
import { useContext, useEffect, useState, useRef, SetStateAction } from "react";

import {
  Box,
  Typography,
  Grid2,
  CircularProgress,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// CONTEXTS
import { RandColorContext } from "@/src/context/RandColorContext";
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import MainFrame from "@/src/components/Layout/MainFrame";
import Title from "@/src/components/Common/Title";
import MessageBlock from "@/src/components/Display/MessageBlock";
import Loading from "@/src/components/Common/Loading";
import MonthPicker from "@/src/components/Form/MonthPicker";
// HOOKS
import {
  getMessagesByUserId,
  getMessagesByUserIdAndPeriod,
} from "../../actions";
import CloverLogo from "@/src/components/Common/CloverLogo";

interface DataFormat {
  id: string;
  created_at: string;
  message: string;
  userId: string;
  is_public: boolean;
  likes?: string[] | null;
}

interface DataToDisplay {
  data: DataFormat[] | undefined;
  colors: string[] | undefined;
}

// FOR PAGINATION
let start = 0;
let amount = 8;

// SET TODAY AND RESOURCE NEEDED FOR DATE CALCULATING
const today = new Date();
console.log("today: ", today);
const day = today.getDay();
const diffToMonday = day === 0 ? -6 : 1 - day;

// MONDAY OF THIS WEEK
const monday = today;
monday.setDate(today.getDate() + diffToMonday);
monday.setHours(0, 0, 0, 0);

// FIRST DAY OF THIS MONTH
let firstDayOfMonth = new Date(today);
firstDayOfMonth.setDate(1);
firstDayOfMonth.setHours(0, 0, 0, 0);
const endDateForMonth = monday;
// endDateForMonth.setDate(endDateForMonth.getDate() - 1);

// FIRST DAT OF THIS YEAR
let firstDayOfYear = new Date(today);
firstDayOfYear.setMonth(0);
firstDayOfYear.setDate(1);
firstDayOfYear.setHours(0, 0, 0, 0);
const endDateForYear = firstDayOfMonth;
// endDateForYear.setDate(endDateForYear.getDate() - 1);

// FN: TO GET LATEST DATE BETWEEN TWO
const getLatestDate = (date1: Date, date2: Date) =>
  date1 > date2 ? date1 : date2;

// FN: SORTING DATA BY DATE
const sortByDate = (data: DataFormat[]) => {
  data.sort((a, b) => {
    const date1 = new Date(a.created_at);
    const date2 = new Date(b.created_at);
    return date2.getTime() - date1.getTime();
  });
};

export default function MyPage() {
  // CONTEXT
  const getRandomColor = useContext(RandColorContext);
  const { user, isLoading } = useContext(UserContext);

  // REF
  const loaderBox = useRef<HTMLDivElement | null>(null);
  const monthPickerRef = useRef<HTMLDivElement | null>(null);

  // STATE
  const [dateValue, setDateValue] = useState(today);
  const [isCustommed, setIsCustommed] = useState(false);
  const [custommedData, setCustommedData] = useState<DataToDisplay>({
    data: undefined,
    colors: undefined,
  });
  const [thisWeekData, setThisWeekData] = useState<DataToDisplay>({
    data: undefined,
    colors: undefined,
  });
  const [thisMonthData, setThisMonthData] = useState<DataToDisplay>({
    data: undefined,
    colors: undefined,
  });
  const [thisYearData, setThisYearData] = useState<DataToDisplay>({
    data: undefined,
    colors: undefined,
  });
  const [colors, setColors] = useState<string[] | undefined>(undefined);
  const [pageLoading, setPageLoading] = useState(true);
  const [dataDone, setDataDone] = useState(false);

  // FN: GET MESSAGES FROM A CERTAIN DATE TO TODAY
  const getMessagesByPeriod = async (
    startDate: Date,
    endDate: Date,
    setDataState?: React.Dispatch<SetStateAction<DataToDisplay>>
  ) => {
    setPageLoading(true);
    if (user) {
      const maxDate = new Date(user.confirmed_at ? user.confirmed_at : "");

      const data = await getMessagesByUserIdAndPeriod(
        user?.id,
        startDate,
        endDate
      );

      sortByDate(data);

      console.log("start data: ", startDate, "end data: ", endDate);
      console.log(data);

      const colorArray = Array.from({ length: data.length }, () =>
        getRandomColor("light")
      );

      !isCustommed && setDataState
        ? setDataState(() => ({ data: [...data], colors: colorArray }))
        : setCustommedData(() => ({ data: [...data], colors: colorArray }));
    }
    setPageLoading(false);
  };

  // FN: GET MESSAGES BY USER ID WITH PAGINATION
  const getMessagesWithPagination = async () => {
    if (user) {
      const data = await getMessagesByUserId(user?.id);

      if (data.length) {
        const colorArray = Array.from({ length: data.length }, () =>
          getRandomColor("light")
        );
        // setMessages((prev) => (prev ? [...prev, ...data] : data));
        setColors((prev) => (prev ? [...prev, ...colorArray] : colorArray));

        start += amount;
        console.log(start);
      } else {
        setDataDone(true);
      }
    }
    setPageLoading(false);
  };

  // OBJ FOR SYSTEMIZING OF GETTING DATA
  let dataFrame = isCustommed
    ? [
        {
          label: `${dateValue.toLocaleString("en-US", {
            month: "short",
          })}, ${dateValue.getFullYear()}`,
          startDate: dateValue,
          endDate: new Date(
            dateValue.getFullYear(),
            dateValue.getMonth() + 1,
            -1
          ),
          setDataState: setCustommedData,
          dataState: custommedData,
        },
      ]
    : [
        {
          label: "This Week",
          startDate: monday,
          endDate: today,
          setDataState: setThisWeekData,
          dataState: thisWeekData,
        },
        {
          label: "This Month",
          startDate: firstDayOfMonth,
          endDate: endDateForMonth,
          setDataState: setThisMonthData,
          dataState: thisMonthData,
        },
        {
          label: "This Year",
          startDate: firstDayOfYear,
          endDate: endDateForYear,
          setDataState: setThisYearData,
          dataState: thisYearData,
        },
      ];

  console.log("render");

  useEffect(() => {
    if (user) {
      dataFrame.forEach((el) => {
        getMessagesByPeriod(el.startDate, el.endDate, el.setDataState);
      });
    }
  }, [user]);

  return (
    <>
      <MainFrame step={2} alignItems="start">
        {isLoading || pageLoading ? (
          <Loading />
        ) : (
          <>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box display={"flex"}>
                <Title
                  text={"My Logs"}
                  mb="3rem"
                  fontWeight={700}
                  textAlign="start"
                />
                {/* <CalendarMonthIcon sx={{ fontSize: "2rem", ml: "1rem" }} /> */}
                <MonthPicker
                  value={dateValue}
                  setValue={setDateValue}
                  fetchData={getMessagesByPeriod}
                  submitEvent={() => {
                    setIsCustommed(true);
                  }}
                />
              </Box>
              <SearchIcon sx={{ fontSize: "2rem", mt: "5px" }} />
            </Box>

            {dataFrame.map((el, index) => {
              return (
                <Box key={index}>
                  <Box
                    mb={"3rem"}
                    borderRadius={"1rem"}
                    padding={"1.5rem 2rem"}
                    bgcolor={"background.paper"}
                  >
                    <Typography
                      color="text.secondary"
                      fontSize={"1.2rem"}
                      lineHeight={"1.7rem"}
                      mb={"1rem"}
                    >
                      {el.label}
                    </Typography>
                    <Grid2 container spacing={2}>
                      {el.dataState?.data?.length ? (
                        el.dataState?.data.map((data, index) => (
                          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <MessageBlock
                              messageData={data}
                              bgcolor={
                                el.dataState.colors?.length
                                  ? el.dataState.colors[index]
                                  : ""
                              }
                            />
                          </Grid2>
                        ))
                      ) : (
                        <Typography
                          width={"100%"}
                          fontSize={"1.1rem"}
                          lineHeight={"5rem"}
                          textAlign={"center"}
                          color="text.secondary"
                        >
                          No Data
                        </Typography>
                      )}
                    </Grid2>
                  </Box>
                  {dataFrame.length === 1 || index + 1 === dataFrame.length ? (
                    ""
                  ) : (
                    <Divider
                      textAlign="center"
                      sx={{ my: "5rem", width: "80%", mx: "auto" }}
                    />
                  )}
                  {/* <Box width={"1rem"}>
                    <CloverLogo />
                  </Box> */}
                </Box>
              );
            })}
          </>
        )}
      </MainFrame>
    </>
  );
}
