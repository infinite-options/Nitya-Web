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

  const log = () => {
    if (editorRef.current) {
      console.log("editor", editorRef.current.getContent());
      console.log("editor", editorSummaryRef.current.getContent());
      setBlogText(editorRef.current.getContent());
      setblogSummary(editorSummaryRef.current.getContent());
    }
  };

  // Due to SQL String Syntax we should replace single quote to two single quote. If backend starts to handle this problem, you may remove this function.
  const textToDoubleApostrophes = (text) => {
    return text.replace(/'/g, "''");
  }
  console.log('images: ', images);

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
    console.log('submitted file: ', file);
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
  };

  const handleChange = (event) => {
    setBlogCategory(event.target.value);
  };

  useEffect(() => {
    if (file) {
      console.log('new file value:', file);
      // just to check if logged
    }
  }, [file]);
    const updateData = () => {
      // let filename;
      // let filephoto; 
      let newFile = ''; 

      for (const image of images) {

      // postData.item_photo = file.obj; // change to File object

      let formData = new FormData();

      console.log("files:", images); 
      // append every filename
      // console.log('current image:', image)
      // formData.append("filename", image.file.name);
      // formData.append("item_photo", image.file);

      console.log('formData: ', formData)
      console.log('new image: ', image);
      formData.append("filename", image.file.name);
      formData.append("item_photo", image.file);
      // formData.append("filename", images[0].file.name);
      // formData.append("item_photo", images[0].file);
      
      

      axios
        .post(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/uploadImage",
          formData
        )
        .then((response) => {
          console.log("response/image", response.data);
          newFile += ',' + response.data;
          // console.log('newFile changed: ', newFile);
          // setFile(response.data);
          //  history.push("/blog")
          // setFile(newFile);
        })
        .then(()=> {
          // because post is asynchronous
          console.log('newFile value: ', newFile)
          setFile(newFile);
          //       console.log('new file value: ', file);

        });
      }
      // setFile(newFile);
      // console.log('new file value: ', file);


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
              marginTop: "2rem",
              marginLeft: "2rem",
              justifyContent: "space-evenly",
            }}
          >
            <Col>
              <TextField
                id="postedOn"
                label="Posted On"
                value={postedOn}
                type="date"
                style={{ width: "100%" }}
                defaultValue="2021-04-22"
                helperText="Write today's date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setPostedOn(e.target.value)}
              />
            </Col>
            <Col>
              <TextField
               style={{ width: "100%" }}
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
              <InputLabel id="demo-simple-select-label">
                Blog Category
              </InputLabel>
              <Select
              
                labelId="demo-simple-select-label"
                id="Blog Category"
                value={blogCategory}
                onChange={handleChange}
                style={{ width: "100%" }}

                // onClick={log}
              >
                <MenuItem value={"Healty Tips"}>Healthy Tips</MenuItem>
                <MenuItem value={"Recipes"}>Recipes</MenuItem>
                <MenuItem value={"Living Well"}>Living Well</MenuItem>
              </Select>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              marginTop: "2rem",
              // marginLeft: "2rem",
              justifyContent: "space-evenly",
            }}
          >
            {/* <br></br> */}
            <div>
              <TextField
                id="blogTitle"
                value={blogTitle}
                style={{ width: "300%" }}
                placeholder="Title"
                justifyContent= "center"
                helperText="Enter Blog Title Here"
                width="100%"
                multiline
                rows={2}
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
              marginTop: "2rem",
              marginLeft: "2rem",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col
              xs={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "4rem",
              }}
            >
              Image Upload?
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
                      <Button
                        className={classes.btn}
                        style={{ marginLeft: "2rem", borderRadius: "24px" }}
                        variant="contained"
                        component="span"
                        type="button"
                        // style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click or Drop here
                      </Button>
                      &nbsp;
                      {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                      {console.log('imageList: ', imageList)};
                      {imageList.map(
                        (image, index) => (
                          setBlogImage(image.data_url),
                          console.log('imagedataURL', image.data_url),
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
                                <Button
                                className={classes.btn}
                                style={{ marginLeft: "2rem", borderRadius: "24px" }}
                                onClick={() => updateData()}>
                                  Upload
                                </Button>
                                <Button onClick={() => onImageRemove(index)}>
                                  Remove
                                </Button>
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
            <Col
              xs={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "4rem",
              }}
            >
              Video Upload?
              <div>
                <Button
                  ref={inputRef}
                  // className="VideoInput_input"
                  className={classes.btn}
                style={{ marginLeft: "2rem", borderRadius: "24px" }}
                variant="contained"
                component="span"
                // type="button"
                  type="file"
                  onChange={handleFileChange}
                  accept=".mov,.mp4"
                >Choose File</Button>
                <div className="image-item">
                  {source && (
                    <video
                      className="VideoInput_video"
                      
                      width="50%"
                      height="50%"
                      controls
                      src={URL.createObjectURL(source)}
                      // was originally source
                    />
                  )}
                  {/* <div className="VideoInput_footer">
                      {source || "Nothing selectd"}
                    </div> */}
                  <div className="image-item__btn-wrapper">
                    {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                    <Button 
                    className={classes.btn}
                    style={{ marginLeft: "2rem", borderRadius: "24px" }}
                    variant="contained"
                    component="span"
                    type="button"
                    onClick={() => updateVideo()}>Upload</Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "2rem", marginLeft: "2rem" }}>
            <Editor
              onInit={(evt, editor) => (editorSummaryRef.current = editor)}
              apiKey="adc5ek8m7a2vvtebcvzm881l62jkqx3qpcvp6do4lbhtp20q"
              //    initialValue =  "<p>Write an abstract</p>"
              initialValue={
                blogEditSummary == ""
                  ? "<p>Write an abstract</p>"
                  : blogEditSummary
              }
              onChange={log}
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
              onChange={log}
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
