import React, { useState, useEffect } from "react";
import { fade } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareOutline from "@material-ui/icons/ShareOutlined";
import SearchIcon from "@material-ui/icons/Search";
import BlogEntries from "./BlogEntries";
import NityaLogo from "../Nitya Ayurveda Logo.png";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    top: "70px",
    marginBottom: "150px",
    minHeight: "710px",
    minWidth: "600px",
    height: "auto",
    width: "auto",
    // padding: "100px",
    backgroundColor: "white",
  },
  appbar: {
    backgroundColor: "#B28D42",
    boxShadow: "none",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "60px",
    color: "#000000",
  },
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  navDisplayFlex: {
    display: "flex",
    marginLeft: 0,
    justifyContent: "space-between",
  },
  menuBtns: {
    backgroundColor: "#B28D42",
    fontSize: "18px",
    color: "#ffffff",
    boxShadow: "none",
    // border: "1px solid #d3a625",
    borderRadius: "10%",
    margin: " 0 20px",
    "&:hover": {
      textDecoration: "underline",
    },
    "&:focus": {
      textDecoration: "underline",
      outline: "none",
      boxShadow: "none",
    },
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
    color: "#B28D42",
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
  blogPostContainer: {
    display: "flex",
    alignItems: "flex-end",
  },

  card: {
    width: "100%",
    boxShadow: "none",
    alignItems: "stretch",
    minHeight: "500px",
  },

  header: {
    display: "flex-inline",
    fontFamily: "'Open Sans', sans-serif",
    color: "#8d6f19",
    fontSize: "1.2rem",
    paddingBottom: "10px",
  },
  desc: {
    // marginLeft: "-5px",
  },
  title: {
    fontFamily: "DidoteTextW01",
    color: "#B28D42",
    fontSize: "2rem",
    lineHeight: "1.6",
  },
  content: {
    fontSize: "1.2rem",
    fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "black",
    lineHeight: "1.4",
    textAlign: "justify",
    paddingTop: "30px",
    paddingBottom: "10px",
  },
  cardActions: {
    display: "flex",
    margin: "0 5px",
    justifyContent: "space-between",
    boxShadow: "none",
    fontSize: "1.2rem",
    fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "#8d6f19",
  },

  author: {
    display: "flex",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

function Blogpage(props) {
  const [anchorEl, setanchorEl] = useState(null);
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [searchTerm, setSerchTerm] = useState("");
  const [catName, setCatName] = useState("");
  const fetchData = async () => {
    const res = await fetch(
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/truncatedBlog"
    );
    const json = await res.json();
    return json.result;
  };
  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
    });
  }, []);

  const handleClick = (e) => {
    setanchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setanchorEl(null);
  };

  const cats = [...new Set(data.map((q) => q.blogCategory))];

  return (
    <div className="blogpage" id="blogpage">
      <br />

      <div className={classes.container}>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "DidoteTextW01",
            fontSize: "4rem",
            wordWrap: "break-word",
            color: "#d3a625",
            padding: "2rem",
          }}
        >
          Ayurvedic Musings
        </h1>
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
            <Container maxWidth="md" className={classes.navbarDisplayFlex}>
              <List
                component="nav"
                aria-labelledby="main navigation"
                className={classes.navDisplayFlex}
              >
                <div className={classes.navDisplayFlex}>
                  <button
                    className={classes.menuBtns}
                    onClick={() => setCatName(cats)}
                  >
                    All Posts
                  </button>
                </div>
                {cats.map((title, i) => (
                  <button
                    className={classes.menuBtns}
                    key={i}
                    onClick={() => setCatName(title)}
                  >
                    {title}
                  </button>
                ))}
              </List>
            </Container>
            <div
              className={classes.search}
              aria-label={"Enter text to search blog content"}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <input
                type="text"
                className={classes.inputInput}
                onChange={(event) => {
                  setSerchTerm(event.target.value);
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div>
          {data
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.blogTitle.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })

            .map((post, key) => {
              return catName === post.blogCategory ? (
                <div className={classes.blogPostContainer} key={key}>
                  <Card className={classes.card}>
                    <Row>
                      <Hidden only={["xs", "sm", "md"]}>
                        <div>
                          <Col>
                            {
                              (console.log("image:" + post.blogImage),
                              !!post.blogImage && (
                                <img
                                  className={classes.img}
                                  id="blogImage"
                                  variant="top"
                                  src={
                                    post.blogImage == "NULL"
                                      ? NityaLogo
                                      : post.blogImage
                                  }
                                  style={{
                                    width: "400px",
                                    // height: "80%",
                                    objectFit: "cover",
                                    objectPosition: "center -20px",
                                  }}
                                  onError={(e) =>
                                    (e.target.style.display = "none")
                                  }
                                  aria-label={"an image of " + post.blogTitle}
                                />
                              ))
                            }
                          </Col>
                        </div>
                      </Hidden>
                      <Col className={classes.desc}>
                        <div className={classes.header}>
                          {post.postedOn}
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
                                color: "#B28D42",
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
                              Share
                            </MenuItem>
                          </Menu>
                        </div>
                        <Link
                          to={`/${post.blog_uid}/fullblog`}
                          style={{ textDecoration: "none" }}
                        >
                          <div>
                            <div className={classes.title}>
                              <p>{post.blogTitle}</p>
                            </div>
                            <div className={classes.content}>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: post.blogText,
                                }}
                              />
                            </div>
                          </div>
                        </Link>
                        <hr style={{ borderTop: "2px solid #B28D42" }}></hr>
                        <div className={classes.cardActions}>
                          <p>
                            <span>Views &nbsp;&nbsp; Comments</span>
                          </p>

                          <IconButton style={{ color: "red", float: "right" }}>
                            <FavoriteBorderIcon />
                          </IconButton>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </div>
              ) : null;
            })}
        </div>
        <div>
          {data
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.blogTitle.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((post, key) => (
              <div className={classes.blogPostContainer} key={key}>
                <Card className={classes.card}>
                  <Row>
                    <Hidden only={["xs", "sm", "md"]}>
                      <div>
                        <Col>
                          {
                            (console.log("image:" + post.blogImage),
                            !!post.blogImage && (
                              <img
                                className={classes.img}
                                id="blogImage"
                                variant="top"
                                src={
                                  post.blogImage == "NULL"
                                    ? NityaLogo
                                    : post.blogImage
                                }
                                style={{
                                  width: "400px",
                                  // height: "80%",
                                  objectFit: "cover",
                                  objectPosition: "center -20px",
                                }}
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                }
                              />
                            ))
                          }
                        </Col>
                      </div>
                    </Hidden>

                    <Col className={classes.desc}>
                      <div className={classes.header}>
                        {post.postedOn}
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
                              color: "#B28D42",
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
                            Share
                          </MenuItem>
                        </Menu>
                      </div>
                      <Link
                        to={`/${post.blog_uid}/fullblog`}
                        style={{ textDecoration: "none" }}
                      >
                        <div>
                          <div className={classes.title}>
                            <p>{post.blogTitle}</p>
                          </div>
                          <div className={classes.content}>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: post.blogText,
                              }}
                            />
                          </div>
                        </div>
                      </Link>
                      <hr style={{ borderTop: "2px solid #B28D42" }}></hr>
                      <div className={classes.cardActions}>
                        <p>
                          <span>Views &nbsp;&nbsp; Comments</span>
                        </p>

                        <IconButton style={{ color: "red", float: "right" }}>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))}
        </div>
        <div>
          <BlogEntries />
        </div>
      </div>
    </div>
  );
}

export default Blogpage;
