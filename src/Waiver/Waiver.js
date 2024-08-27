import React, { useRef, useState } from 'react';
import { Container, Paper, Grid, TextField, Typography, Radio, RadioGroup, FormControlLabel, Button, Box, Checkbox} from '@mui/material';
import SignaturePad from 'react-signature-canvas';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CheckBox } from '@material-ui/icons';


const Waiver = () => {
    const [gender, setGender] = useState('');
    const [checked, setChecked] = useState(false);

    const refs = {
        name: useRef(null)
    }

    const handleChange = (e) => {
        setGender(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const formObject={};

        formObject["signature"] = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");

        let email = data.get("email");
        let number = data.get("cellTel");
        let fullName = data.get("name");
        const [first,last] = fullName.split(' ');
        
        console.log("HERE")
        console.log(data.get("client-initials-1"))
        const initials=[
            data.get("client-initials-1"),
            data.get("client-initials-2"),
            data.get("client-initials-3"),
            data.get("client-initials-4"),
            data.get("client-initials-5"),
            data.get("client-initials-6"),
            data.get("client-initials-7"),
        ]
        const firstInitial = initials[0]
        const allMatch = initials.every(initial => initial===firstInitial);
        
        if (allMatch) {
            await generatePdf().then((pdfBlob)=> {
                submitWaiver(pdfBlob, email, number, first, last);
            })
        }
        else {
            alert("Please make sure all initials are matching")
        }
    };
    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();
    const formRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    

    const generatePdf = () => {
        return new Promise((resolve, reject) => {
            const input = formRef.current;
            html2canvas(input, {scale: 1.3}).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'pt', 'a4', true);
                const imgWidth = pdf.internal.pageSize.getWidth();
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const pdfHeight = pdf.internal.pageSize.getHeight();
    
                let heightLeft = imgHeight;
                let position = 0;
    
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
    
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }
                
                const pdfBlob = pdf.output('blob');
                setSelectedFile(pdfBlob);
                if(checked) {
                    pdf.save("waiver.pdf");
                }
                resolve(pdfBlob);  
            }).catch(err => reject(err)); 
        });
    };
    const submitWaiver = (pdfBlob, email, number, first, last) => {
            const formData = new FormData();
            formData.append('filename', 'waiver.pdf');
            formData.append('file-0', pdfBlob);
            formData.append('first_name', first);
            formData.append('last_name', last);
            formData.append('email', email);
            formData.append('phone_no', number);

            axios.post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/uploadDocument", formData)
            .then(function (res) {
                console.log(res);
            })
            .catch(function (err) {
                console.error(err);
            });
        }

        const handleCheck = (event) => {
            setChecked(event.target.checked);
        };
    return (
        
        <Box sx={{ backgroundColor: "#DADADA", padding: "5%" }}>
            <Container justifyContent="center">
                <a href="waiver.pdf" download="waiver">
                    <Button sx={{mb:"20px", backgroundColor:"#d3a625", color:"white"}}>Download here or fill out form below</Button>
                </a>
            </Container>
            <Container component={Paper} sx={{ backgroundColor: "white", padding: 3 }} ref={formRef}>
                
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                type="text"
                                name="name"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="DOB"
                                type="date"
                                name="dob"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Age"
                                type="number"
                                name="age"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Address"
                                type="text"
                                name="address"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                required
                                label="City"
                                type="text"
                                name="city"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                required
                                label="State"
                                type="text"
                                name="state"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                required
                                label="Zip"
                                type="text"
                                name="zip"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Tel (Home)"
                                type="tel"
                                name="homeTel"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                label="Cell"
                                type="tel"
                                name="cellTel"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Email address"
                                type="email"
                                name="email"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Profession"
                                type="text"
                                name="profession"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup row name="married" required>
                                <FormControlLabel value="Y" control={<Radio />} label="Married" />
                                <FormControlLabel value="N" control={<Radio />} label="Not Married" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={4}>
                            <RadioGroup row name="gender" value={gender} onChange={handleChange} required>
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                </RadioGroup>
                        </Grid>
                        {gender==="Female" &&
                        <Grid item xs={8}>
                            <RadioGroup row name="pregnant">
                                    <FormControlLabel value="Y" control={<Radio />} label="Pregnant" />
                                    <FormControlLabel value="N" control={<Radio />} label="Not Pregnant" />
                                </RadioGroup>
                        </Grid>}
                        <Grid item xs={12}>
                            <TextField
                                    required
                                    label="Children: (ages)"
                                    type="text"
                                    name="childrenAges"
                                    fullWidth
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="1) What is your intention for this Ayurvedic Lifestyle Consultation?"
                                name="intention"
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="2) What are your main health concerns that brought you here today?"
                                name="healthConcerns"
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="3) Are you willing to make changes to your diet and lifestyle?"
                                name="willingToChange"
                                fullWidth
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
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
                                <span style={{color:"blue"}}>Client's  initials:</span>
                                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                <TextField 
                                required
                                id="client-initials" 
                                label="" 
                                sx={{ marginBottom: '2px' }} 
                                />
                            </Box>
                            </Typography>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="primary" style={{ textAlign: "center" }}>
                                <br />
                                <br />
                                HEALTH CARE CONSULTATION AGREEMENT AND LIABILITY WAIVER/ RELEASE
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography>
                            1. <strong>I, 
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                <TextField
                                required
                                id="client-name" 
                                label="" 
                                />
                            </Box>
                            
                            (client’s name) understand that Ayurvedic Practitioners (AP) are NOT licensed in the United States to diagnose or treat medical conditions.
                            </strong> An AP may be able to help in my management of my health, and may recommend various Ayurvedic solutions for me to consider in management of my health and energy. They may assist me to learn the differences between medical diseases and the balancing of life energy, which deals with health factors that are within my own control. I may elect to consult a physician prior to seeing Leena Marathay, work with a physician concurrently, and/or I may decide that my concern about medical conditions does not call for seeing a physician at this time.
                        </Typography>

                        <Typography paragraph>
                            <br />2. I understand that I am seeking health education rather than a personal diagnosis of any disease or malady. This health education may involve an examination of me and I may learn of conditions which would be part of an Ayurvedic diagnosis and may hear of the remedies that an Ayurvedic practitioner would use to treat these conditions. <br />Client’s initial: 
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', marginTop:"15px"}}>
                            <TextField 
                                required
                                id="client-initials-1" 
                                name="client-initials-1"
                                label="" 
                                sx={{ marginBottom: '2px' }}
                            />
                            </Box>
                        </Typography>
                                
                        <Typography paragraph>
                            3. I certify that I am seeing Leena Marathay for health education and that I am seeing her to help manage and strengthen my general health and vital energy. It is <strong>NOT</strong> recommended that I discontinue any legend drugs or controlled substances prescribed to me by an appropriately licensed practitioner. <br />Client’s initial: 
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', marginTop:"15px" }}>
                            <TextField 
                                required
                                id="client-initials-2" 
                                name="client-initials-2"
                                label="" 
                                sx={{ marginBottom: '2px' }}
                            />
                            </Box>
                        </Typography>

                        <Typography paragraph>
                            4. No Guarantees: By accepting the terms of this Agreement, YOU agree and understand that NITYA AYURVEDA provides Program(s) related to wellness coaching only and guarantees no specific results. YOU take full responsibility for YOUR own health. Further, you acknowledge that everyone's health is different, and dependent on factors such as your own effort, genes, lifestyle and food. Any examples of wellness testimonials are not meant as a promise or guarantee of your own transformation. Please be aware that NITYA AYURVEDA LLC does not claim to diagnose or treat any condition. We simply provide wellness tips. In other words: we do not guarantee results, you are responsible for your own health. <br />Client’s initial: 
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', marginTop:"15px" }}>
                            <TextField 
                                required
                                id="client-initials-3" 
                                name="client-initials-3"
                                label="" 
                                sx={{ marginBottom: '2px' }}
                            />
                            </Box>
                        </Typography>

                        <Typography paragraph>
                            5. Limited Liability: In no event will NITYA AYURVEDA LLC or Leena Marathay be liable to YOU or any party related to you for any damages, including damages for health, whether under a theory of contract, warranty, tort (including negligence) products liability or otherwise, even if NITYA AYURVEDA has been advised of the possibility of such damages. Limitations herein described shall be applied to the greatest extent enforceable under applicable law. <br />Client’s initial: 
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', marginTop:"15px" }}>
                            <TextField 
                                required
                                id="client-initials-4" 
                                name="client-initials-4"
                                label="" 
                                sx={{ marginBottom: '2px' }}
                            />
                            </Box>
                        </Typography>

                        <Typography paragraph>
                            6. Client Responsibility: You are fully responsible for the discretionary use of Ayurvedic supplements in the form of loose herbal powders, pills, herbal teas, oils, medicated ghee and pre-made liquid decoctions provided by NITYA AYURVEDA. Under no circumstance is NITYA AYURVEDA responsible for any adverse reactions these may cause. <br />Client’s initial: 
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', marginTop:"15px" }}>
                            <TextField 
                                required
                                id="client-initials-5" 
                                name="client-initials-5"
                                label="" 
                                sx={{ marginBottom: '2px' }}
                            />
                            </Box>
                        </Typography>

                        <Typography paragraph>
                            7. Health Coach Disclaimer: Health/Wellness coaching is <strong>NOT</strong> intended to diagnose, treat, prevent or cure any disease or condition. It is not intended to substitute for the advice, treatment and/or diagnosis of a qualified licensed professional. Leena Marathay makes no medical diagnoses, claims and this Ayurvedic Consultation is not a substitute for your personal physician’s care. As your health/wellness coach, I do not provide a second opinion or in any way attempt to alter the treatment plans or therapeutic goals/recommendations of your personal physician. It is my role to partner with you to provide ongoing support and accountability as you create an action plan to meet and maintain your health goals. <br />Client’s initial: 
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', marginTop:"15px" }}>
                            <TextField 
                                required
                                id="client-initials-6" 
                                name="client-initials-6"
                                label=""
                                sx={{ marginBottom: '2px' }}
                            />
                            </Box>
                        </Typography>

                        <Typography paragraph>
                            8. Client Agreement: In consideration of my consultation with Leena Marathay, I agree that I (or my heirs, guardians, legal representatives and assigns) will not make a claim or file an action against Leena Marathay or Nitya Ayurveda, and for injury for damage resulting from negligence or other acts, howsoever caused in connection with my consultation with Leena Marathay. If I am the parent of a minor who I am asking Leena Marathay to consult with, I agree to indemnify and hold harmless Leena Marathay and Nitya Ayurveda from claims or actions made or brought on behalf of my child in connection with Leena Marathay’s consultation. <br />Client’s initial: 
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', marginTop:"15px" }}>
                            <TextField 
                                required
                                id="client-initials-7" 
                                name="client-initials-7"
                                label="" 
                                sx={{ marginBottom: '2px' }}
                            />
                            </Box>
                        </Typography>

                        <Typography paragraph>
                            9. Waiver: In addition, I hereby waive, release and discharge Leena Marathay from all actions, claims or demands I, my heirs, guardians, legal representatives or assigns, now have, or may hereafter have for injury or damages resulting from my participation in my consultation with Leena Marathay. <br /> Client’s initial: 
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', marginTop:"15px" }}>
                            <TextField 
                                required
                                id="client-initials-8" 
                                name="client-initials-8"
                                label="" 
                                sx={{ marginBottom: '2px' }}
                            />
                            </Box>
                        </Typography>
                        </Grid>
                        <Grid container>
                            <Grid item>
                                <Typography sx={{color:'gray'}}>
                                    <br />
                                    <br />
                                    I HAVE CAREFULLY READ THIS AGREEMENT AND FULLY UNDERSTAND ITS CONTENTS. I AM AWARE THAT THIS IS A WAIVER AND RELEASE OF POTENTIAL LIABILITY AND A CONTRACT BETWEEN MYSELF AND LEENA MARATHAY AND NITYA AYURVEDA AND I SIGN IT OF MY OWN FREE WILL.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{borderStyle:"solid", borderWidth:"1px", borderColor:"#DADADA"}}>
                                <SignaturePad ref={sigCanvas} />
                            </Grid>
                            <Grid item xs={12} sx={{mb:"10px"}}>
                                <Typography>(Client's signature)</Typography>
                                <button onClick={clear} type="button">clear</button>
                            </Grid>
                            <Grid container item sx={{justifyContent:"space-between"}}>
                                <Grid item xs={5}>
                                    <TextField 
                                        required
                                        id="client-signature" 
                                        label="" 
                                        sx={{ marginBottom: '2px', width:"100%" }}
                                    />
                                    <Typography>(Client prints his/her name)</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Today's Date:
                                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                            <TextField 
                                                required
                                                id="date-today"
                                                type="date" 
                                                label="" 
                                                sx={{ marginBottom: '2px' }}
                                            />
                                </Box></Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} justifyContent="center">
                        <FormControlLabel
                                label="Would you like to download your submission as PDF?"
                                control={
                                    <Checkbox
                                    checked={checked}
                                    onChange={handleCheck}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    > 
                                    </Checkbox>
                                }
                            ></FormControlLabel>
                        </Grid>
                        <Grid item xs={12} container justifyContent="center">
                                <Button variant="contained" color="primary" type="submit" onClick={submitWaiver}>
                                    Submit
                                </Button>
                            </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Waiver;
