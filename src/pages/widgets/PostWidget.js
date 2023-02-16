import { useTheme } from '@emotion/react'
import { Comment, FavoriteBorderOutlined, Send } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Divider, IconButton, InputBase, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Friend from '../../components/Friend'
import WidgetWrapper from '../../components/WidgetWrapper'
import { toggleLikePost, writeComment } from '../../redux/features/postSlice'
import { formatDistanceToNow } from 'date-fns'
import FlexBetween from '../../components/FlexBetween';
import CustomComment from '../../components/CustomComment';
import { SERVER_URL } from '../../utils';

function PostWidget({ postId,userId,name,location,description,imagePath,profilePath,likes,comments,createdAt,}) {
  const theme = useTheme()
  const light = theme.palette.neutral.light;
  const dispatch = useDispatch()
  const [iscommentOpen,setIsCommentOpen] = useState(false)
  const [text,setText] = useState('')
  const {userData:{_id},token} = useSelector(state => state.user)
  const isLiked = likes[_id]

  const handleLike = () => {
    dispatch(toggleLikePost({postId,userId: _id,token}))
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handlewriteComment = () => {
    if(text !== '') {
      dispatch(writeComment({postId,token,userId:_id,text}))
      setText('')
    }
  }
  
  return (
    <WidgetWrapper mb='1rem'>
        <Friend profilePath={profilePath} location={location} name={name} friendId={userId} postId={postId}/>
        <Box mt='1rem' mb='0.75rem'>
          <Divider />
        </Box>
        <Box>
          <Typography mb="0.5rem" variant="subtitle1" fontSize='12' color={theme.palette.neutral.mediumMain}>{formatDistanceToNow(new Date(createdAt),{addSuffix:true})}</Typography>
        </Box>
        <Box mb="1rem">
          <Typography mb='1rem' color={theme.palette.neutral.main}>{description}</Typography>
          {imagePath && <img style={{objectFit: 'cover', width:'100%',borderRadius: '0.5rem'}} src={`${SERVER_URL}/assets/${imagePath}`} alt="postImage" />}
          </Box>
          {/* likes and comments */}
          <Box display='flex' align-items="center" >
            <Box display='flex' align-items='center' mr="1rem">
              <IconButton onClick={handleLike} >
                {
                  isLiked ? 
                  <FavoriteIcon sx={{marginRight:'0.5rem'}}/>
                  : 
                  <FavoriteBorderOutlined sx={{marginRight:'0.5rem'}}/>
                }
              </IconButton>
              <Typography sx={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>{Object.keys(likes).length}</Typography>
            </Box>
  
            <Box display='flex' align-items='center'>
              <IconButton onClick={() => setIsCommentOpen(prev => !prev)}>
                <Comment sx={{marginRight:'0.5rem'}}/>
              </IconButton>
              <Typography sx={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>{comments.length}</Typography>
            </Box>
          </Box>
          
          {iscommentOpen && 
         ( 
          <>
          <FlexBetween sx={{background: light, p: '0.2rem', margin: '0.5rem auto',borderRadius: '1rem'}}>
            <InputBase placeholder='write a comment...' sx={{padding: '0.5rem',width:"100%"}} onChange={handleChange} value={text}/>
            <IconButton onClick={handlewriteComment}>
              <Send />
            </IconButton>
            
            {/* comments */}
            
          </FlexBetween>
            <Box mt='1rem'>
              {comments.length > 0 && comments.map((comment,i) => <CustomComment key={i} comment={comment}/>)}
            </Box>
            </> 
            )
          
          }


    </WidgetWrapper>
  )
}

export default PostWidget