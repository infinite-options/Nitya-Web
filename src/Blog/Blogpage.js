import {
    AppBar,

    IconButton,
    List,
    Menu,
    MenuItem, Toolbar
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import { fade, makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ShareOutline from "@material-ui/icons/ShareOutlined";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import BlogEntries from "./BlogEntries";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    top: "70px",
    marginBottom: "150px",
    minHeight: "710px",
    minWidth: "600px",
    height: "auto",
    width: "auto",
    /*
     * remove this padding to get rid
     * of all the white space at the top
     */
  //  padding: "100px",
    backgroundColor: "white",
  },
  appbar: {
   // backgroundColor: "#ffffff",
      backgroundColor: "#8d6f1a",
    boxShadow: "none",
    //paddingBottom: "30px",
    color: "#000000",
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
  //handles the text of menubuttons "all post"
  menuBtns: {
    backgroundColor: "#8d6f1a",
    color: "white",
      boxShadow: "none",
    paddingRight: "30px",
 
    /*deletes the space between the menu buttons */
    // margin: "10px",
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
    color: "white",
  },
  inputRoot: {
    color: "#594d2cs",
    },
  //Code for SearchBar 
  inputInput: {
   
      borderRadius:"15px",
    boxShadow: "none",
    outline: "none",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        // adjusts searchbox size
      width: "12ch",
        "&:focus": {
          //width: "50ch",
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
    marginLeft: "-20px",
  },
  title: {
    fontFamily: "DidoteTextW01-Italic",
    color: "#594d2c",
    fontSize: "2rem",
    lineHeight: "1.6",
  },
  content: {
    fontSize: "1.2rem",
    fontFamily: "'Open Sans', sans-serif",
    wordWrap: "break-word",
    color: "#8d6f19",
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
      <h1
        style={{
          textAlign: "center",
          fontFamily: "DidoteTextW01-Italic",
          fontStyle: "italic",
          fontSize: "4.5rem",
          wordWrap: "break-word",
          color: "#d3a625",
        }}
      >
        Blog
      </h1>
          <div className={classes.container}>
              <h1 style={{
                  textAlign: "center",
                  fontFamily: "DidoteTextW01-Italic",

                  fontSize: "4.5rem",
                  wordWrap: "break-word",
                  color: "#d3a625",
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
                      <div>
                          <input
                              placeholder="Search" type="text"
                              width="300px" 
                              className={classes.inputInput}
                              onChange={(event) => {
                                  setSerchTerm(event.target.value);
                              }}

                          />
                      </div> 
            <div
              className={classes.search}
              aria-label={"Enter text to search blog content"}
            >
              <div className={classes.searchIcon}>
                <SearchIcon />
                          </div>
                          
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
                          
                            {!!post.blogImage && (
                                    <img src={post.blogImage}
                                className={classes.img}
                                id="blogImage"
                                variant="top"
                                style={{
                                  width: "550px",
                                  height: "450px",
                                  objectFit: "cover",
                                  objectPosition: "center -20px",  }}
                                onError={(e) =>
                                  (e.target.style.display = "none")}
                                                  aria-label={"an image of " + post.blogTitle}
                              />
                            )}
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
                        <hr style={{ color: "#8d6f19" }}></hr>
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
                          {!!post.blogImage && (
                            <img
                              className={classes.img}
                              id="blogImage"
                              variant="top"
                              src={post.blogImage}
                              style={{
                                width: "550px",
                                height: "450px",
                                objectFit: "cover",
                                objectPosition: "center -20px",
                              }}
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          )}
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
                      <hr style={{ color: "#8d6f19" }}></hr>
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
