import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  container: {

    top: "40px",
    marginBottom: "100px",
    right: "80px",
    height: "auto",
    width: "100%",
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

function AddPost(props) {
  const classes = useStyles();
  const [blog, setBlog] = useState(props.blog);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogText, setBlogText] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [author, setAuthor] = useState("");
  const [postedOn, setPostedOn] = useState("");
  const [blogCategory, setBlogCategory] = useState("");

  const submit = (e) => {
    e.preventDefault();
    fetch(
      "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addBlog",
      {
        method: "POST",
        body: JSON.stringify({
          blogTitle,
          blogText,
          blogImage,
          blogCategory,
          author,
          postedOn,
          slug: 'NULL'

          // postedOn,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const handleChange = (event) => {
    setBlogCategory(event.target.value);
  };

  return (
    <div className="page-container ">
      <div className="addpost" id="addpost">
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
          Blog Entry
        </h1>
        <div className={classes.container}>
          <div className="col-md-5">
            <div className="form-area">
              <form role="form" onSubmit={submit}>
                <div>
                  <TextField
                    id="blogTitle"
                    value={blogTitle}
                    style={{ margin: 8, }}
                    placeholder="Title"
                    helperText="Enter Blog Title Here"
                    fullWidth
                    multiline
                    rows={2}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setBlogTitle(e.target.value)}
                  />
                </div>
                {/* <span className={classes.controls}>
                  <Button variant="outlined" onClick={onBoldClick()}>
                    <strong>B</strong>
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="outlined" onClick={onItalicsClick()}>
                    <em>I</em>
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant="outlined" onClick={onUnderlineClick()}>
                    <u>U</u>
                  </Button>
                  &nbsp;&nbsp;
                </span> */}
                <div>
                  <TextField
                    id="blogText"
                    value={blogText}
                    style={{ margin: 8 }}
                    placeholder="Blog Text"
                    helperText="Enter Blog Details Here"
                    fullWidth
                    multiline
                    rows={6}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setBlogText(e.target.value)}
                  />
                </div>
                <div className={classes.root}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    value={blogImage}
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      className={classes.btn}
                      component="span"
                      onChange={(e) => setBlogImage(e.target.value)}
                    >
                      Upload
                    </Button>
                  </label>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    value={blogImage}
                    type="file"
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="#d3a625"
                      aria-label="upload picture"
                      component="span"
                      onChange={(e) => setBlogImage(e.target.value)}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
                <div>
                  <InputLabel id="demo-simple-select-label">
                    Blog Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="Blog Category"
                    value={blogCategory}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Healty Tips"}>Healthy Tips</MenuItem>
                    <MenuItem value={"Recipes"}>Recipes</MenuItem>
                    <MenuItem value={"Living Well"}>Living Well</MenuItem>
                  </Select>
                </div>
                <div>
                  <TextField
                    label="Author"
                    id="author"
                    value={author}
                    placeholder="Author Name"
                    style={{ margin: 8 }}
                    className={classes.textField}
                    helperText="Enter your AuthorID"
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <TextField
                    id="postedOn"
                    label="Posted On"
                    value={postedOn}
                    style={{ margin: 8 }}
                    type="date"
                    defaultValue="2021-04-22"
                    helperText="Write today's date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setPostedOn(e.target.value)}
                  />
                </div>

                <Button
                  className={classes.btn}
                  variant="contained"
                  component="span"
                  type="button"
                  id="submit"
                  name="submit"
                  onClick={submit}
                >
                  Add Post
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
