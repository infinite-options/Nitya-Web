import React, { useState, useEffect } from "react";

import { fade } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareOutline from "@material-ui/icons/ShareOutlined";
import SearchIcon from "@material-ui/icons/Search";
import AuthorIcon from "@material-ui/icons/AccountCircle";
import { useParams } from "react-router";
import ScrollToTop from "./ScrollToTop";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    top: "170px",
    marginBottom: "250px",
    minHeight: "710px",
    minWidth: "600px",
    height: "auto",
    width: "auto",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    display: "flex",
    boxShadow: "none",
    maxWidth: "auto",
    paddingLeft: "60px",
    paddingRight: "60px",
    ["@media (max-width:1000px)"]: {
      padding: "10px",
    },
  },
  header: {
    display: "flex-inline",
    fontFamily: "'Open Sans', sans-serif",
    color: "#8d6f19",
    fontSize: "1.6rem",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  title: {
    fontFamily: "DidoteTextW01-Italic",
    color: "#594d2c",
    fontSize: "4rem",
    lineHeight: "1.6",
  },
  img: {
    display: "flex",
    justifyContent: "center",
  },
  content: {
    fontSize: "1.8rem",
    fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "#8d6f19",
    lineHeight: "1.4",
    textAlign: "justify",
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
    boxShadow: "none",
    fontSize: "1.2rem",
    fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "#8d6f19",
    paddingBottom: "30px",
  },
  icon: {
    color: "red",
    float: "right",
  },
  author: {
    display: "flex",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

function FullBlog(props) {
  const [anchorEl, setanchorEl] = useState(null);
  const classes = useStyles();
  const [getBlogId, setBlogId] = useState([]);
  const { blog_uid } = useParams();
  const getDataById = async () => {
    const res = await fetch(
      `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/fullBlog/${blog_uid}`
    );
    const json = await res.json();
    return json.result;
  };
  useEffect(() => {
    getDataById().then((getBlogId) => {
      setBlogId(getBlogId);
    });
  }, []);

  const handleClick = (e) => {
    setanchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  return (
    <div className="page-container ">
      <div className="fullblog" id="fullblog">
        <ScrollToTop />
        <div className={classes.container}>
          {getBlogId.map((post) => (
            <div
              className="blogPostContainer"
              aria-label={"blog post" + post.blogTitle}
            >
              <Card className={classes.card}>
                <div>
                  <div className={classes.header}>
                    <span>
                      <IconButton
                        size="medium"
                        onClick={handleClick}
                        aria-label="click to share post"
                      >
                        <AuthorIcon />
                      </IconButton>
                      &nbsp;&nbsp; &nbsp;&nbsp;
                      {post.author} &nbsp;&nbsp; {post.postedOn}{" "}
                    </span>
                    <IconButton
                      onClick={handleClick}
                      style={{ float: "right" }}
                      aria-label="click to share post"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      elevation={0}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        style={{
                          color: "#594d2c",
                          width: "200px",
                          height: "50px",
                          padding: "0",
                          fontSize: "1.5rem",
                        }}
                        position="bottom"
                        onClick={handleClose}
                      >
                        <IconButton
                          fontSize="small"
                          aria-label="click to share post"
                        >
                          <ShareOutline />
                        </IconButton>
                        Share Post
                      </MenuItem>
                    </Menu>
                  </div>

                  <div className={classes.title}>
                    <p>{post.blogTitle}</p>
                  </div>
                  {!!post.blogImage && (
                    <div className={classes.img}>
                      <img
                        src={post.blogImage}
                        style={{
                          height: "500px",
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                        onError={(e) => (e.target.style.display = "none")}
                        aria-label={"an image of " + post.blogTitle}
                      />
                    </div>
                  )}
                  <div className={classes.content}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.blogText,
                      }}
                    />
                  </div>

                  <hr style={{ color: "#8d6f19" }}></hr>
                  <div className={classes.cardActions}>
                    <Typography>Views &nbsp;&nbsp; Comments</Typography>

                    <IconButton
                      className={classes.icon}
                      aria-label={"click icon to like the post"}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FullBlog;
