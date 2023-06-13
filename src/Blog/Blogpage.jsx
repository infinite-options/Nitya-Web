import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Menu,
  Modal,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import ReactPlayer from "react-player";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import defaultImg from "../Assets/Images/Blog-Default-Img.png";
import { Markup } from "interweave";
import { AuthContext } from "../auth/AuthContext";
import AddIcon from "@material-ui/icons/Add";
import { Helmet } from "react-helmet";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import ScrollToTop from "./ScrollToTop";
import "../Appointment/AppointmentPage.css";
import "../Home/Home.css";
import Cookies from "js-cookie";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  blogpage: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (min-width: 700px) and (max-width: 900px)": {
      margin: "5% 0% 5% 0%",
      width: "100%",
    },
    "@media (min-width: 200px) and (max-width: 700px)": {
      margin: " 5% 0% 5% 0%",
      width: "100%",
    },
  },
  container: {
    marginBottom: "5%",
    backgroundColor: "white",
    // marginRight: "200px",
    // marginLeft: "200px",
    margin: "5% 5% 5% 5%",
    fontFamily: "Hoefler Text",
    // display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (min-width: 700px) and (max-width: 900px)": {
      margin: "5% 0% 5% 0%",
      width: "100%",
    },
    "@media (min-width: 200px) and (max-width: 700px)": {
      margin: " 5% 0% 5% 0%",
      width: "100%",
    },
  },
  card: {
    // width: "100%",
    height: "auto",
    margin: "1% 5% 5% 1%",
    backgroundColor: "white",
    // display: "flex",
    "@media (min-width: 700px) and (max-width: 900px)": {
      width: "50%",
    },
    "@media (min-width: 200px) and (max-width: 700px)": {
      width: "100%",
    },
  },
  appbar: {
    backgroundColor: "white",
    boxShadow: "none",
    padding: "4px",
    color: "black",
    "@media (max-width: 880px)": {
      display: "none",
    },
  },
  navbarDisplayFlex: {
    display: "flex",
    marginLeft: 0,
    justifyContent: "space-between",
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "60%",
  },
  linkText: {
    textDecoration: "none",
    textTransform: "capitalize",
    color: "black",
  },
  search: {
    display: "inline-block",
    borderRadius: "15px",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIconDiv: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "10px",
  },
  searchContainer: {
    display: "flex",
  },

  inputInput: {
    padding: "10px",
    boxShadow: "none",
    outline: "none",
    width: "450px",
    borderRadius: "0px",
    border: "none",
    borderBottom: "1px solid black",
    "&::placeholder": {
      color: "#C3A336",
    },
    "@media (max-width: 1430px)": {
      width: "200px",
    },
  },

  // card: {
  //   display: "block",
  //   boxShadow: "none",
  //   paddingTop: "30px",
  //   paddingBottom: "30px",
  //   paddingLeft: "30px",
  //   "@media (max-width: 1100px)": {},
  // },
  cardRow: {
    display: "flex",
    "@media (max-width: 500px)": {
      display: "flex",
      flexDirection: "column",
    },
  },

  blogImg: {
    width: "25rem",
    height: "20rem",
    objectFit: "cover",
    objectPosition: "top",
    "@media (max-width: 700px)": {
      width: "100%",
      // marginLeft: "-15px",
      height: "90%",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    color: "#8d6f19",
    fontSize: "1.2rem",
    paddingBottom: "10px",
    // width: "30rem",
    "@media (max-width: 570px)": {
      width: "100%",
    },
  },
  desc: {
    // padding: "5%",
    // marginLeft: "-40px",
    display: "flex",
    flexDirection: "column",
    "@media (min-width: 700px) and (max-width: 900px)": {
      width: "50%",
    },
    "@media (min-width: 200px) and (max-width: 700px)": {
      width: "100%",
    },
  },
  title: {
    color: "black",
    fontStyle: "italic",
    fontSize: "2rem",
    lineHeight: "1.6",
  },
  content: {
    fontSize: "1.2rem",
    fontFamily: "SF Pro Display",
    wordWrap: "break-word",
    color: "black",
    lineHeight: "1.4",
    textAlign: "justify",
    padding: "10px",
  },
}));

function Blogpage(props) {
  const [anchorEl, setanchorEl] = useState(null);
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [play, setPlay] = useState(false);

  const history = useHistory();
  const Auth = useContext(AuthContext);
  console.log(Auth);
  const handleOpenAvailabilityModal = () => history.push("/availability");
  const logout = () => {
    Auth.setIsAuth(false);
    Auth.setIsLoggedIn(false);
    history.push("/");
  };

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

  const submitSearch = (e) => {
    e.preventDefault();
    alert("Searched");
  };

  const convertDate = (date) => {
    if (date) {
      const year = date.substring(0, 4);
      let month = date.substring(5, 7);
      const day = date.substring(8, 10);

      switch (month) {
        case "01":
          month = "Jan";
          break;
        case "02":
          month = "Feb";
          break;
        case "03":
          month = "Mar";
          break;
        case "04":
          month = "Apr";
          break;
        case "05":
          month = "May";
          break;
        case "06":
          month = "Jun";
          break;
        case "07":
          month = "Jul";
          break;
        case "08":
          month = "Aug";
          break;
        case "09":
          month = "Sep";
          break;
        case "10":
          month = "Oct";
          break;
        case "11":
          month = "Nov";
          break;
        case "12":
          month = "Dec";
          break;
        default:
          month = date.substring(5, 7);
      }
      return month + " " + day + ", " + year;
    }
    return "";
  };

  const navLinks = [
    { title: `all posts`, path: `/blog` },
    { title: `healthy tips`, path: `/healthy tips` },
    { title: `recipes`, path: `/recipes` },
    { title: `living well`, path: `/living well` },
  ];

  function handleDelete(blog_id) {
    axios
      .post(
        `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/deleteBlog/${blog_id}`
      )
      .then((response) => {
        console.log("delete", response.data);
        window.location.reload();
      });
  }

  return (
    <div className="HomeContainer">
      <Helmet>
        <title>Blog</title>
        <meta
          name="description"
          content="Ayurvedic Musings about health, recipies and living well"
        />
        <link rel="canonical" href="/blog" />
      </Helmet>
      <ScrollToTop />
      <div className={classes.blogpage} id="blogpage">
        <div className="CardTitle" style={{ margin: "2rem" }}>
          Blog
        </div>
        <div className={classes.container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              textAlign: "center",
              color: "#C3A336",
              fontSize: "31px",
              padding: "10px",
            }}
          >
            <div hidden={Auth.isAuth === false}>
              <AddIcon
                size="lg"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/addPost");
                }}
              />
            </div>
          </div>

          <AppBar className={classes.appbar} position="static">
            <Toolbar>
              <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navDisplayFlex}
                >
                  {navLinks.map(({ title, path }) => (
                    <Link
                      to={path}
                      key={title}
                      className={classes.linkText}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem button>
                        <ListItemText primary={title} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Container>
              <div className={classes.searchContainer}>
                <div className={classes.search}>
                  <form onSubmit={submitSearch}>
                    <input
                      type="text"
                      className={classes.inputInput}
                      placeholder="Search..."
                    />
                  </form>
                </div>
                <div className={classes.searchIconDiv}>
                  <SearchIcon fontSize="small" />
                </div>
              </div>
            </Toolbar>
          </AppBar>

          {data.map((post) => (
            <div className="blogPostContainer">
              <div>
                <div className={classes.cardRow}>
                  <div className={classes.card}>
                    <div>
                      {console.log(post.blogImage.split("/")[4])}
                      {post.blogImage.split("/")[4] == "blogs" ? (
                        <img
                          src={
                            post.blogImage !== "NULL" && post.blogImage
                              ? post.blogImage
                              : defaultImg
                          }
                          className={classes.blogImg}
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ) : (
                        <div onClick={() => setPlay(!play)}>
                          <ReactPlayer
                            width="25rem"
                            height="25rem"
                            url={post.blogImage}
                            playing={play}
                          />
                        </div>
                      )}
                      {/* <img
                        src={
                          post.blogImage !== "NULL" && post.blogImage
                            ? post.blogImage
                            : defaultImg
                        }
                        className={classes.blogImg}
                        onError={(e) => (e.target.style.display = "none")}
                      /> */}
                    </div>
                  </div>
                  <div className={classes.desc}>
                    <div className={classes.header}>
                      {convertDate(post.postedOn)}

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
                      ></Menu>
                      <div
                        hidden={Auth.isAuth === false}
                      // style={{ }}
                      >
                        {/* http://localhost:4000/api/v2/deleteBlog/150-000048 */}
                        <DeleteForeverSharpIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleDelete(post.blog_uid);
                          }}
                        />
                        <EditSharpIcon
                          size="lg"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            history.push(`/${post.blog_uid}/addpost`);
                          }}
                        />
                      </div>
                    </div>
                    <Link
                      to={`/${post.blog_uid}/fullblog`}
                      style={{ textDecoration: "none" }}
                    >
                      <div>
                        <div className={classes.title}>
                          <div style={{ textAlign: "left" }}>
                            {post.blogTitle}
                          </div>
                        </div>
                        <div className={classes.content} style={{}}>
                          <Markup content={post.blogSummary} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {console.log(Auth)}
      </div>
      <div hidden={Auth.isAuth === false}>
        <Button
          style={{
            backgroundColor: "#d3a625",
            color: "white",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
          onClick={() => handleOpenAvailabilityModal()}
        >
          Practitioner Availabilty
        </Button>
      </div>
      <div hidden={Auth.isAuth === false}>
        <Button
          style={{
            backgroundColor: "#d3a625",
            color: "white",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Blogpage;
