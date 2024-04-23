import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUserError, userRegister } from "../../store/actions/userActions";
import programmingLanguages from "../../utilis/prograamingName";

import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [avatar, setAvatar] = useState("");

  const [skills, setSkills] = useState([]);
  const [aboutme, setAboutme] = useState("");

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   const Reader = new FileReader();
  //   Reader.readAsDataURL(file);

  //   Reader.onload = () => {
  //     if (Reader.readyState === 2) {
  //       setAvatar(Reader.result);
  //     }
  //   };
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.endsWith("@vitstudent.ac.in") === false) {
      toast.error("Email is not belongs to vit");
      return;
    }
    await dispatch(userRegister({ name, email, password, skills, aboutme }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserError());
    }
    if (user) {
      toast.success("Registered successfully");
    }
  }, [dispatch, error, user]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          ForkIT
        </Typography>

        {/* <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} /> */}

        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormControl sx={{ m: 1, minWidth: 120 }} className="registerInputs">
          <InputLabel id="demo-simple-select-helper-label">
            Add Skills
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={skills}
            label="Add Skills"
            multiple={true}
            onChange={(e) => setSkills(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {programmingLanguages.map((name, idx) => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Add skills in your profile, so that people can connect you
          </FormHelperText>
        </FormControl>

        <TextField
          id="outlined-multiline-static"
          label="About Me"
          multiline
          rows={4}
          className="registerInputs"
          value={aboutme}
          onChange={(e) => setAboutme(e.target.value)}
        />

        {/* <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <input type="file" accept="image/*" onChange={handleImageChange} /> */}

        <Link to="/">
          <Typography>Already Signed Up? Login Now</Typography>
        </Link>

        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={loading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
