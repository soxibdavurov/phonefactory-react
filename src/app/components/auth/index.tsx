import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import { useGlobals } from "../../stores/slices/useGlobals";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupOpen: () => void;  // 🔹 yangi props
  handleLoginOpen: () => void;  // 🔹 yangi props
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupOpen, handleLoginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();

  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();
  /** HANDLERS **/

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  }

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  }

  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  }

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  }

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);


      //Saving authenticated user
      setAuthMember(result);
      sweetTopSuccessAlert("Signed up successfully", 2000);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  }

  const handleLoginRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      //Saving authenticated user
      setAuthMember(result);
      sweetTopSuccessAlert("Signed in successfully", 1000);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(
        err
      ).then();
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            direction={"row"}
          >

            <div className="oynaliWrapper">
              <form>
                <h2>Signup Form</h2>
                <div className="input-field">
                  <input type="text" required

                    onChange={handleUsername}
                  />
                  <label>Enter your username</label>
                </div>
                <div className="input-field">
                  <input type="password" required
                    onChange={handlePassword}
                    onKeyDown={handlePasswordKeyDown}
                  />
                  <label>Enter your password</label>
                </div>
                <div className="input-field">
                  <input type="text" required

                    onChange={handlePhone}
                  />
                  <label>Enter your phone number</label>
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignupRequest();
                  }}>
                  Signup
                </button>
                <div className="register">
                  <p>
                    Already have an account? <a href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSignupClose();   // avval login oynasini yopamiz
                        handleLoginOpen();   // so‘ng signup modalni ochamiz
                      }}>Login</a>
                  </p>
                </div>
              </form>
            </div>
          </Stack>
        </Fade>
      </Modal>

      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}>
            <div className="container">
              <div className="row">
                <div>
                  <div className="login-register-wrapper">
                    <Tab.Container defaultActiveKey="login">
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="login">
                            <h4>Login</h4>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="login">
                          <div className="login-form-container">
                            <div className="login-register-form">
                              <div>
                                <input
                                  placeholder="Username"
                                  onChange={handleUsername}
                                />
                                <input
                                  type={"password"}
                                  placeholder="password"
                                  onChange={handlePassword}
                                  onKeyDown={handlePasswordKeyDown}
                                />
                                <div className="button-box">
                                  <div className="login-toggle-btn">
                                    <input type="checkbox" />
                                    <label className="ml-10">Remember me</label>
                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                      Forgot Password?
                                    </Link>
                                  </div>
                                  <button
                                    onClick={handleLoginRequest} type="submit">
                                    <span>Login</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>

          </Stack>
        </Fade>
      </Modal> */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={loginOpen}
        className={classes.modal}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            direction={"row"}>
            <div className="oynaliWrapper">
              <form>
                <h2>Sign in here</h2>
                <div className="input-field">
                  <input type="text" required

                    onChange={handleUsername}
                  />
                  <label>Enter your username</label>
                </div>
                <div className="input-field">
                  <input type="password" required
                    onChange={handlePassword}
                    onKeyDown={handlePasswordKeyDown}
                  />
                  <label>Enter your password</label>
                </div>
                <div className="forget">
                  <label htmlFor="remember">
                    <input type="checkbox"

                      id="remember" />
                    <p>Remember</p>
                  </label>
                  <a href="#">Forgot password?</a>
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLoginRequest();
                  }}>
                  Login
                </button>
                <div className="register">
                  <p>
                    Don't have an account? <a href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLoginClose();   // avval login oynasini yopamiz
                        handleSignupOpen();   // so‘ng signup modalni ochamiz
                      }}>Register</a>
                  </p>
                </div>
              </form>
            </div>


          </Stack>
        </Fade>
      </Modal>
    </>
  );
}
