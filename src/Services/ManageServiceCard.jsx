import { Button, TextField, Select, InputLabel, Input, InputAdornment, FormControl, MenuItem } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import axios from "axios";

export default function ManageService(props) {
    const data = props.service;
    const [title, setTitle] = useState(data.title);
    const [category, setCategory] = useState(data.category);
    const [description, setDescription] = useState(data.description);
    const [cost, setCost] = useState(data.cost);    
    const [duration, setDuration] = useState(data.duration);
    const [note, setNote] = useState(data.treatment_notes);
    const [displayOrder, setDisplayOrder] = useState(data.display_order);
    const [images, setImages] = useState([]);
    const [blogImage, setBlogImage] = useState("");
    const [blogEditImage, setBlogEditImage] = useState("");
    const [file, setFile] = useState(data.image_url);
    const text_height = 25;

    function updateImage() {        
        let formData = new FormData();
        formData.append("filename", images[0].file.name);
        formData.append("item_photo", images[0].file);

        axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/uploadImage",
            formData
        ).then((response) => {
            console.log("image", response.data);
            setFile(response.data);
        });
    }

    function updateService() {
        axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/updateTreatment",
            {
                title: title,
                treatment_uid: data.treatment_uid,
                category: category,
                description: description, 
                cost: cost,
                availability: "Available",
                display_order: displayOrder.toString(),
                duration: duration,
                image_url: file,
                treatment_notes: note,
            }
        ).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }

    function deleteService(uid) {
        axios.post('https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/deleteTreatment', 
        {
            treatment_uid: uid,
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      });
    }

    

    return(
        <div>
            <div className="ServiceRow">
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <div>
                            <TextField fullWidth 
                                id="standard-helperText"
                                label="Title"
                                value={title}
                                variant="standard"
                                onChange={(e)=>setTitle(e.target.value)}            
                            />      
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <div>
                                    <FormControl style={{minWidth: 120}} fullWidth >
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            onChange={(e)=>setCategory(e.target.value)}
                                            >
                                            <MenuItem value={"Consultation"}>Consultation</MenuItem>
                                            <MenuItem value={"Therapy"}>Therapy</MenuItem>
                                            <MenuItem value={"Package"}>Package</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <TextField fullWidth 
                                        id="standard-helperText"
                                        label="Cost"
                                        value={cost}
                                        variant="standard"
                                        onChange={(e)=>setCost(e.target.value)}                 
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>                                
                                <div>
                                    <TextField fullWidth 
                                        id="standard-helperText"
                                        label="Order"
                                        value={displayOrder}
                                        variant="standard"
                                        onChange={(e)=>setDisplayOrder(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <TextField fullWidth 
                                        id="standard-helperText"
                                        label="Duration"
                                        value={duration}
                                        variant="standard"
                                        onChange={(e)=>setDuration(e.target.value)}                 
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        
                        <TextField 
                            id="standard-multiline-static"
                            label="Description"
                            multiline
                            minRows={2}
                            maxRows={2}
                            defaultValue={description}
                            variant="standard"
                            onChange={(e)=>setDescription(e.target.value)}
                            fullWidth
                        />  
                        
                        <div>
                            <div style={{
                                width: "100%",
                                display: "flex",
                                flex: "1",
                                backgroundColor: "#DADADA",
                                justifyContent: "center",
                            }}>
                                <img style={{
                                    maxWidth: "100%",
                                    maxHeight: "300px",
                                    objectFit: "scale-down",
                                    }}
                                    className="ServiceImg"
                                    src={data.image_url}
                                    alt={"An image of" + data.title}
                                />
                            </div>
                            <div>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={(imgs)=>setImages(imgs)}
                                    maxNumber={50}
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
                                            Click or Drop here
                                        </button>
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
                                                    <button onClick={() => updateImage()}>
                                                    Update
                                                    </button>
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
                        </div>
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="standard-multiline-static"
                            label="Treatment Note"
                            multiline
                            minRows={text_height}
                            defaultValue={note}
                            variant="standard"
                            onClick={(e)=>setNote(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={()=>updateService()}>Save</Button>
                        <Button onClick={()=>deleteService(data.treatment_uid)}>Delete</Button>
                    </Grid>
                </Grid>      
            </div>
        </div>
    );
}