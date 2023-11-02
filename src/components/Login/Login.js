import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_EMAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "EMAIL_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_PASS") {
    return { value: action.val, isValid: action.val.trim().length > 5 };
  }
  if (action.type === "PASS_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  return { value: "", isValid: false };
};
const collageReducer = (state, action) => {
  if (action.type === "USER_CLG") {
    return { value: action.val, isValid: action.val.trim().length > 1 };
  }
  if (action.type === "CLG_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 1 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollage, setEnteredCollage] = useState('');
  // const [collageIsValid, setCollageIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(()=> {
  //   const identifier= setTimeout(()=>{
  //     console.log ('Checking Form Validation')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 5 &&enteredCollage.trim().length>1
  //     )
  //   },500)
  //   return () => {
  //     console.log ('CleanUp')
  //     clearTimeout(identifier)
  //   }

  // },[enteredEmail,enteredPassword,enteredCollage])
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    type: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    type: "",
    isValid: null,
  });
  const [collageState, dispatchCollage] = useReducer(collageReducer, {
    type: "",
    isValid: null,
  });
  const {isValid:emailIsValid}=emailState
  const {isValid:passwordIsValid}=passwordState
  const {isValid:collageIsValid}=collageState

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_EMAIL", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        collageState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASS", val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 5 &&
        collageState.isValid
    );
  };
  const collageChangeHandler = (event) => {
    dispatchCollage({ type: "USER_CLG", val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
        passwordState.isValid &&
        event.target.value.trim().length > 2
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASS_BLUR" });
  };
  const validateCollageHandler = () => {
    dispatchCollage({ type: "CLG_BLUR" });
  };
  const authCtx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, collageState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          lable="E-Mail"
          value={emailState.value}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          
        />
        <Input
          id="password"
          lable="Password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}

        />
        <Input
          id="collage"
          lable="Collage"
          value={collageState.value}
          isValid={collageIsValid}
          onChange={collageChangeHandler}
          onBlur={validateCollageHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
