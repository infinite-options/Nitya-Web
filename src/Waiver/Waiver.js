import React, { useState, useRef } from 'react';
// import { usePDF } from 'react-to-pdf';
import { useReactToPrint } from "react-to-print";

import { Container, Paper, Grid, TextField, Typography, Radio, RadioGroup, FormControlLabel, TextareaAutosize, Button, Box } from '@mui/material';
import SignaturePad from 'react-signature-canvas';
import './Waiver.css'
const Waiver = () => {
    // const { toPDF, targetRef } = {};
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    const [imageURL, setImageURL] = useState(null);
    const clear = () => {
        sigCanvas.current.clear();
        setImageURL('');
    }
    const savePNG = () => {
        setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
        return sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    }
    // const [clientInitials0, setClientInitials0] = React.useState('');
    // const [clientInitials1, setClientInitials1] = React.useState('');
    // const [clientInitials2, setClientInitials2] = React.useState('');
    // const [clientInitials3, setClientInitials3] = React.useState('');
    // const [clientInitials4, setClientInitials4] = React.useState('');
    // const [clientInitials5, setClientInitials5] = React.useState('');
    // const [clientInitials6, setClientInitials6] = React.useState('');
    // const [clientInitials7, setClientInitials7] = React.useState('');
    // const [clientInitials8, setClientInitials8] = React.useState('');
    // const handleChangeClientInitials0 = (event) => {
    //     setClientInitials0(event.target.value);
    // };

    // const handleChangeClientInitials1 = (event) => {
    //     setClientInitials1(event.target.value);
    // };

    // const handleChangeClientInitials2 = (event) => {
    //     setClientInitials2(event.target.value);
    // };

    // const handleChangeClientInitials3 = (event) => {
    //     setClientInitials3(event.target.value);
    // };

    // const handleChangeClientInitials4 = (event) => {
    //     setClientInitials4(event.target.value);
    // };

    // const handleChangeClientInitials5 = (event) => {
    //     setClientInitials5(event.target.value);
    // };

    // const handleChangeClientInitials6 = (event) => {
    //     setClientInitials6(event.target.value);
    // };

    // const handleChangeClientInitials7 = (event) => {
    //     setClientInitials7(event.target.value);
    // };

    // const handleChangeClientInitials8 = (event) => {
    //     setClientInitials8(event.target.value);
    // };


    // const [consentObj, setConsentObj] = useState({
    //     clientInitials1: '',
    //     clientInitials2: '',
    //     clientInitials3: '',
    //     clientInitials4: '',
    //     clientInitials5: '',
    //     clientInitials6: '',
    //     clientInitials7: '',
    //     clientInitials8: '',
    // });

    const sigCanvas = useRef({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log('Form data submitted:', data);
        // savePNG();
        const formObj = {
            date: data.get('date'),
            name: data.get('name'),
            dob: data.get('dob'),
            address: data.get('address'),
            city: data.get('city'),
            state: data.get('state'),
            zip: data.get('zip'),
            homeTel: data.get('homeTel'),
            cellTel: data.get('cellTel'),
            email: data.get('email'),
            profession: data.get('profession'),
            married: data.get('married'),
            childrenAges: data.get('childrenAges'),
            pregnant: data.get('pregnant'),
            intention: data.get('intention'),
            healthConcerns: data.get('healthConcerns'),
            willingToChange: data.get('willingToChange'),
            openToAyurveda: data.get('openToAyurveda'),
            clientInitials: data.get('clientInitials'),
            clientName: data.get('client-name'),
            clientSignatureDate: data.get('clientSignatureDate'),
            signatureImage: savePNG(),
            consent: false,
        };
        let consent;
        let i = 0;
        if (data.get('client-initials-0')) {
            consent = true;
        }
        console.log('data: ', data.get('client-initials-0'));
        while (consent == true && i < 9){
            // get every single signature
            // console.log(data.get(`client-initials-${i}`));
            if (!data.get(`client-initials-${i}`)) {
                consent = false;
                console.log(i,' this is confirmedfalse');
            }
            i++;
        }
        console.log('consent', consent);
        if (consent) {
            formObj.consent = true;
        }
        console.log('formObj: ', formObj);
    };

    const consentChange = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
    }
    console.log('imageURL: ', imageURL);
    return (
        <Box sx={{ backgroundColor: "#DADADA", padding: "5%" }}>
            <Container component={Paper} sx={{ backgroundColor: "white", padding: 3, maxWidth: "sm" }} ref={componentRef}>
                {/*  download="waiver" */}
                <a href="waiver.pdf" target="_blank"> 
                    <Button sx={{mb:"20px"}}>Download here or fill out form below</Button>
                </a>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Today's Date"
                                type="date"
                                name="date"
                                // onChange={handleChange}
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
                                // onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="DOB"
                                type="date"
                                name="dob"
                                // onChange={handleChange}
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
                                // onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                type="text"
                                name="address"
                                // onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="City"
                                type="text"
                                name="city"
                                // onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="State"
                                type="text"
                                name="state"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Zip"
                                type="text"
                                name="zip"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Tel (Home)"
                                type="tel"
                                name="homeTel"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Cell"
                                type="tel"
                                name="cellTel"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email address"
                                type="email"
                                name="email"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Profession"
                                type="text"
                                name="profession"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup row name="married">
                                <FormControlLabel value="Y" control={<Radio />} label="Married" />
                                <FormControlLabel value="N" control={<Radio />} label="Not Married" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Children: (ages)"
                                type="text"
                                name="childrenAges"
                                fullWidth
                            />
                            <RadioGroup row name="pregnant">
                                <FormControlLabel value="Y" control={<Radio />} label="Pregnant" />
                                <FormControlLabel value="N" control={<Radio />} label="Not Pregnant" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="1) What is your intention for this Ayurvedic Lifestyle Consultation?"
                                name="intention"
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="2) What are your main health concerns that brought you here today?"
                                name="healthConcerns"
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="3) Are you willing to make changes to your diet and lifestyle?"
                                name="willingToChange"
                                fullWidth
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="4) Are you open to including Ayurvedic herbs, medicated oils and medicated ghees in your diet?"
                                name="openToAyurveda"
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
                                I understand it is my responsibility to maintain a relationship with my medical doctor and other health care providers. I have consented to use the services offered by Leena Marathay and am informed that Ayurvedic herbs and or herbal supplements may be suggested.
                            </Typography>
                            <Typography sx={{color:"blue"}}>
                                <br></br>
                                Client's  initials:
                                <TextField 
                                id="client-initials-0" 
                                name="client-initials-0"
                                // onChange={handleChangeClientInitials0}
                                required
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px' }} 
                                />
                            </Typography>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="primary" style={{ textAlign: "center" }}>
                                HEALTH CARE CONSULTATION AGREEMENT AND LIABILITY WAIVER/ RELEASE
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography>
                            1. <strong>I, 
                                <TextField 
                                name="client-name" 
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px' }} 
                                />
                            (client’s name) understand that Ayurvedic Practitioners (AP) are NOT licensed in the United States to diagnose or treat medical conditions.
                            </strong> An AP may be able to help in my management of my health, and may recommend various Ayurvedic solutions for me to consider in management of my health and energy. They may assist me to learn the differences between medical diseases and the balancing of life energy, which deals with health factors that are within my own control. I may elect to consult a physician prior to seeing Leena Marathay, work with a physician concurrently, and/or I may decide that my concern about medical conditions does not call for seeing a physician at this time.
                        </Typography>

                        <Typography paragraph>
                            <br />2. I understand that I am seeking health education rather than a personal diagnosis of any disease or malady. This health education may involve an examination of me and I may learn of conditions which would be part of an Ayurvedic diagnosis and may hear of the remedies that an Ayurvedic practitioner would use to treat these conditions.
                            <br></br>
                            Client’s initial: 
                            <TextField 
                                name="client-initials-1" 
                                id="client-initials-1"
                                required
                                // onChange={handleChangeClientInitials1}
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px' }}
                            />
                        </Typography>

                        <Typography paragraph>
                            3. I certify that I am seeing Leena Marathay for health education and that I am seeing her to help manage and strengthen my general health and vital energy. It is <strong>NOT</strong> recommended that I discontinue any legend drugs or controlled substances prescribed to me by an appropriately licensed practitioner.
                            <br></br>
                            Client’s initial: 
                            <TextField 
                                name="client-initials-2"
                                id="client-initials-2"
                                required
                                // onChange={handleChangeClientInitials2}
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px' }}
                            />
                        </Typography>

                        <Typography paragraph>
                            4. No Guarantees: By accepting the terms of this Agreement, YOU agree and understand that NITYA AYURVEDA provides Program(s) related to wellness coaching only and guarantees no specific results. YOU take full responsibility for YOUR own health. Further, you acknowledge that everyone's health is different, and dependent on factors such as your own effort, genes, lifestyle and food. Any examples of wellness testimonials are not meant as a promise or guarantee of your own transformation. Please be aware that NITYA AYURVEDA LLC does not claim to diagnose or treat any condition. We simply provide wellness tips. In other words: we do not guarantee results, you are responsible for your own health.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="client-initials-3"
                                id="client-initials-3" 
                                required
                                // onChange={handleChangeClientInitials3}
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px' }}
                            />
                        </Typography>

                        <Typography paragraph>
                            5. Limited Liability: In no event will NITYA AYURVEDA LLC or Leena Marathay be liable to YOU or any party related to you for any damages, including damages for health, whether under a theory of contract, warranty, tort (including negligence) products liability or otherwise, even if NITYA AYURVEDA has been advised of the possibility of such damages. Limitations herein described shall be applied to the greatest extent enforceable under applicable law.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="client-initials-4"
                                id="client-initials-4"
                                required
                                // onChange={handleChangeClientInitials4} 
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px' }}
                            />
                        </Typography>

                        <Typography paragraph>
                            6. Client Responsibility: You are fully responsible for the discretionary use of Ayurvedic supplements in the form of loose herbal powders, pills, herbal teas, oils, medicated ghee and pre-made liquid decoctions provided by NITYA AYURVEDA. Under no circumstance is NITYA AYURVEDA responsible for any adverse reactions these may cause.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="client-initials-5"
                                id="client-initials-5"
                                required 
                                // onChange={handleChangeClientInitials5}
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px' }}
                            />
                        </Typography>

                        <Typography paragraph>
                            7. Health Coach Disclaimer: Health/Wellness coaching is <strong>NOT</strong> intended to diagnose, treat, prevent or cure any disease or condition. It is not intended to substitute for the advice, treatment and/or diagnosis of a qualified licensed professional. Leena Marathay makes no medical diagnoses, claims and this Ayurvedic Consultation is not a substitute for your personal physician’s care. As your health/wellness coach, I do not provide a second opinion or in any way attempt to alter the treatment plans or therapeutic goals/recommendations of your personal physician. It is my role to partner with you to provide ongoing support and accountability as you create an action plan to meet and maintain your health goals.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="client-initials-6"
                                id="client-initials-6"
                                required
                                // onChange={handleChangeClientInitials6}
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px', display: 'inline-flex', alignItems: 'center' }}
                            />
                        </Typography>

                        <Typography paragraph>
                            8. Client Agreement: In consideration of my consultation with Leena Marathay, I agree that I (or my heirs, guardians, legal representatives and assigns) will not make a claim or file an action against Leena Marathay or Nitya Ayurveda, and for injury for damage resulting from negligence or other acts, howsoever caused in connection with my consultation with Leena Marathay. If I am the parent of a minor who I am asking Leena Marathay to consult with, I agree to indemnify and hold harmless Leena Marathay and Nitya Ayurveda from claims or actions made or brought on behalf of my child in connection with Leena Marathay’s consultation.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="client-initials-7"
                                id="client-initials-7"
                                required
                                // onChange={handleChangeClientInitials7}
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px' }}
                            />
                        </Typography>

                        <Typography paragraph>
                            9. Waiver: In addition, I hereby waive, release and discharge Leena Marathay from all actions, claims or demands I, my heirs, guardians, legal representatives or assigns, now have, or may hereafter have for injury or damages resulting from my participation in my consultation with Leena Marathay. 
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="client-initials-8"
                                id="client-initials-8"
                                required
                                // onChange={handleChangeClientInitials8}
                                label="" 
                                variant="standard" 
                                sx={{ marginBottom: '2px' }}
                            />
                        </Typography>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <Typography sx={{color:'gray'}}>
                                    I HAVE CAREFULLY READ THIS AGREEMENT AND FULLY UNDERSTAND ITS CONTENTS. I AM AWARE THAT THIS IS A WAIVER AND RELEASE OF POTENTIAL LIABILITY AND A CONTRACT BETWEEN MYSELF AND LEENA MARATHAY AND NITYA AYURVEDA AND I SIGN IT OF MY OWN FREE WILL.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {/* <TextField 
                                    id="client-signature"
                                    // required
                                    label="" 
                                    variant="standard" 
                                    sx={{ marginBottom: '2px', width:"100%" }}
                                /> */}
                                <SignaturePad
                                ref={sigCanvas}
                                    canvasProps={{
                                        className: 'signatureCanvas'
                                    }}></SignaturePad>
                                {/* <Button onClick={savePNG}>Save</Button> */}
                                <Button onClick={clear}>UNDO</Button>
                                <Typography>(Client's signature)</Typography>
                            </Grid>
                            <Grid container item sx={{justifyContent:"space-between"}}>
                                <Grid item xs={5}>
                                    <TextField 
                                        id="client-signature" 
                                        label="" 
                                        variant="standard" 
                                        sx={{ marginBottom: '2px', width:"100%" }}
                                    />
                                    <Typography>(Client prints his/her name)</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Today's Date:
                                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <TextField
                                            type="date"
                                            name="date"
                                            // onChange={handleChange}
                                            variant="standard"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                </Box></Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button variant="contained" color="primary" onClick={handlePrint}>
                                Download PDF
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Waiver;
