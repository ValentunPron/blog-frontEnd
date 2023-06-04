import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { AddComment } from "./AddComment";

export const CommentsBlock = ({ items, isLoading = true, id, isAuth }) => {
  return (
    <SideBlock title="Коментарі">
      <List>
        {(isLoading ? [...Array(5)] : items[0]).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <>
                <ListItemAvatar>
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.text}
                  />
                )}
              </>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {isAuth.data ? <AddComment id={id} /> : <div style={{ marginLeft: '15px', paddingBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}><img src="https://cdn1.iconfinder.com/data/icons/user-fill-icons-set/144/User003_Error-512.png" width={48} height={48} alt="login error" />Потрібно зайти до свого облікового запису, щоб можна було лишати коментарі!</div>}
    </SideBlock>
  );
};
