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
    marginTop: "100px",
    marginBottom: "100px",
    left: "200px",
    right: "80px",
    maxheight: "auto",
    width: "1430px",
    backgroundColor: "white",
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  appbar: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
    paddingBottom: "10px",
    paddingLeft: "300px",
    paddingRight: "80px",
    position: "fixed",
  },
  navbarDisplayFlex: {
    display: "flex",
    marginLeft: 0,
    justifyContent: "space-between",
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "capitalize",
    color: "#594d2c",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 0),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#594d2c",
  },
  inputRoot: {
    color: "#594d2cs",
  },
  inputInput: {
    boxShadow: "none",
    outline: "none",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  card: {
    display: "flex",
    boxShadow: "none",
    maxWidth: "auto",
    paddingLeft: "160px",
    paddingRight: "160px",
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
    maxWidth: "100%",
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

  const submitSearch = (e) => {
    e.preventDefault();
    alert("Searched");
  };

  const navLinks = [
    { title: `all posts`, path: `/all posts` },
    { title: `healthy tips`, path: `/healthy tips` },
    { title: `recipes`, path: `/recipes` },
    { title: `living well`, path: `/living well` },
  ];

  return (
    <div className="page-container ">
      <ScrollToTop />
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Container maxWidth="md" className={classes.navbarDisplayFlex}>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                <a
                  href={path}
                  key={title}
                  className={classes.linkText}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </a>
              ))}
            </List>
          </Container>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={submitSearch}>
              <input
                type="text"
                className={classes.inputInput}
                placeholder="Search..."
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        {getBlogId.map((post) => (
          <div className="blogPostContainer">
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
                        width: "1000px",
                        height: "600px",
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
                <div className={classes.content}>
                  <p>{post.blogText}</p>
                </div>

                <hr style={{ color: "#8d6f19" }}></hr>
                <div className={classes.cardActions}>
                  <Typography>Views &nbsp;&nbsp; Comments</Typography>

                  <IconButton className={classes.icon}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FullBlog;
