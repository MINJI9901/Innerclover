import { Box, Container, Typography } from "@mui/material";
import CloverLogo from "../Common/CloverLogo";

interface toastProps {
  title: string;
  message: string;
  titleColor?: string;
  messageColor?: string;
  boxColor?: string;
}

export const ToastMsg = ({
  title,
  message,
  titleColor = "black",
  messageColor = "black",
  boxColor = "white",
}: toastProps) => {
  return (
    <Box margin={"0.5rem"} bgcolor={boxColor}>
      <Container sx={{ width: "3rem" }}>
        <CloverLogo />
      </Container>
      <Typography fontWeight={700} color={titleColor}>
        {title}
      </Typography>
      <Typography mt={"1rem"} color={messageColor}>
        {message}
      </Typography>
    </Box>
  );
};
