import React, { useState, useRef, useContext } from 'react';
// import { usePDF } from 'react-to-pdf';
import { useReactToPrint } from "react-to-print";
import Logo from "../Assets/Images/Logo.png";
import { Container, Paper, Grid, TextField, Typography, Radio, RadioGroup, FormControlLabel, TextareaAutosize, Button, Box, Checkbox, FormLabel } from '@mui/material';
import SignaturePad from 'react-signature-canvas';
import MenuItem from '@mui/material/MenuItem';
import './Waiver.css'
import { CheckBox, SettingsEthernetSharp } from '@material-ui/icons';
import axios from "axios";
import { useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import WaiverContext from './WaiverContext';
// import FormLabel from '@mui/material/FormLabel';

// import Pdf from 'react-to-pdf';
const Waiver = () => {
    // const { toPDF, targetRef } = {};
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const handleGenderChange = (event) => {
        setGender(event.target.value);
        // if (event.target.value !== 'Female') {
        //     setIsPregnant(null); // Reset the pregnancy status if gender is not Female
        // }
    };
    const [test, setTest] = useState(false);
    // setTest(false);
    const {firstName, setFirstName} = useContext(WaiverContext);
    const {lastName, setLastName} = useContext(WaiverContext);
    const {email, setEmail} = useContext(WaiverContext);
    const {phoneNum, setPhoneNum} = useContext(WaiverContext);
  
    const {waiver, setWaiver} = useContext(WaiverContext);
    const [valid, setValid] = useState('');
    const [value, setValue] = useState('');
    const [telValid, setTelValid] = useState('');
    const [telValue, setTelValue] = useState('');
    const states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
        'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
        'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ];
      
    const [cellValid, setCellValid] = useState('');
    const [cellValue, setCellValue] = useState('');
    const [childrenValid, setChildrenValid] = useState(true);
    const [childrenValue, setChildrenValue] = useState('');
    const handleChildrenAgesValidation = (e) => {
        const input = e.target.value;
        // Regular expression to match only numbers, commas, and spaces
        const reg = new RegExp(/^[0-9, ]*$/);
    
        if (input === "") {
            setChildrenValid(true);
        } else {
            setChildrenValid(reg.test(input)); // check the opposite of the reg test
        }
    
        setChildrenValue(input);
    };
    const shouldShowChildrenAgesError = childrenValue.length > 0 && !childrenValid;

    const handleEmailValidation = (e) => {
        const email = e.target.value;

        const reg = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        // setValid(reg.test(e.target.value));
        // setValue(e.target.value);
        if (e.target.value === "") {
            setValid(true); // No error if the field is empty
        } else {
            setValid(reg.test(e.target.value));
        }
    
        setValue(email);
      };
    const shouldShowEmailError = value.length > 0 && !valid;

      const [initials, setInitials]= useState({
        clientInitials0:'',
        clientInitials1:'',
        clientInitials2:'',
        clientInitials3:'',
        clientInitials4:'',
        clientInitials5:'',
        clientInitials6:'',
        clientInitials7:'',
        clientInitials8:'',
    })
    const [errors, setErrors]= useState({
        clientInitials0: false,
        clientInitials1:false,
        clientInitials2:false,
        clientInitials3:false,
        clientInitials4:false,
        clientInitials5:false,
        clientInitials6:false,
        clientInitials7:false,
        clientInitials8:false,
    })

    const validateInitials = (name, value) => {
        const newInitials = { ...initials, [name]: value };
        const allInitials = Object.values(newInitials);
        const firstInitial = allInitials[0];
    
        const allMatch = allInitials.every(initial => initial === firstInitial);
    
        const newErrors = {};
        Object.keys(newInitials).forEach(key => {
            newErrors[key] = newInitials[key] !== firstInitial;
        });
    
        setErrors(newErrors);
        setInitials(newInitials);
    };

    const handleInitialChange = (e) => {
        const { name, value } = e.target;
        validateInitials(name, value);
    };

      const checkInitials = () => {
        const values = Object.values(initials);
        return values.every((val) => val === values[0] && val !== '');
    };
    const handleTelValidation = (e) => {
        const value = e.target.value;
        const reg = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);
        setTelValue(value);
        const isValid = value.length >= 10 && reg.test(value);
        setTelValid(isValid);
      };
    
    const handleCellValidation = (e) => {
    const value = e.target.value;
    const reg = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);
    setCellValue(value);
    const isValid = value.length >= 10 && reg.test(value);
    setCellValid(isValid);
    };
    const shouldShowTelError = telValue.length > 0 && !telValid;
    const shouldShowCellError = cellValue.length > 0 && !cellValid;
    const [state, setState] = useState('');

    const handleStateChange = (event) => {
        setState(event.target.value);
      };
    const handleNameChange = (event) => {
        setName(event.target.value.replace(/\s/g, ''));
    };
    const handleEmailChange = (event) => {
        setName(event.target.value);
    };
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
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    // TODO: TESTING JSPDF LIBRARY (WORKS)
    
    // const input = document.getElementById('pdf-content'); 
    //     // Specify the id of the element you want to convert to PDF
    //     html2canvas(input).then((canvas) => {
    //         // const imgData = canvas.toDataURL('image/png', 0.1);
    //         const pdf = new jsPDF('p', 'mm', 'a4', true);
    //         const imgData = canvas.toDataURL('image/jpeg', 0.3);
    //         // pdf.addImage(imgData, 'PNG', 0, 0);
    //         pdf.addImage(imgData, "JPEG", 5, 0, 210, 297, undefined, 'FAST');
    //         // this.imgFile = canvas.toDataURL("image/jpeg", 0.3);
    //         // var doc = new jsPDF('p', 'mm', 'a4', true);
    //         // doc.addImage(this.imgFile, "JPEG", 5, 0, 210, 297, undefined,'FAST');
    //         pdf.save('waiver.pdf'); 
    //         // Specify the name of the downloaded PDF file
    //         console.log('pdf downloaded: ', pdf)
    //         const pdfBlob = pdf.output('blob');
    //         console.log('pdfBlob: ', pdfBlob)
    //         const formData = new FormData();
    //         // formData.append('file', pdfBlob, 'waiver.pdf');
    //         formData.append('filename', pdfBlob, 'waiver.pdf');
    //         formData.append('file-0', pdfBlob, 'waiver.txt');
    //         axios
    //         .post(
    //             `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/uploadDocument`,
    //             formData
    //         )
    //         .then((response) => {
    //             console.log("RESPONSE: ", response.data);
    //             window.location.reload();
    //         });
    //     });
    console.log('compoentRef: ', componentRef);
    
    const handleDownloadPDF = (formObj) => { // WORKS
        console.log('POSTING PDF');
        const input = document.getElementById('pdf-content'); 
        var imgWidth = 210; 
        var pageHeight = 295;  

        var position = 0; // give some top padding to first page

        html2canvas(input,{
            backgroundColor: null,
            scale: 2,
            removeContainer: true,
        }).then((canvas) => {
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            // const imgData = canvas.toDataURL('image/png', 0.1);
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const imgData = canvas.toDataURL('image/jpeg', 0.3);
            // pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;
            var position = 0;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            if (checked) {
                pdf.save(`${name}_Waiver.pdf`);
            }
            else {
                pdf.output(`${name}_Waiver.pdf`);
            }

            // Specify the name of the downloaded PDF file
            console.log('pdf downloaded: ', pdf)
            const pdfBlob = pdf.output('blob');
            console.log('pdfBlob: ', pdfBlob)
            const formData = new FormData();
            // formData.append('file', pdfBlob, 'waiver.pdf');
            formData.append('filename', `${name}_Waiver`);
            formData.append('file-0', pdfBlob, 'waiver.txt');
            // formData.append('first_name', firstName);
            // formData.append('last_name', lastName);
            // formData.append('email', email);
            // formData.append('phone_no', phoneNum);
            formData.append("first_name", formObj.name.split(" ")[0]);
            formData.append("last_name", formObj.name.split(" ")[1]);
            formData.append("email", formObj.email);
            formData.append("phone_no", formObj.cellTel);
            axios
            .post(
                `https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/uploadDocument`,
                formData
            )
            .then((response) => {
                console.log("RESPONSE: ", response.data);
                setWaiver(response.data);
                window.location.reload();
            });
        });
      };
    // handleDownloadPDF();

    const sigCanvas = useRef({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log('Form data submitted:', data);
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
            gender: data.get('male/female'),
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
        // setName(data.get('name'));
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
        // if (checked) {
        //     handlePrint();
        // }
        handleDownloadPDF(formObj);
    };

    const consentChange = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
    }
    return (
        <div>

        <Box sx={{ backgroundColor: "#DADADA", padding: "5%" }}>
            <Container component={Paper} sx={{ backgroundColor: "white", padding: 3, maxWidth: "sm" }} ref={componentRef} id="pdf-content">
                {/*  download="waiver" */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img className="nav-logo" src={Logo} />
                        Client Consent & Waiver Form
                        Leena Marathay, Ayurvedic Doctor Level Certified, NAMACB, CMP
                        Lmarathay@gmail.com  ∙  (408) 471-7004
                    
                    </Grid>
                    <Grid item xs={12}>
                        <a href="waiver.pdf" target="_blank"> 
                            <Button sx={{mb:"20px"}}>Download empty form here or fill out form below</Button>
                        </a>
                    </Grid>
                </Grid>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Today's Date"
                                type="date"
                                name="date"
                                required={!test}
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
                                onChange={handleNameChange}
                                fullWidth
                                required={!test}
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
                                required={!test}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Age"
                                type="number"
                                name="age"
                                // onChange={handleChange}
                                fullWidth
                                required={!test}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                type="text"
                                name="address"
                                // onChange={handleChange}
                                fullWidth
                                required={!test}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="City"
                                type="text"
                                name="city"
                                // onChange={handleChange}
                                fullWidth
                                required={!test}
                            />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            select
                            label="State"
                            name="state"
                            fullWidth
                            required={!test}
                            value={state}
                            onChange={handleStateChange}
                            variant="outlined"
                            >
                            {states.map((state) => (
                                <MenuItem key={state} value={state}>
                                {state}
                                </MenuItem>
                            ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Zip"
                                type="text"
                                name="zip"
                                fullWidth
                                required={!test}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Tel (Home)"
                                helperText={shouldShowTelError ? "Invalid phone number" : ""}
                                value={telValue}
                                onChange={(e) => handleTelValidation(e)}

                                error={shouldShowTelError}
                                type="tel"
                                name="homeTel"
                                fullWidth
                                required={!test}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Cell"
                                type="tel"
                                name="cellTel"
                                helperText={shouldShowCellError ? "Invalid cell number" : ""}
                                value={cellValue}
                                onChange={(e) => handleCellValidation(e)}
                                error={shouldShowCellError}
                                fullWidth
                                required={!test}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email address"
                                // helperText={shouldShowTelError ? "Invalid phone number" : ""}
                                // value={telValue}
                                // onChange={(e) => handleTelValidation(e)}

                                // error={shouldShowTelError}
                                type="email"
                                name="email"
                                helperText={shouldShowEmailError?"Bad Input use @ and letters": ""}
                                value={value}
                                onChange={(e) => handleEmailValidation(e)}
                                error={shouldShowEmailError}
                                fullWidth
                                required={!test}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Profession"
                                type="text"
                                required={!test}
                                name="profession"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel id="demo-radio-buttons-group-label">Biological Gender (For Safety Reasons)</FormLabel>
                            <RadioGroup row name="male/female" >
                                <FormControlLabel onChange={handleGenderChange} value="Male" control={<Radio required={!test}/>} label="Male" />
                                <FormControlLabel onChange={handleGenderChange} value="Female" control={<Radio required={!test}/>} label="Female" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            {gender === 'Female' && (
                                <RadioGroup row name="pregnant" sx={{display: 'block'}} >
                                    <FormControlLabel value="Y" control={<Radio required={!test}/>} label="Pregnant" />
                                    <FormControlLabel value="N" control={<Radio required={!test}/>} label="Not Pregnant" />
                                </RadioGroup>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup row name="married" >
                                <FormControlLabel value="Y" control={<Radio required={!test}/>} label="Married" />
                                <FormControlLabel value="N" control={<Radio required={!test}/>} label="Not Married" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Children: (ages)"
                                type="text"
                                name="childrenAges"
                                // helperText="example: 1, 5, 6"
                                helperText={shouldShowChildrenAgesError ? "Invalid input: only numbers, commas, and spaces are allowed" : "example: 1, 5, 6"}
                                value={childrenValue}
                                onChange={handleChildrenAgesValidation}
                                error={shouldShowChildrenAgesError}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="1) What is your intention for this Ayurvedic Lifestyle Consultation?"
                                name="intention"
                                fullWidth
                                multiline
                                required={!test}
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="2) What are your main health concerns that brought you here today?"
                                name="healthConcerns"
                                fullWidth
                                multiline
                                required={!test}
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="3) Are you willing to make changes to your diet and lifestyle?"
                                name="willingToChange"
                                fullWidth
                                required={!test}
                                multiline
                                rows={1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="4) Are you open to including Ayurvedic herbs, medicated oils and medicated ghees in your diet?"
                                name="openToAyurveda"
                                fullWidth
                                required={!test}
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
                                I will read the following <span style={{ color: 'blue' }}><a href="https://docs.google.com/document/d/1SKuiIyf_jmToqcswIpVtit_gY5HCRqAhV4g4a3I55lg/edit?usp=sharing">Health Care Consultation Agreement and Liability Waiver/Release</a></span> about the Ayurvedic services offered by Leena Marathay. I understand the nature of the services to be provided. I understand that Leena Marathay is <strong>NOT</strong> a licensed physician and that Ayurvedic services are not licensed by the state although they are legal.
                            </Typography>
                            <Typography paragraph>
                                I understand it is my responsibility to maintain a relationship with my medical doctor and other health care providers. I have consented to use the services offered by Leena Marathay and am informed that Ayurvedic herbs and or herbal supplements may be suggested.
                            </Typography>
                            <Typography sx={{color:"blue"}}>
                                <br></br>
                                Client's  initials:
                                <TextField 
                                // id="client-initials-0" 
                                // name="client-initials-0"
                                // // value={initials.clientinitials0}
                                // // onChange={handleInitialChange}
                                // // onChange={handleChangeClientInitials0}
                                // required={!test}
                                // label="" 
                                // variant="standard" 
                                // sx={{ marginBottom: '2px' }} 
                                name="clientInitials0"
                                id="client-initials-0"
                                value={initials.clientInitials0}
                                onChange={handleInitialChange}
                                error={errors.clientInitials0}
                                helperText={errors.clientInitials0 ? "Initials do not match" : ""}
                                label="Initial 0"
                                variant="standard"
                                sx={{ marginBottom: '2px' }}
                                required={!test}
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
                                name="clientInitials1"
                                id="client-initials-1"
                                value={initials.clientInitials1}
                                onChange={handleInitialChange}
                                error={errors.clientInitials1}
                                helperText={errors.clientInitials1 ? "Initials do not match" : ""}
                                label="Initial 1"
                                variant="standard"
                                sx={{ marginBottom: '2px' }}
                                required={!test}
                            />
                        </Typography>

                        <Typography paragraph>
                            3. I certify that I am seeing Leena Marathay for health education and that I am seeing her to help manage and strengthen my general health and vital energy. It is <strong>NOT</strong> recommended that I discontinue any legend drugs or controlled substances prescribed to me by an appropriately licensed practitioner.
                            <br></br>
                            Client’s initial: 
                            <TextField 
                                name="clientInitials2"
                                id="client-initials-2"
                                value={initials.clientInitials2}
                                onChange={handleInitialChange}
                                error={errors.clientInitials2}
                                helperText={errors.clientInitials2 ? "Initials do not match" : ""}
                                label="Initial 2"
                                variant="standard"
                                sx={{ marginBottom: '2px' }}
                                required={!test}
                            />
                        </Typography>

                        <Typography paragraph>
                            4. No Guarantees: By accepting the terms of this Agreement, YOU agree and understand that NITYA AYURVEDA provides Program(s) related to wellness coaching only and guarantees no specific results. YOU take full responsibility for YOUR own health. Further, you acknowledge that everyone's health is different, and dependent on factors such as your own effort, genes, lifestyle and food. Any examples of wellness testimonials are not meant as a promise or guarantee of your own transformation. Please be aware that NITYA AYURVEDA LLC does not claim to diagnose or treat any condition. We simply provide wellness tips. In other words: we do not guarantee results, you are responsible for your own health.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="clientInitials3"
                                id="client-initials-3"
                                value={initials.clientInitials3}
                                onChange={handleInitialChange}
                                error={errors.clientInitials3}
                                helperText={errors.clientInitials3 ? "Initials do not match" : ""}
                                label="Initial 3"
                                variant="standard"
                                sx={{ marginBottom: '2px' }}
                                required={!test}
                            />
                        </Typography>

                        <Typography paragraph>
                            5. Limited Liability: In no event will NITYA AYURVEDA LLC or Leena Marathay be liable to YOU or any party related to you for any damages, including damages for health, whether under a theory of contract, warranty, tort (including negligence) products liability or otherwise, even if NITYA AYURVEDA has been advised of the possibility of such damages. Limitations herein described shall be applied to the greatest extent enforceable under applicable law.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="clientInitials4"
                                id="client-initials-4"
                                value={initials.clientInitials4}
                                onChange={handleInitialChange}
                                error={errors.clientInitials4}
                                helperText={errors.clientInitials4 ? "Initials do not match" : ""}
                                label="Initial 4"
                                variant="standard"
                                sx={{ marginBottom: '2px' }}
                                required={!test}
                            />
                        </Typography>

                        <Typography paragraph>
                            6. Client Responsibility: You are fully responsible for the discretionary use of Ayurvedic supplements in the form of loose herbal powders, pills, herbal teas, oils, medicated ghee and pre-made liquid decoctions provided by NITYA AYURVEDA. Under no circumstance is NITYA AYURVEDA responsible for any adverse reactions these may cause.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="clientInitials5"
                                id="client-initials-5"
                                value={initials.clientInitials5}
                                onChange={handleInitialChange}
                                error={errors.clientInitials5}
                                helperText={errors.clientInitials5 ? "Initials do not match" : ""}
                                label="Initial 5"
                                variant="standard"
                                sx={{ marginBottom: '2px' }}
                                required={!test}
                            />
                        </Typography>

                        <Typography paragraph>
                            7. Health Coach Disclaimer: Health/Wellness coaching is <strong>NOT</strong> intended to diagnose, treat, prevent or cure any disease or condition. It is not intended to substitute for the advice, treatment and/or diagnosis of a qualified licensed professional. Leena Marathay makes no medical diagnoses, claims and this Ayurvedic Consultation is not a substitute for your personal physician’s care. As your health/wellness coach, I do not provide a second opinion or in any way attempt to alter the treatment plans or therapeutic goals/recommendations of your personal physician. It is my role to partner with you to provide ongoing support and accountability as you create an action plan to meet and maintain your health goals.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="clientInitials6"
                                id="client-initials-6"
                                value={initials.clientInitials6}
                                onChange={handleInitialChange}
                                error={errors.clientInitials6}
                                helperText={errors.clientInitials6 ? "Initials do not match" : ""}
                                label="Initial 6"
                                variant="standard"
                                sx={{ marginBottom: '2px' }}
                                required={!test}
                            />
                        </Typography>

                        <Typography paragraph>
                            8. Client Agreement: In consideration of my consultation with Leena Marathay, I agree that I (or my heirs, guardians, legal representatives and assigns) will not make a claim or file an action against Leena Marathay or Nitya Ayurveda, and for injury for damage resulting from negligence or other acts, howsoever caused in connection with my consultation with Leena Marathay. If I am the parent of a minor who I am asking Leena Marathay to consult with, I agree to indemnify and hold harmless Leena Marathay and Nitya Ayurveda from claims or actions made or brought on behalf of my child in connection with Leena Marathay’s consultation.
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="clientInitials7"
                                id="client-initials-7"
                                value={initials.clientInitials7}
                                onChange={handleInitialChange}
                                error={errors.clientInitials7}
                                helperText={errors.clientInitials7 ? "Initials do not match" : ""}
                                label="Initial 7"
                                variant="standard"
                                sx={{ marginBottom: '2px' }}
                                required={!test}
                            />
                        </Typography>

                        <Typography paragraph>
                            9. Waiver: In addition, I hereby waive, release and discharge Leena Marathay from all actions, claims or demands I, my heirs, guardians, legal representatives or assigns, now have, or may hereafter have for injury or damages resulting from my participation in my consultation with Leena Marathay. 
                            <br></br>
                            Client’s initial: 
                            <TextField
                                name="clientInitials8"
                                id="client-initials-8"
                                value={initials.clientInitials8}
                                onChange={handleInitialChange}
                                error={errors.clientInitials8}
                                helperText={errors.clientInitials8 ? "Initials do not match" : ""}
                                label="Initial 8"
                                variant="standard"
                                sx={{ marginBottom: '2px' }}
                                required={!test}
                            />
                        </Typography>
                        </Grid>
                        <Grid container>
                            <Typography sx={{color:'gray'}}>
                                    I HAVE CAREFULLY READ THIS AGREEMENT AND FULLY UNDERSTAND ITS CONTENTS. I AM AWARE THAT THIS IS A WAIVER AND RELEASE OF POTENTIAL LIABILITY AND A CONTRACT BETWEEN MYSELF AND LEENA MARATHAY AND NITYA AYURVEDA AND I SIGN IT OF MY OWN FREE WILL.
                            </Typography>
                            <Grid item xs={12}>
                                {/* <TextField 
                                    id="client-signature"
                                    // required={!test}
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
                                <Grid item>
                            </Grid>
                            </Grid>
                            <Grid container item sx={{justifyContent:"space-between"}}>
                                <Grid item xs={5}>
                                    <TextField 
                                        id="client-signature" 
                                        label="" 
                                        required={!test}
                                        variant="standard" 
                                        sx={{ marginBottom: '2px', width:"100%"}}
                                    />
                                    <Typography>(Client prints his/her name)</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Today's Date:
                                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <TextField
                                            type="date"
                                            name="date"
                                            required={!test}
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
                            <FormControlLabel
                                label="Would you like to download your submission as PDF?"
                                control={
                                    <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    > 
                                    </Checkbox>
                                }
                            ></FormControlLabel>
                            
                            {/* <Button variant="contained" color="primary" onClick={handlePrint}>
                                Download PDF
                            </Button> */}
                        </Grid>
                        
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            * Please Note This Waiver Will be Sent to Leena Marathay
                        </Grid>
                        
                    </Grid>
                </Box>
            </Container>
        </Box>
        </div>
    );
};

export default Waiver;


// TESTING JSPDF
    // const jsPDFTest = () => {
    //     const doc = new jsPDF();
    //     let pdfjs = document.querySelector('#divID');
    //     pdf.addImage(imgData, 'PNG', 0, 0);
    //     const imgData = canvas.toDataURL('image/png');
    
    //     pdf.save('downloaded-file.pdf'); 
    //     doc.text("Hello world!", 10, 10);
    //     doc.save("a4.pdf");
    //     console.log('imageURL: ', imageURL);
    // }