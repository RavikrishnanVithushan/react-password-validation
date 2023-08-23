import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Popper, Paper, Typography } from "@mui/material";

export default function PasswordForm({
  lengthValidation = 8,
  inputContainerStyle = {},
  errorTextStyle = { color: "red" },
  popperStyle = { backgroundColor: "lightgray" },
  indicatorValidStyle = {},
  indicatorInvalidStyle = {},
  submitButtonStyle = {},
  onSubmit
}) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState("");
  const [isLengthValid, setIsLengthValid] = React.useState(false);
  const [isUppercaseValid, setIsUppercaseValid] = React.useState(false);
  const [isLowercaseValid, setIsLowercaseValid] = React.useState(false);
  const [isNumberValid, setIsNumberValid] = React.useState(false);
  const [isSpecialCharValid, setIsSpecialCharValid] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setPasswordError(password === "");
    setConfirmPasswordError(
      confirmPassword === "" || confirmPassword !== password
    );

    if (password !==""){
      setPasswordError(false)
    }

    if (onSubmit) {
      onSubmit({ password, confirmPassword });
    }

    
  };

  React.useEffect(() => {
    if (
      isLengthValid &&
      isUppercaseValid &&
      isLowercaseValid &&
      isNumberValid &&
      isSpecialCharValid
    ) {
      setIsDialogOpen(false);
    } else {
      setIsDialogOpen(true);
    }
  }, [
    isLengthValid,
    isUppercaseValid,
    isLowercaseValid,
    isNumberValid,
    isSpecialCharValid,
  ]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(false)
    setConfirmPasswordError(false)
    const lengthValid = newPassword.length >= lengthValidation;
    const uppercaseValid = /[A-Z]/.test(newPassword);
    const lowercaseValid = /[a-z]/.test(newPassword);
    const numberValid = /[0-9]/.test(newPassword);
    const specialCharValid = /[!@#$%^&*]/.test(newPassword);

    setIsLengthValid(lengthValid);
    setIsUppercaseValid(uppercaseValid);
    setIsLowercaseValid(lowercaseValid);
    setIsNumberValid(numberValid);
    setIsSpecialCharValid(specialCharValid);

    if (
      lengthValid &&
      uppercaseValid &&
      lowercaseValid &&
      numberValid &&
      specialCharValid
    ) {
      setPasswordStrength("strong");
      
    } else if (
      lengthValid &&
      (uppercaseValid || lowercaseValid || numberValid || specialCharValid)
    ) {
      setPasswordStrength("medium");
    
    } else {
      setPasswordStrength("weak");
      
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
  
    // Check if passwords match
    if (password === newConfirmPassword) {
      setConfirmPasswordError(false); 
    } else {
      setConfirmPasswordError(true); 
    }
  };
  

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "25ch",
          }}
          spacing={2}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Password"
            id="filled-hidden-label-small"
            value={password}
            variant="outlined"
            type="password"
            required
            onChange={handlePasswordChange}
            onFocus={() => setIsDialogOpen(true)}
            onBlur={() => setIsDialogOpen(false)}
            inputProps={{
              ref: anchorRef,
            }}
            sx={inputContainerStyle} // Apply custom input container styles
          />
          <Popper
            disablePortal
            open={isDialogOpen}
            anchorEl={anchorRef.current}
            placement="right-start"
            style={{
              width: "auto",
              height: "auto",
              marginLeft: "10px",
              ...popperStyle,
            }} // Apply custom popper styles
          >
            <Paper
              style={{ padding: "16px", minWidth: "200px", maxWidth: "400px" }}
            >
              <Typography textAlign={"left"}>
                The password you entered is {passwordStrength}. It is
                recommended to have a{" "}
                {passwordStrength !== "strong" ? "stronger" : "secure"}{" "}
                password.
              </Typography>
              <Typography>Password validation indicators:</Typography>
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                <li style={{ marginBottom: "4px", textAlign: "left" }}>
                  {isLengthValid ? (
                    <span
                      style={{ ...indicatorValidStyle, marginRight: "4px" }}
                    >
                      &#9989;
                    </span>
                  ) : (
                    <span
                      style={{ ...indicatorInvalidStyle, marginRight: "4px" }}
                    >
                      &#10060;
                    </span>
                  )}{" "}
                  Minimum length of {lengthValidation} characters
                </li>
                <li style={{ marginBottom: "4px", textAlign: "left" }}>
                  {isUppercaseValid ? (
                    <span style={{ color: "green", marginRight: "4px" }}>
                      &#9989;
                    </span>
                  ) : (
                    <span style={{ color: "red", marginRight: "4px" }}>
                      &#10060;
                    </span>
                  )}{" "}
                  At least one uppercase letter
                </li>
                <li style={{ marginBottom: "4px", textAlign: "left" }}>
                  {isLowercaseValid ? (
                    <span style={{ color: "green", marginRight: "4px" }}>
                      &#9989;
                    </span>
                  ) : (
                    <span style={{ color: "red", marginRight: "4px" }}>
                      &#10060;
                    </span>
                  )}{" "}
                  At least one lowercase letter
                </li>
                <li style={{ marginBottom: "4px", textAlign: "left" }}>
                  {isNumberValid ? (
                    <span style={{ color: "green", marginRight: "4px" }}>
                      &#9989;
                    </span>
                  ) : (
                    <span style={{ color: "red", marginRight: "4px" }}>
                      &#10060;
                    </span>
                  )}{" "}
                  At least one number
                </li>
                <li style={{ marginBottom: "4px", textAlign: "left" }}>
                  {isSpecialCharValid ? (
                    <span style={{ color: "green", marginRight: "4px" }}>
                      &#9989;
                    </span>
                  ) : (
                    <span style={{ color: "red", marginRight: "4px" }}>
                      &#10060;
                    </span>
                  )}{" "}
                  At least one special character
                </li>
              </ul>
            </Paper>
          </Popper>
          {passwordError && (
            <Typography style={{ ...errorTextStyle }}>
              Please enter a password
            </Typography>
          )}
          <TextField
            label="Confirm Password"
            id="filled-hidden-label-normal"
            value={confirmPassword}
            variant="outlined"
            type="password"
            required
            onChange={handleConfirmPasswordChange}
            error={confirmPasswordError}
            helperText={
              confirmPasswordError
                ? "Confirm password must match the password"
                : ""
            }
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={submitButtonStyle}
          >
            Submit
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
