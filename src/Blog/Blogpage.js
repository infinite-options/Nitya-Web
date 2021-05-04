import React, { useState, useEffect } from "react";

import { fade } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareOutline from "@material-ui/icons/ShareOutlined";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    top: "70px",
    marginBottom: "150px",
    minHeight: "710px",
    minWidth: "600px",
    height: "auto",
    width: "auto",
    padding: "100px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  appbar: {
    backgroundColor: "#ffffff",
    boxShadow: "none",
    paddingBottom: "30px",
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
    height: "500px",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  header: {
    display: "flex-inline",
    fontFamily: "'Open Sans', sans-serif",
    color: "#8d6f19",
    fontSize: "1.2rem",
    paddingBottom: "10px",
  },
  desc: {
    marginLeft: "-50px",
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
    margin: "0 10px",
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
  const [filteredPosts, setFilteredPosts] = useState("");
  const [posts, setPosts] = useState("");
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
  /* const onResetArray = () => {
    setFilteredPosts({ filteredPosts: [] });
  };

  const healthyTips = () => {
    const { posts } = data;
    const healthyTips = posts.filter((post) =>
      posts.blogCategory.includes("healthy tips")
    );
    // const fordAutos = autoData.filter( (auto) => auto.title.includes("Ford"));

    setFilteredPosts({ filteredPosts: healthyTips });
  };

  const recipes = () => {
    const { posts } = data;
    const recipes = posts.filter((post) =>
      posts.blogCategory.includes("recipes")
    );
    // const chevyAutos = autoData.filter( (auto) => auto.title.includes("Chevrolet"));

    setFilteredPosts({ filteredPosts: recipes });
  };

  const livingWell = () => {
    const { posts } = data;
    const livingWell = posts.filter((post) =>
      posts.blogCategory.includes("living well")
    );
    // const jeepAutos = autoData.filter( (auto) => auto.title.includes("Jeep"));
    setFilteredPosts({ filteredPosts: livingWell });
  }; */

  const navLinks = [
    { title: `all posts`, path: `/all posts` },
    { title: `healthy tips`, path: `/healthy tips` },
    { title: `recipes`, path: `/recipes` },
    { title: `living well`, path: `/living well` },
  ];

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

        {data
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.blogTitle.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((post, key) => (
            <div
              className="blogPostContainer"
              key={key}
              aria-label={"blog post" + post.blogTitle}
            >
              <Card className={classes.card}>
                <Row>
                  <div>
                    <Col className="d-none d-sm-block">
                      {!!post.blogImage && (
                        <CardImg
                          className={classes.img}
                          variant="top"
                          src={post.blogImage}
                          style={{
                            width: "550px",
                            height: "450px",
                            objectFit: "cover",
                            objectPosition: "center -20px",
                          }}
                          onError={(e) => (e.target.style.display = "none")}
                          aria-label={"an image of " + post.blogTitle}
                        />
                      )}
                    </Col>
                  </div>
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

                      <IconButton
                        style={{ color: "red", float: "right" }}
                        aria-label={"click icon to like the post"}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        <div style={{ paddingBottom: "30px" }}>
          <div
            aria-label={"click button to add a blog entry"}
            style={{ padding: 10 }}
          >
            <Button variant="contained" className={classes.btn} href="/addpost">
              Add Blog Entry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogpage;
