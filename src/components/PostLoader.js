import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import WidgetWrapper from "./WidgetWrapper";

function PostLoader() {
  const mockArray = [1, 2, 3, 4];
  return (
    <div>
      {mockArray.map((el) => (
        <WidgetWrapper mb='1rem'>
          <Skeleton variant="circular" width={40} height={40} animation="wave" />
          <Skeleton variant="text" sx={{fontSize: '1rem', margin:'1rem auto'}} animation="wave"  />
          <Skeleton variant="rounded" sx={{width: 'full'}} height={200} animation="wave"/>
          <Skeleton variant="rounded" sx={{margin:'1rem 0', }} width={100} height={15} animation="wave"  />
        </WidgetWrapper>
      ))}
    </div>
  );
}

export default PostLoader;
