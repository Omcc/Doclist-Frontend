
import React from 'react';
import clsx from 'clsx';
import 'pages/partials/Formik/formik-demo.css';
import 'pages/partials/Formik/rich-editor.css';
import Select from 'react-select';


import { 
    makeStyles,
    IconButton,
    Input,
    InputLabel,
    InputAdornment,
    FormHelperText,
    FormControl,
    TextField,
    MenuItem,
    Typography

 } from '@material-ui/core';

 import ProfileAvatar from "pages/partials/Profile/ProfileAvatar"
 import {useFormik} from "formik"

import MultiSelect from "pages/partials/Formik/MultiSelect"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorState,convertToRaw} from 'draft-js';
import { RichEditorExample } from "pages/partials/Formik/RichEditor";
import * as Yup from "yup";



const ranges = [
    {
      value: '0-20',
      label: '0 to 20',
    },
    {
      value: '21-50',
      label: '21 to 50',
    },
    {
      value: '51-100',
      label: '51 to 100',
    },
  ];

const titles = [
    {
        value:"Mr",
        label:"Mr"
    },
    {
        value:"Ms",
        label:"Ms"
    },
    {
        value:"Miss",
        label:"Miss"
    },
    {
        value:"Dr",
        label:"Dr"
    },
    {
        value:"Opt",
        label:"Opt"
    },
    {
        value:"Sec",
        label:"Sec"
    },
]

const specialisations = [
    {
        value:"Oral Surgery",
        label:"Oral Surgery"
    },
    {
        value:"Nursing",
        label:"Nursing"
    },
    {
        value:"Dentist",
        label:"Dentist"
    }
    
]

const languages = [
    {
        value:"EN",
        label:"English"
    },
    {
        value:"TR",
        label:"Turkish"
    }
]

const gender= [
    {
        value:"Male",
        label:"Male"
    },
    {
        value:"Female",
        label:"Female"
    }
]

const jobTitles = [
    {
        value:"Dentist",
        label:"Dentist"
    },
    {
        value:"Doctor",
        label:"Doctor"
    }
]

  
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      flexBasis: 200,
    },
  }));

  const data="test"

 

  
  
  export default function StaffDetail() {

    const LoginSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
            
            ),
        lastname: Yup.string()
          .min(3, "Minimum 3 symbols")
          .max(50, "Maximum 50 symbols")
          .required(
           
          ),
      });
    
      const formik = useFormik({
        initialValues: {
            title: 'Ms',
            firstname: '',
            lastname: '',
            jobTitle:'',
            gender: '',
            editorState: EditorState.createEmpty(),
            specialisations:[],
            languages:[]
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            console.log(JSON.stringify(convertToRaw(values.editorState.getCurrentContent())))
            console.log(values)
            
          
        },
      });

      
    const classes = useStyles();
    
  
   

  
    return (
      <div className={`${classes.root} bg-white`}>
        
        <form  className="p-5" onSubmit={formik.handleSubmit}>

    
            <div className="d-flex align-items-center">

            <TextField
            select
            className={`${clsx(classes.margin, classes.textField)} `}
            variant="outlined"
            id="title"
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            InputProps={{
                startAdornment: ""
            }}
            >
            {titles.map(option => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>

            

            <TextField
            id="firstname"
            className={`${clsx(classes.margin, classes.textField)} `}
            variant="outlined"
            label="Firstname"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            
            InputProps={{
                startAdornment: "",
            }}
            />

            
            
            <TextField
            id="lastname"
            className={`${clsx(classes.margin, classes.textField)} `}
            variant="outlined"
            label="Lastname"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            
            InputProps={{
                startAdornment: "",
            }}
            />

            <ProfileAvatar />

            </div>

            <div class="d-flex align-items-center">
            <TextField
            select
            className={`${clsx(classes.margin, classes.textField)} `}
            variant="outlined"
            id="gender"
            label="Gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            InputProps={{
                startAdornment: ""
            }}
            >
            {gender.map(option => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>

            <TextField
            select
            className={`${clsx(classes.margin, classes.textField)} `}
            variant="outlined"
            id="jobTitle"
            label="Job Title"
            name="jobTitle"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            InputProps={{
                startAdornment: ""
            }}
            >
            {jobTitles.map(option => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
            </div>
            <div className="ml-2 mt-2">
            <Typography variant="body1" gutterBottom>
                Descriptions
             </Typography>

            <RichEditorExample
            editorState={formik.values.editorState}
            onChange={formik.setFieldValue}/>
            

            </div>

            <MultiSelect 
                value = {formik.values.languages}
                onChange = {formik.setFieldValue}
                options = {languages}
                fieldName = "languages"
                label="Languages"
            
                
            />

            <MultiSelect 
                    value = {formik.values.specialisations}
                    onChange = {formik.setFieldValue}
                    options = {specialisations}
                    fieldName = "specialisations"
                    label="Specialisations"
                
                    
            />



            
            
    


        <button
            id="kt_login_signin_submit"
            type="submit"
            
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Update Staff</span>
           
          </button>
        </form>
      </div>
    );
  }