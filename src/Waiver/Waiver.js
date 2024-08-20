import React, { useState } from 'react';
import { Container, Paper, Grid, TextField, Typography, Radio, RadioGroup, FormControlLabel, Button, Box } from '@mui/material';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';


const Waiver = () => {
    const [formData, setFormData] = useState({
        date: '',
        name: '',
        dob: '',
        age: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        homeTel: '',
        cellTel: '',
        email: '',
        profession: '',
        married: '',
        childrenAges: '',
        pregnant: '',
        intention: '',
        healthConcerns: '',
        willingToChange: '',
        openToAyurveda: '',
        clientInitials: '',
        clientName: '',
        clientSignatureDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formContainer = document.getElementById('form-container');

        htmlToImage.toBlob(formContainer)
            .then(function (blob) {
                saveAs(blob, 'waiver_form.png');
            })
            .catch(function (error) {
                console.error('Error saving image:', error);
            });

        console.log('Form data submitted:', formData);
    };

    return (
        <Box sx={{ backgroundColor: "#DADADA", padding: "5%" }}>
            <Container id="form-container" component={Paper} sx={{ backgroundColor: "white", padding: 3, maxWidth: "sm" }}>
                <a href="waiver.pdf" download="waiver">
                    <Button sx={{mb:"20px"}}>Download here or fill out form below</Button>
                </a>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Today's Date"
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="DOB"
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Age"
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="City"
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="State"
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Zip"
                                type="text"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Tel (Home)"
                                type="tel"
                                name="homeTel"
                                value={formData.homeTel}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Cell"
                                type="tel"
                                name="cellTel"
                                value={formData.cellTel}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Profession"
                                type="text"
                                name="profession"
                                value={formData.profession}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup row name="married" value={formData.married} onChange={handleChange}>
                                <FormControlLabel value="Y" control={<Radio />} label="Married" />
                                <FormControlLabel value="N" control={<Radio />} label="Not Married" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Children: (ages)"
                                type="text"
                                name="childrenAges"
                                value={formData.childrenAges}
                                onChange={handleChange}
                                fullWidth
                            />
                            <RadioGroup row name="pregnant" value={formData.pregnant} onChange={handleChange}>
                                <FormControlLabel value="Y" control={<Radio />} label="Pregnant" />
                                <FormControlLabel value="N" control={<Radio />} label="Not Pregnant" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="1) What is your intention for this Ayurvedic Lifestyle Consultation?"
                                name="intention"
                                value={formData.intention}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="2) What are your main health concerns that brought you here today?"
                                name="healthConcerns"
                                value={formData.healthConcerns}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="3) Are you willing to make changes to your diet and lifestyle?"
                                name="willingToChange"
                                value={formData.willingToChange}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="4) Are you open to including Ayurvedic herbs, medicated oils and medicated ghees in your diet?"
                                name="openToAyurveda"
                                value={formData.openToAyurveda}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Typography variant="h6" color="primary">
                                Summary of Waiver
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography paragraph>
                                Ayurvedic Practitioners are <strong>NOT</strong> licensed physicians, nor are Ayurveda services licensed by the state. Ayurveda is a traditional medicine originating in India and emphasizes maintaining the harmony of body-mind-spirit through diet, lifestyle, and natural herbs. In Ayurveda the emphasis is not on disease but on maintaining the balance of the individual’s constitutional nature. So Ayurvedic treatments are never one size fits all, but custom tailored for each individual. As a practitioner of Ayurveda I will provide you assessments and recommendations in the following areas:
                            </Typography>
                            <ul>
                                <li>Constitutional analysis</li>
                                <li>Diet and lifestyle counseling</li>
                                <li>Herbal supplements</li>
                                <li>Ayurvedic bodywork</li>
                            </ul>
                            <Typography paragraph>
                                The method of treatment in Ayurveda is alternative or complementary to conventional medicine. If you ever have any concerns about the nature of your treatment, please feel free to discuss them with me. It is recommended that you inform your medical doctor that you are receiving Ayurvedic treatment.
                            </Typography>
                            <hr />
                            <Typography paragraph>
                                I will read the following <span style={{ color: 'blue' }}>Health Care Consultation Agreement and Liability Waiver/Release</span> about the Ayurvedic services offered by Leena Marathay. I understand the nature of the services to be provided. I understand that Leena Marathay is <strong>NOT</strong> a licensed physician and that Ayurvedic services are not licensed by the state although they are legal.
                            </Typography>
                            <Typography paragraph>
                                I understand it is my responsibility to maintain a relationship for myself/my child with a medical doctor. I understand that Ayurvedic treatments, even those that may be helpful, may not be sufficient to resolve my problems.
                            </Typography>
                            <Typography paragraph>
                                By signing this document, I acknowledge that I have read and understood this agreement and give my consent to the Ayurvedic services offered by Leena Marathay.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Client's Initials"
                                name="clientInitials"
                                value={formData.clientInitials}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Client Name"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Date"
                                type="date"
                                name="clientSignatureDate"
                                value={formData.clientSignatureDate}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Box>
    );
};

export default Waiver;
