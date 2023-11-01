import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state,action) =>{
  if (action.type==='USER_EMAIL'){
    return ({value:action.val,isValid:action.val.includes("@")})
  }
  if (action.type==='EMAIL_BLUR'){
    return ({value:state.value,isValid:state.value.includes("@")})
  }
  return ({value:'',isValid:false})
}
const passwordReducer=(state,action) =>{
  if (action.type==='USER_PASS'){
    return ({value:action.val,isValid:action.val.trim().length>5})
  }
  if (action.type==='PASS_BLUR'){
    return ({value:state.value,isValid:state.value.trim().length>5})
  }
  return ({value:'',isValid:false})
}
const collageReducer=(state,action) =>{
  if (action.type==='USER_CLG'){
    return ({value:action.val,isValid:action.val.trim().length>1})
  }
  if (action.type==='CLG_BLUR'){
    return ({value:state.value,isValid:state.value.trim().length>1})
  }
  return ({value:'',isValid:false})
}


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
const [emailState,dispatchEmail] = useReducer(emailReducer,{type:'',isValid:null})
const [passwordState,dispatchPassword] = useReducer(passwordReducer,{type:'',isValid:null})
const [collageState,dispatchCollage] = useReducer(collageReducer,{type:'',isValid:null})

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_EMAIL',val:event.target.value})
    setFormIsValid(
      emailState.isValid && passwordState.isValid && collageState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:"USER_PASS",val:event.target.value});

    setFormIsValid(
       emailState.isValid && passwordState.isValid && collageState.isValid
    );
  };
  const collageChangeHandler = (event) => {
    dispatchCollage({type:'USER_CLG', val:event.target.value});

    setFormIsValid(
      emailState.isValid &&  passwordState.isValid && collageState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'EMAIL_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'PASS_BLUR'})
  };
  const validateCollageHandler = () => {
    dispatchCollage({type:'CLG_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collageState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collageState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="collage">Password</label>
          <input
            type="text"
            id="collage"
            value={collageState.value}
            onChange={collageChangeHandler}
            onBlur={validateCollageHandler}
          />
        </div>
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
