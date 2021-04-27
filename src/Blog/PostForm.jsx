import React, { useState } from "react";
import Axios from "axios";

function PostForm() {
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
      blogTitle: data.blogTitle,
      blogText: data.blogText,
      author: data.author,
      postedOn: data.postedOn,
      blogCategory: data.blogCategory,
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
    console.log(newData);
  }
  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input
          onChange={(e) => handle(e)}
          id="blogTitle"
          value={data.blogTitle}
          placeholder="Blog Title"
          type="text"
        ></input>
        <br></br>
        <br></br>
        <input
          onChange={(e) => handle(e)}
          id="blogText"
          value={data.blogText}
          placeholder="Blog Text"
          type="text"
        ></input>
        <br></br>
        <br></br>
        <input
          onChange={(e) => handle(e)}
          id="blogCategory"
          value={data.blogCategory}
          placeholder="Blog Category"
          type="text"
        ></input>
        <br></br>
        <br></br>
        <input
          onChange={(e) => handle(e)}
          id="author"
          value={data.author}
          placeholder="Blog Author"
          type="text"
        ></input>
        <br></br>
        <br></br>
        <input
          onChange={(e) => handle(e)}
          id="postedOn"
          value={data.postedOn}
          placeholder="Blog Posted Date"
          type="text"
        ></input>
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default PostForm;
