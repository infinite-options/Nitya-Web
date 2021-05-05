import React, { useState } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    top: "40px",
    marginBottom: "100px",
    left: "200px",
    right: "80px",
    height: "auto",
    width: "1430px",
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  inputText: {
    width: "560px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  btn: {
    backgroundColor: "#d3a625",
    color: "#ffffff",
    boxShadow: "none",
    border: "1px solid #d3a625",
  },
}));

function AddPost() {
  const classes = useStyles();

  const url =
    "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addBlog";
  const [data, setData] = useState({
    blogTitle: "",
    blogText: "",
    author: "",
    postedOn: "",
    blogCategory: "",
  });

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      blogCategory: data.blogCategory,
      blogTitle: data.blogTitle,
      slug: "NULL",
      postedOn: data.postedOn,
      author: data.author,
      blogImage: "NULL",
      blogText: data.blogText,
    })
      .catch((error) => {
        console.log(error.message);
      })
      .then((response) => {
        console.log(response);
      });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

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
          <br></br>
          <br></br>
          <div className="col-md-5">
            <div className="form-area">
              <form onSubmit={(e) => submit(e)}>
                <input
                  onChange={(e) => handle(e)}
                  id="blogTitle"
                  value={data.blogTitle}
                  placeholder="Blog Title"
                  type="text"
                  className={classes.inputText}
                ></input>
                <br></br>
                <br></br>
                <CKEditor
                  name="blogText"
                  data={data.blogText}
                  editor={ClassicEditor}
                  onChange={(e, editor) => {
                    setData({
                      ...data,
                      blogText: editor.getData(),
                    });
                  }}
                ></CKEditor>
                <br></br>
                <br></br>

                <input
                  onChange={(e) => handle(e)}
                  id="blogCategory"
                  value={data.blogCategory}
                  placeholder="Blog Category"
                  type="text"
                  className={classes.inputText}
                ></input>
                <br></br>
                <br></br>
                <input
                  onChange={(e) => handle(e)}
                  id="author"
                  value={data.author}
                  placeholder="Blog Author"
                  type="text"
                  className={classes.inputText}
                ></input>
                <br></br>
                <br></br>
                <input
                  onChange={(e) => handle(e)}
                  id="postedOn"
                  value={data.postedOn}
                  placeholder="Blog Posted Date"
                  type="text"
                  className={classes.inputText}
                ></input>
                <br></br>
                <br></br>
                <button className={classes.btn}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddPost;
