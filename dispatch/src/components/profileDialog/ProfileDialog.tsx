import "./ProfileDialog.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { updateUser } from "../../features/auth/authSlice";
 
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfileDialog({
  openProfil,
  setOpenProfil,
 
}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { user,   userUpdateLoading } = useSelector(
    (state: RootState) => state.authorization
  );
// console.log(userUpddateError, userUpdateLoading)
 
  const [name, setName] = React.useState(user?.name);
  const [email, setEmail] = React.useState(user?.email);
  const [bio, setBio] = React.useState(user?.bio);
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [skill, setSkill] = React.useState("");
  const [skills, setSkills] = React.useState<string[]>(user?.skills || []);

  const handleSkillAdd = () => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setSkill("");
    }
  };

  const handleSkillDelete = (deletedSkill: string) => {
    setSkills(skills.filter((s) => s !== deletedSkill));
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSkillAdd();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = () => {
    const updatedData = { name, email, bio, password, skills };
    console.log("Updated data to dispatch:", updatedData);
  
    // Dispatch the updateUser action
    dispatch(updateUser(updatedData))
      .unwrap()
      .then((result: any) => {
        console.log("Update successful:", result); // Log the successful result
        setOpenProfil(false); // Close the profile dialog on success
      })
      .catch((error: any) => {
        // Handle the error if needed
        console.error("Update failed: ", error);
      });
  };
  

  const handleClose = () => {
    setOpenProfil(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openProfil}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md" // Add maxWidth for responsiveness
        fullWidth
        onClose={handleClose}
        aria-labelledby="profile-dialog-title"
      >
        <DialogTitle sx={{ mb: -1, mt: 1 }} id="profile-dialog-title">
          Profile Information
        </DialogTitle>
        <DialogContent className="dialogContent">
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            maxRows={10}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment sx={{ mr: "5px" }} position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              marginTop: "16px",
            }}
          >
            {skills.map((s, index) => (
              <Chip
                key={index}
                label={s}
                onDelete={() => handleSkillDelete(s)}
                sx={{ margin: "4px" }}
              />
            ))}
            <TextField
              variant="standard"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={handleSkillInputKeyDown}
              placeholder="Add a skill"
              InputProps={{ disableUnderline: true }}
              sx={{ flexGrow: 1, marginLeft: "8px" }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ mb: 1.5 }}>
          <Button  onClick={()=>handleClose()}>Cancel</Button>
          <Button
            sx={{ mr: 2 }}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            {userUpdateLoading? "loafing": "Submit"}
            
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
