import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

export default function EditMessageForm() {
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
        rows={8}
        sx={{
          "& .MuiInputBase-root": { bgcolor: "white", pb: "2rem" },
          // "& .MuiFormHelperText-root": { position: "absolute" },
        }}
        // helperText={`${5000} chars left`}
        FormHelperTextProps={{
          sx: { position: "absolute", bottom: "5px", right: 0 },
        }}
        disabled
      >
        Hello, this is test text hehehehehehehehehehehehehe
      </TextField>
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
