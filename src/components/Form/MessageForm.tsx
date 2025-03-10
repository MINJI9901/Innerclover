import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

export default function () {
  return (
    <Box
      component={"form"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      <TextField
        fullWidth
        multiline
        rows={7}
        sx={{ bgcolor: "white" }}
        placeholder="Whatever you want to say or you don't want to forget"
      />
      <FormControlLabel
        control={<Checkbox size="small" />}
        label="I would like to share with people"
        slotProps={{
          typography: { color: "text.secondary", fontSize: "0.8rem" },
        }}
        sx={{ mx: "auto", mb: "1rem" }}
      />
      <Button
        sx={{
          color: "text.secondary",
          border: "1px solid",
          borderColor: "text.secondary",
          my: "1rem",
        }}
      >
        This is my word for today →
      </Button>
    </Box>
  );
}
