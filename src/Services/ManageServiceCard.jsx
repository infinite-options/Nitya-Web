import { Button, TextField, Select, InputLabel, Input, InputAdornment, FormControl, MenuItem } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import { useState } from "react";

export default function ManageService(props) {
    const data = props.service;
    const [title, setTitle] = useState(data.title);
    const [category, setCategory] = useState(data.category);
    const [description, setDescription] = useState(data.description);
    const [cost, setCost] = useState(data.cost);    
    const [duration, setDuration] = useState(data.duration);
    const [note, setNote] = useState(data.treatment_notes);
    const [displayOrder, setDisplayOrder] = useState(data.display_order);

    return(
        <div className="ServiceRow">
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Title"
                            value={title}
                            variant="standard"
                            onChange={(e)=>setTitle(e.target.value)}            
                        />      
                    </div>
                    <div>
                        <FormControl style={{minWidth: 120}}>
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
                    <TextField
                            id="standard-helperText"
                            label="Cost"
                            value={cost}
                            variant="standard"
                            onChange={(e)=>setCost(e.target.value)}                 
                        />
                    </div>
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Duration"
                            value={duration}
                            variant="standard"
                            onChange={(e)=>setDuration(e.target.value)}                 
                        />
                    </div>
                    <div>
                    <FormControl>
                        <TextField 
                            id="filled-basic"
                            label="Order"
                            value={displayOrder}
                            onClick={(e)=>setDisplayOrder(e.target.value)}
                        />
                    </FormControl>  
                    </div>
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
                        <Button>
                            New Pic
                        </Button>
                    </div>
                    
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="standard-multiline-static"
                        label="Description"
                        multiline
                        minRows={20}
                        maxRows={20}
                        defaultValue={description}
                        variant="standard"
                        onChange={(e)=>setDescription(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        id="standard-multiline-static"
                        label="Treatment Note"
                        multiline
                        minRows={20}
                        maxRows={20}
                        value={note}
                        variant="standard"
                        onClick={(e)=>setNote(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button>Save</Button>
                    <Button>Delete</Button>
                </Grid>
            </Grid>      
        </div>
    );
}