import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory } from "react-router-dom";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Editor } from "@tinymce/tinymce-react";
import ImageUploading from "react-images-uploading";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router";
import ScrollToTop from "./ScrollToTop";
import axios from "axios";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    top: "40px",
    marginBottom: "100px",
    height: "auto",
    width: "100%",
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: "20px",
    fontSize: "1.5rem",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    boxShadow: "none",
  },
}));

function AddPost(props) {
  const classes = useStyles();
  const history = useHistory();

  const [blog, setBlog] = useState(props.blog);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogText, setBlogText] = useState("");
  const [blogSummary, setblogSummary] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [author, setAuthor] = useState("");
  const [postedOn, setPostedOn] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogEditImage, setBlogEditImage] = useState("");
  const [blogEditSummary, setBlogEditSummary] = useState("");
  const [blogEditText, setBlogEditText] = useState("");

  const [images, setImages] = useState([]);
  const { blog_uid } = useParams();

  const [file, setFile] = useState("");

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSource(file);
  };
  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    //  onFileChange(imageList);
  };

  const editorRef = useRef(null);
  const editorSummaryRef = useRef(null);
  const blogTextMax = 5
  const blogSummaryMax = 5

  const logBlogText = () => {
    console.log("editor", editorRef.current.getContent(), "count:", editorRef.current.plugins.wordcount.getCount());
    if (editorRef.current.plugins.wordcount.getCount() > blogTextMax) {
      alert("Maximum " + blogTextMax + " words allowed. Please save again after removing extra words.")
    }
    else {
      setBlogText(editorRef.current.getContent());
    }

    console.log(blogText)
  };

  const logBlogSummary = () => {
    console.log("editor", editorSummaryRef.current.getContent(), "count:", editorSummaryRef.current.plugins.wordcount.getCount());
    if (editorSummaryRef.current.plugins.wordcount.getCount() > blogSummaryMax) {
      alert("Maximum " + blogSummaryMax + " words. Please save again after removing extra words.")
    }
    else {
      setblogSummary(editorSummaryRef.current.getContent());
    }

    console.log(blogSummary)
  }

  // Due to SQL String Syntax we should replace single quote to two single quote. If backend starts to handle this problem, you may remove this function.
  const textToDoubleApostrophes = (text) => {
    return text.replace(/'/g, "''");
  }

  useEffect(() => {
    if (blog_uid) {
      axios
        .get(
          `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/fullBlog/${blog_uid}`
        )
        .then((response) => {
          console.log("fullblog", response.data.result[0]);
          setAuthor(response.data.result[0].author);
          setPostedOn(response.data.result[0].postedOn);
          setBlogTitle(response.data.result[0].blogTitle);
          setBlogCategory(response.data.result[0].blogCategory);
          setFile(response.data.result[0].blogImage);
          setblogSummary(response.data.result[0].blogSummary);
          setBlogEditSummary(response.data.result[0].blogSummary);
          setBlogText(response.data.result[0].blogText);
          setBlogEditText(response.data.result[0].blogText);
        });
    }
  }, []);

  const submit = (e) => {
    // updateData()

    e.preventDefault();

    if (editorSummaryRef.current.plugins.wordcount.getCount() > blogSummaryMax || editorRef.current.plugins.wordcount.getCount() > blogTextMax) {
      alert("One of the text editors has gone over the word limit (Summary word limit is " + blogSummaryMax + " words. Blog text word limit is " + blogTextMax + " words.) Please save after removing extra words and try publishing again.")
    }
    else {
      axios
      .post(
        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addBlog",
        {
          blogTitle: textToDoubleApostrophes(blogTitle),
          blogText: textToDoubleApostrophes(blogText),
          blogImage: file,
          blogSummary: textToDoubleApostrophes(blogSummary),
          blogCategory,
          author: textToDoubleApostrophes(author),
          postedOn,
          slug: "NULL",
        }
      )
      .then((response) => {
        console.log(response);
        history.push("/blog");
      });
    }
  };

  const handleChange = (event) => {
    setBlogCategory(event.target.value);
  };

  const updateData = () => {
    // postData.item_photo = file.obj; // change to File object
    var imageList = [];

    for(var i = 0; i < images.length; i++) {
      let formData = new FormData();
      console.log("File", images[i].file);
      formData.append("filename", images[i].file.name);
      formData.append("item_photo", images[i].file);

      axios
        .post(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/uploadImage",
          formData
        )
        .then((response) => {
          console.log("image", response.data);
          imageList.push(response.data);
          setFile(imageList);
          var imageString = "";
          for(var i = 0; i < imageList.length; i++) {
            imageString = imageString + imageList[i] + ","
          }
          imageString = imageString.substring(0, imageString.length-1)
          console.log("imageString", imageString)
          setFile(imageString);
          //  history.push("/blog")
        });
    }
  };
  
  const updateVideo = () => {
    // postData.item_photo = file.obj; // change to File object

    let formData = new FormData();

    console.log("File", source);
    formData.append("filename", source.name);
    formData.append("item_video", source);

    axios
      .post(
        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/uploadVideo",
        formData
      )
      .then((response) => {
        console.log("video", response.data);
        setFile(response.data);
        //  history.push("/blog")
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#DADADA",
        width: "auto",
      }}
    >
      <ScrollToTop />
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
          Create a Blog
        </h1>
        <div
          className={classes.container}
          style={{ width: "60rem", paddingTop: "2rem" }}
        >
          <Row
            style={{
              display: "flex",
              marginLeft: "5rem",
              marginRight: "5rem",
              justifyContent: "space-between",
            }}
          >
            <div>
              <TextField
                id="blogTitle"
                value={blogTitle}
                style={{ width: "500%" }}
                placeholder="Title"
                helperText="Enter Blog Title Here"
                width="100%"
                multiline
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </div>
          </Row>
          <Row
            style={{
              display: "flex",
              marginTop: "1rem",
              marginLeft: "5rem",
              justifyContent: "space-between",
            }}
          >
            <Col>
              <TextField
                label="Author"
                id="author"
                value={author}
                placeholder="Author Name"
                className={classes.textField}
                helperText="Enter your AuthorID"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Col>
            <Col>
              <TextField
                id="postedOn"
                label="Posted On"
                value={postedOn}
                type="date"
                defaultValue="2021-04-22"
                helperText="Write today's date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setPostedOn(e.target.value)}
              />
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                align: "right",
                marginRight: "7.6rem",
              }}
            >
              Thumbnail
              <div>
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <button
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Choose file
                      </button>
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => updateData()}>
                          Upload All
                        </button>
                      </div>
                      &nbsp;
                      {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                      {imageList.map(
                        (image, index) => (
                          setBlogImage(image.data_url),
                          (
                            <div key={index} className="image-item">
                              <img
                                src={
                                  blogEditImage == ""
                                    ? image.data_url
                                    : blogEditImage
                                }
                                alt=""
                                width="100"
                              />
                              <div className="image-item__btn-wrapper">
                                {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                                <button onClick={() => onImageRemove(index)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          )
                        )
                      )}
                    </div>
                  )}
                </ImageUploading>
              </div>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              marginTop: "2rem",
              marginLeft: "5rem",
              justifyContent: "space-between",
            }}
          >
            <Col>
              <InputLabel id="demo-simple-select-label">
                Blog Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="Blog Category"
                value={blogCategory}
                onChange={handleChange}
                style={{ width: "120%" }}

                // onClick={log}
              >
                <MenuItem value={"Healty Tips"}>Healthy Tips</MenuItem>
                <MenuItem value={"Recipes"}>Recipes</MenuItem>
                <MenuItem value={"Living Well"}>Living Well</MenuItem>
              </Select>
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                align: "right",
                marginTop: "-1rem",
              }}
            >
              Video Upload
              <div>
                <input
                  ref={inputRef}
                  className="VideoInput_input"
                  type="file"
                  onChange={handleFileChange}
                  accept=".mov,.mp4"
                />
                <div className="image-item">
                  {source && (
                    <video
                      className="VideoInput_video"
                      width="100%"
                      height="50%"
                      controls
                      src={source}
                    />
                  )}
                  {/* <div className="VideoInput_footer">
                      {source || "Nothing selectd"}
                    </div> */}
                  <div className="image-item__btn-wrapper">
                    {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                    <button onClick={() => updateVideo()}>Upload All</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "2rem",
              marginLeft: "2rem",
              justifyContent: "center",
            }}
          >
            <Editor
              onInit={(evt, editor) => (editorSummaryRef.current = editor)}
              apiKey="adc5ek8m7a2vvtebcvzm881l62jkqx3qpcvp6do4lbhtp20q"
              //    initialValue =  "<p>Write an abstract</p>"
              initialValue={
                blogEditSummary == ""
                  ? "<p>Write an abstract</p>"
                  : blogEditSummary
              }
              init={{
                height: 200,
                width: 900,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <button onClick={logBlogSummary}>
              Save Blog Summary
            </button>
          </Row>
          <Row style={{ marginTop: "2rem", marginLeft: "2rem" }}>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              apiKey="adc5ek8m7a2vvtebcvzm881l62jkqx3qpcvp6do4lbhtp20q"
              //   initialValue="<p>Write complete blog here</p>"
              initialValue={
                blogEditText == ""
                  ? "<p>Write complete blog here</p>"
                  : blogEditText
              }
              init={{
                height: 500,
                width: 900,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <button onClick={logBlogText}>
              Save Blog
            </button>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              //className={classes.btn}
              style={{ borderRadius: "24px" }}
              variant="outlined"
              component="span"
              type="button"
              id="submit"
              name="submit"
              onClick={() => history.push("/blog")}
            >
              Cancel
            </Button>

            <Button
              className={classes.btn}
              style={{ marginLeft: "2rem", borderRadius: "24px" }}
              variant="contained"
              component="span"
              type="button"
              id="submit"
              name="submit"
              onClick={submit}
            >
              Publish Post
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
