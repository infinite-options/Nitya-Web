import React, { Component, useState } from "react";
import { fade } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareOutline from "@material-ui/icons/ShareOutlined";
import SearchIcon from "@material-ui/icons/Search";

const styles = (theme) => ({
  container: {
    position: "relative",
    top: "40px",
    marginBottom: "100px",
    left: "165px",
    right: "80px",
    height: "auto",
    width: "1285px",
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

  img: {
    height: 450,
    width: 550,
  },
  card: {
    boxShadow: "none",
    maxWidth: "auto",
    paddingLeft: "60px",
    paddingRight: "60px",
  },

  title: {
    fontFamily: "DidoteTextW01-Italic",
    color: "#594d2c",
    fontSize: "2.5rem",
    lineHeight: "1.6",
    paddingTop: "30px",
  },
  content: {
    fontSize: "1.2rem",
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
});

const submitSearch = (e) => {
  e.preventDefault();
  alert("Searched");
};

class Blogpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: "",
      value: "",
      anchorEl: null,
    };
  }

  componentDidMount() {
    fetch(
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/truncatedblog"
    )
      .then((response) => {
        return response.json();
        //console.log(response.json);
      })
      .then((data) => {
        let nameFromApi = data.result;
        console.log(nameFromApi);
        this.setState({
          data: nameFromApi,
        });
        console.log(data.result);
      });
  }
  handleClick = (event) => this.setState({ anchorEl: event.currentTarget });
  handleClose = () => this.setState({ anchorEl: null });
  render() {
    console.log("In render");

    const { data } = this.state;
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
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
                    <a href={path} key={title} className={classes.linkText}>
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

          {data.map((post) => (
            <div className="blogPostContainer">
              <Card className={classes.card}>
                <div className="blogHeader">
                  <span className={classes.content}>{post.postedOn}</span>
                  <IconButton
                    onClick={this.handleClick}
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
                    onClose={this.handleClose}
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
                      onClick={this.handleClose}
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
                <a href="" style={{ textDecoration: "none" }}>
                  <div>
                    <div className={classes.title}>
                      <h1>{post.blogTitle}</h1>
                    </div>

                    <div className={classes.content}>
                      <p>{post.blogText}</p>
                    </div>
                  </div>
                </a>
                <hr style={{ color: "#8d6f19" }}></hr>
                <div className={classes.cardActions}>
                  <p>
                    <span>Views </span>
                    <span>comments</span>
                  </p>

                  <IconButton className={classes.icon}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Blogpage);
