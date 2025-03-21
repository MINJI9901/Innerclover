import { useState, useContext } from "react";
import { Box, Avatar, TextField, Typography, useTheme } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
// CONTEXTS
import { UserContext } from "@/src/context/UserContext";
// COMPONENTS
import SubLink from "../Common/SubLink";
import BasicButton from "../Common/BasicButton";
import PasswordEditForm from "./PasswordEditForm";
// HOOKS
import { deleteAccount, logout } from "@/src/app/signup/actions";
import { updateRowById, uploadImgFile } from "@/src/app/actions";

export default function ProfileDisplayForm() {
  // THEME
  const { palette } = useTheme();
  // CONTEXT
  const { user, isLoading, profile, setUser, fetchUser } =
    useContext(UserContext);
  // STATE
  const [formData, setFormData] = useState({
    avatar_url: profile?.avatar_url,
    name: profile?.name,
    email: profile?.email,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openPasswordForm, setOpenPasswordForm] = useState(false);

  // TO OPEN TEXTFIELD TO MODIFY
  const handleOpenForm = () => {
    setIsEditing(true);
  };

  // REFLECTS INPUT CHANGE TO STATE
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    // console.log("name: ", name, "value: ", value);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // UPLOAD & UPDATE PROFILE IMAGE
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    // console.log("file: ", file);

    if (file && user?.id) {
      const fileUrl = await uploadImgFile(file, user.id);

      if (fileUrl) {
        const res = await updateRowById("users", user.id, {
          avatar_url: `${fileUrl}?v=${new Date().getTime()}`,
        });

        setFormData((prev) => ({
          ...prev,
          avatar_url: `${fileUrl}?v=${new Date().getTime()}`,
        }));

        // console.log("file url: ", `${fileUrl}?v=${new Date().getTime()}`);
        // console.log("file url update res: ", res);
      }
    }
  };

  // SUBMIT MODIFIED DATA (EXCEPT FOR IMG)
  const handleSubmit = async () => {
    if (user) {
      const res = await updateRowById("users", user?.id, formData);
      // console.log("update profile res", res);
    }
    setIsEditing(false);
  };

  // TO OPEN PASSWORD UPDATE FORM
  const handleOpenPasswordForm = () => {
    if (!openPasswordForm) {
      setOpenPasswordForm(true);
    } else {
      setOpenPasswordForm(false);
    }
  };

  // LOGOUT FUNCTION
  const handleLogout = async () => {
    await logout();

    if (fetchUser) {
      await fetchUser();
    }
  };

  // DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    await deleteAccount(user!.id);
    await logout();

    if (fetchUser) {
      await fetchUser();
    }
  };

  return (
    <>
      <Box position={"relative"} width={"fit-content"}>
        <Avatar
          src={formData.avatar_url}
          sx={{
            width: "7rem",
            height: "7rem",
            mb: "2rem",
          }}
        />
        <Box position={"absolute"} bottom={"5px"} right={"5px"}>
          <CameraAltIcon />
          <input
            type="file"
            style={{
              opacity: 0,
              position: "absolute",
              top: 0,
              left: 0,
              height: "1.5rem",
              width: "1.5rem",
            }}
            onChange={handleImageChange}
          ></input>
        </Box>
      </Box>
      {["Name", "Email"].map((label, index) => (
        <Box key={label} my={"1rem"}>
          <Typography paddingLeft={"0.3rem"}>{label}</Typography>
          <Box
            borderRadius={"0.8rem"}
            border={"1px solid"}
            borderColor={palette.grey[300]}
            height={"2.5rem"}
          >
            {isEditing && label === "Name" ? (
              <TextField
                fullWidth
                size="small"
                name={label.toLowerCase()}
                value={formData[label.toLowerCase() as "name" | "email"]}
                slotProps={{
                  input: { sx: { height: "2.5rem", padding: 0 } },
                }}
                onChange={handleInputChange}
              ></TextField>
            ) : (
              <Typography margin={"0.5rem"}>
                {formData[label.toLowerCase() as "name" | "email"]}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
      <Box my={"1rem"}>
        <Typography paddingLeft={"0.3rem"}>Password</Typography>
        <Box
          borderRadius={"0.5rem"}
          border={"1px solid"}
          borderColor={palette.grey[300]}
          height={"2.5rem"}
          padding={"0.5rem 0.5rem"}
        >
          ************
        </Box>
        <SubLink text="Change Password →" clickEvent={handleOpenPasswordForm} />
        {openPasswordForm ? (
          <Box padding={"1rem"}>
            <PasswordEditForm afterEvent={handleOpenPasswordForm} />
          </Box>
        ) : (
          ""
        )}
      </Box>
      {isEditing ? (
        <BasicButton text="Done" clickEvent={handleSubmit} />
      ) : (
        <BasicButton text="Modify" clickEvent={handleOpenForm} />
      )}
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"end"}
        gap={1}
        my={"0.5rem"}
      >
        <SubLink text="Logout →" clickEvent={handleLogout} />
        <SubLink
          text="Delete Account →"
          color={palette.error.dark}
          clickEvent={handleDeleteAccount}
        />
      </Box>
    </>
  );
}
