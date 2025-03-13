"use client";
import { useContext, useEffect, useState, useRef } from "react";

import { Box, Typography, Grid2, CircularProgress } from "@mui/material";
// CONTEXTS
import { RandColorContext } from "@/src/context/RandColorContext";
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import MainFrame from "@/src/components/Layout/MainFrame";
import Title from "@/src/components/Common/Title";
import MessageBlock from "@/src/components/Display/MessageBlock";
import Loading from "@/src/components/Common/Loading";
// HOOKS
import {
  getMessagesByUserId,
  getMessagesByUserIdAndPeriod,
} from "../../actions";

interface DataFormat {
  id: string;
  created_at: string;
  message: string;
  userId: string;
  is_public: boolean;
  upvotes?: number | null;
}

let start = 0;
let amount = 8;

export default function MyPage() {
  const getRandomColor = useContext(RandColorContext);
  const { user, isLoading } = useContext(UserContext);

  const loaderBox = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<DataFormat[] | undefined>(undefined);
  const [colors, setColors] = useState<string[] | undefined>(undefined);
  const [pageLoading, setPageLoading] = useState(true);
  const [displayProgressBar, setDisplayProgressBar] = useState(false);
  const [dataDone, setDataDone] = useState(false);

  const getMessages = async () => {
    if (user) {
      const data = await getMessagesByUserId(user?.id);

      data.sort((a, b) => {
        const date1 = new Date(a.created_at);
        const date2 = new Date(b.created_at);
        return (
          date2.getFullYear() - date1.getFullYear() ||
          date2.getMonth() - date1.getMonth() ||
          date2.getDate() - date1.getDate()
        );
      });
      console.log(data);

      if (data.length) {
        const colorArray = Array.from({ length: data.length }, () =>
          getRandomColor("light")
        );
        setMessages((prev) => (prev ? [...prev, ...data] : data));
        setColors((prev) => (prev ? [...prev, ...colorArray] : colorArray));

        start += amount;
        console.log(start);
      } else {
        setDataDone(true);
      }
    }
    setPageLoading(false);
  };

  useEffect(() => {
    getMessages();

    // let timeoutId: NodeJS.Timeout | null = null;

    // const io = new IntersectionObserver(
    //   (entries) => {
    //     const entry = entries[0];
    //     if (entry.isIntersecting && !displayProgressBar) {
    //       setDisplayProgressBar(true);
    //       if (timeoutId) clearTimeout(timeoutId);

    //       timeoutId = setTimeout(() => {
    //         console.log("it's hitting the bottom!");

    //         getMessages().finally(() => setDisplayProgressBar(false));
    //       }, 1000);
    //     }
    //   },
    //   { threshold: 1.0 }
    // );

    // if (loaderBox.current) {
    //   console.log("loaderBox is there");
    //   io.observe(loaderBox.current);
    // }

    // return () => {
    //   io.disconnect();
    //   if (timeoutId) clearTimeout(timeoutId);
    // };
  }, [user]);

  return (
    <>
      <MainFrame step={2} alignItems="start">
        {isLoading || pageLoading ? (
          <Loading />
        ) : (
          <>
            <Title
              text={"My Logs"}
              mb="3rem"
              fontWeight={700}
              textAlign="start"
            />
            <Grid2 container spacing={2}>
              {messages?.map((data, index) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <MessageBlock
                    messageData={data}
                    bgcolor={colors?.length ? colors[index] : ""}
                  />
                </Grid2>
              ))}
            </Grid2>
          </>
        )}
      </MainFrame>
      <Typography textAlign={"center"} color="text.secondary">
        {dataDone && !displayProgressBar && "💡 This is the end of data 💡"}
      </Typography>
      <Box
        ref={loaderBox}
        height={"50px"}
        my={"1rem"}
        display={"flex"}
        justifyContent={"center"}
      >
        {displayProgressBar && <CircularProgress />}
      </Box>
    </>
  );
}
