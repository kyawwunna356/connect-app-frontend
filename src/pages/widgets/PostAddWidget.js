import { Delete, EditAttributes, Image } from '@mui/icons-material'
import { Button, IconButton, InputBase, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import FlexBetween from '../../components/FlexBetween'
import UserImage from '../../components/UserImage'
import WidgetWrapper from '../../components/WidgetWrapper'
import { addPost } from '../../redux/features/postSlice'

function PostAddWidget() {
  const [input,setInput] = useState('');
  const [imageFile,setImageFile] = useState(null);
  const [isDropZoneOpen,setIsDropZoneOpen] = useState(false);
  const {userData,token} = useSelector(state => state.user)
  const {postAddstatus,postAddError} = useSelector(state => state.user)
  const dispatch = useDispatch()
  //colors
  const theme = useTheme()
  const light = theme.palette.neutral.light;
  const medium = theme.palette.neutral.medium;

  const handleDelete = () => {
    setImageFile(null)
  }

  const handlePost = () => {
    const formData = new FormData()
    formData.append('description',input)
    formData.append('userId',userData._id)
    if(imageFile) {
      formData.append('imageFile',imageFile)
    }
    if(formData.get('description') !== '' || formData.get('imageFile') !== null){
      console.log(formData)
      dispatch(addPost({formData,token})).unwrap()
      .then(() =>{
        setInput('')
        setImageFile(null)
        setIsDropZoneOpen(false)
      })
    }
  }

  return (
    <WidgetWrapper>
        <FlexBetween gap='1rem' mb='1rem'>
            <UserImage imagePath={userData.imagePath} />
            <InputBase placeholder='Whats on your mind...' 
              onChange = {(e) => setInput(e.target.value)}
              value={input}
              sx={{
                width: '100%',
                backgroundColor: light,
                borderRadius: '1rem',
                padding: '1rem 2rem',
              }}/>
          
        </FlexBetween>
        {
          isDropZoneOpen && (
            <Box mb='1rem' p='0.75rem' border={`1px solid ${medium}`} cursor ="pointer">
              <Dropzone 
                accept= {{ 'image/png': ['.png'], 'image/jpg': ['.jpg'] }}
                mulitple = {false}
                onDrop={acceptedFiles => setImageFile(acceptedFiles[0])}>
                {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                  <FlexBetween p='1rem' border={`1px dashed ${theme.palette.primary.main}`}>
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Typography component={'span'} sx={{cursor: "pointer"}}>
                        {imageFile ? 
                          <FlexBetween>
                            <Typography component={'span'} >{imageFile.name}</Typography>
                            
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
                    {
                    Boolean(imageFile) &&
                    <IconButton onClick={handleDelete}>
                      <Delete />
                    </IconButton>}
                  </FlexBetween> 
                  )}
                    </Dropzone>
            </Box>
          )
        }
        <FlexBetween>
          <Button onClick={() => setIsDropZoneOpen(prev => !prev)} sx={{width:' 40%', color: theme.palette.primary.main}}>
            <Image sx={{mr:'0.5rem'}}/>
            <Typography>Attach an image</Typography>
          </Button>
          <Button onClick={handlePost} variant="contained" sx={{width:' 40%'}}
              disabled={postAddstatus === "loading" ? true : false}
          >
            <Typography color={light}>{postAddstatus === "loading" ? 'Loading...' : postAddstatus === "error" ? postAddError : 'Post it!'}</Typography>

          </Button>
        </FlexBetween>
    </WidgetWrapper>
  )
}

export default PostAddWidget