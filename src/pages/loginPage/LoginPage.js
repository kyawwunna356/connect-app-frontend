import { Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box, palette } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import FlexBetween from '../../components/FlexBetween';
import Dropzone from 'react-dropzone'
import { EditAttributes } from '@mui/icons-material';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { loginUser, registerUser, setError } from '../../redux/features/userSlice';


const registerValidationSchema = Yup.object({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  occupation: Yup.string().required('This field is required'),
  location: Yup.string().required('This field is required'),
  imageFile: Yup.string().required('This field is required'),
  email: Yup.string().email('please enter a valid email').required('This field is required'),
  password: Yup.string().required('This field is required')
})

const loginValidationSchema = Yup.object({
  email: Yup.string().email('please enter a valid email').required('This field is required'),
  password: Yup.string().required('This field is required')
})

const registerInitial = {
  firstName: "",
  lastName: "",
  occupation: "",
  location: "",
  email: "",
  password: "",
  imageFile: "",
}

const loginInitial = {
  email: "",
  password: "",
}

function LoginPage() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const theme = useTheme()
  const navigate = useNavigate()
  const isbigScreen = useMediaQuery(theme.breakpoints.up('md'))
  const isTabletAndAbove = useMediaQuery(theme.breakpoints.up('sm'))
  const primarylight = theme.palette.primary.light
  const alt = theme.palette.background.alt
  const neutralLight = theme.palette.neutral.light
  const neutralMain = theme.palette.neutral.main

  const [page ,setPage] = useState('register')
  const isLogin =  page === "login"
  const isRegister = page === "register"

  // useEffect(() => {
  //   dispatch(setError(''))
  // },[page,dispatch])

  const handleRegister = async (values) => {
    const formData = new FormData()
    for(let value in values){
      formData.append(value,values[value])
    }
   
   
   
    dispatch(registerUser(formData)).unwrap().then(() => navigate('/home'))
   
  }

  const handleLogin = (values) => {
    const {email,password} = values
    dispatch(loginUser({email,password})).unwrap().then(navigate('/home'))
  }

  const handleFormSubmit = (values) => {
    if(isLogin) handleLogin(values)
    if(isRegister) handleRegister(values)
  }
  return (
    <>
      {/* Navbar */}
      <Box p='1rem 6%' backgroundColor={alt}>
        <Typography textAlign='center' fontWeight='bold' color="primary" fontSize={isbigScreen ? "2rem": "1.3rem"} onClick={() => navigate('/')}
            sx={{
              "&:hover": {color: primarylight,cursor: 'pointer'}
            }}>
          CONNECT </Typography>
      </Box>
      <Box width={isTabletAndAbove ? "50%" : "90%"} margin="1rem auto" backgroundColor={alt} p="2rem" borderRadius="0.5rem" >
          {/* formik start */}
           <Formik
            validationSchema={isLogin ? loginValidationSchema : registerValidationSchema}
            initialValues = {isLogin ? loginInitial : registerInitial }
            onSubmit = {handleFormSubmit}
           >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue
            }) => (
                <form onSubmit={handleSubmit}>
                  <Box display='flex' flexDirection="column" >
                  {/* error */}
                  {user.status === "error" && <Typography marginBottom='1rem' sx={{color: 'red'}}>{user?.error?.message || user?.error}</Typography>}
                  {/* in register */}
                  {isRegister && (
                    //first name and last name
                    <>
                   
                    <FlexBetween gap="1rem" flexDirection={isTabletAndAbove ? "row" : "column"}>
                      <TextField 
                        label="First Name" 
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                        helperText = {touched.firstName && errors.firstName}
                        sx={{ marginBottom: "1rem",width: isTabletAndAbove ? "50%" : "100%"}}
                      />
                      <TextField 
                        label="Last Name" 
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                        helperText = {touched.lastName && errors.lastName}
                        sx={{ marginBottom: "1rem", width: isTabletAndAbove ? "50%" : "100%"}}
                        />
                    </FlexBetween>
                      {/* location */}
                      <TextField 
                      label="Location" 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="location"
                      error={Boolean(touched.location) && Boolean(errors.location)}
                      helperText = {touched.location && errors.location}
                      sx={{ marginBottom: "1rem"}}
                      />
                    {/* occupation */}
                    <TextField 
                      label="Occupation" 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      name="occupation"
                      error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                      helperText = {touched.occupation && errors.location}
                      sx={{ marginBottom: "1rem"}}
                      />
                      {/* image Error */}
                    {Boolean(touched.imageFile) && errors?.imageFile && <Typography marginBottom='1rem' sx={{color: 'red'}}>{errors.imageFile}</Typography> }
                    <Box p='1.5rem' border={`1px dashed ${errors.imageFile ? 'red' : neutralMain}`} marginBottom = "1rem" cursor ="pointer">
                    <Dropzone 
                      accept= {{ 'image/png': ['.png'], 'image/jpg': ['.jpg'] }}
                      mulitple = {false}
                      onDrop={acceptedFiles => setFieldValue('imageFile',acceptedFiles[0])}>
                      {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Typography component={'span'} sx={{cursor: "pointer"}}>{values.imageFile ? 
                              <FlexBetween>
                                <Typography component={'span'} >{values.imageFile.name}</Typography>
                                <EditAttributes />
                              </FlexBetween>
                             : 
                             <Typography component={'span'}>
                              {!isDragActive && "Drag 'n' drop some files here, or click to select files"}
                             {(isDragActive && !isDragReject) ? "Drag and drop it here" : ""}
                             {(isDragReject) ? "File type not supported" : ""}
                             </Typography> }
                             
                    
                            
                             </Typography>
                             
                          </div>
                        </section>
                      )}
                    </Dropzone>
                    </Box>

                    </>
                    
                  )}
                  {/* Login */}
                  <TextField 
                    label="Email" 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText = {touched.email && errors.email}
                    sx={{ marginBottom: "1rem"}}
                    />
                    <TextField 
                    label="Password" 
                    type='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText = {touched.password && errors.password}
                    sx={{ marginBottom: "1rem"}}
                    />

                    {/* button */}
                    <Button color="primary" variant="contained" fullWidth type="submit" disabled={user.status === "loading" ? true: false}
                      sx={{p:"1rem 1.5rem", marginBottom: '1rem', color: neutralLight, '&:hover': {backgroundColor: theme.palette.primary.dark} }}>
                        {user.status === "loading" ? "loading" : "Submit"}
                    </Button>
                  </Box>

                  
                </form>
             
              
            )}
           </Formik>
           <Box>
            {isRegister ? 
            <Typography onClick ={() => setPage("login")} color='primary' sx={{"&:hover": {color: theme.palette.primary.dark, cursor: 'pointer'}}}>Have an account? Log in</Typography> 
              :  <Typography onClick ={() => setPage("register")} color='primary' sx={{"&:hover": {color: theme.palette.primary.dark, cursor: 'pointer'}}}>New here? Sign Up</Typography> 
            }           
           </Box>
      </Box>
      
    </>
  )
}

export default LoginPage