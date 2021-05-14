
import React,{useEffect} from 'react';
import {useSelector} from "react-redux"
import clsx from 'clsx';
import 'pages/partials/Formik/formik-demo.css';
import 'pages/partials/Formik/rich-editor.css';
import Select from 'react-select';
import {FilledInput} from '@material-ui/core';
import { connect } from "react-redux";
import * as administration from "modules/Administration/_redux/adminRedux"


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
 import {useFormik, yupToFormErrors} from "formik"

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

const clinicTypes = [
    {
        value:"Dentist",
        label:"Dentist"
    },
    {
        value:"HairPlanter",
        label:"HairPlanter"
    }
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

 

  
  
  function Registration(props) {

    const country= useSelector(state => state.addressFields.countries)
    const cities= useSelector(state => state.addressFields.cities)


    useEffect(function(){
      console.log(props)
      props.requestCountries()
    },[])

    const LoginSchema = Yup.object().shape({
        clinicName: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
            
            ),
        address: Yup.object().shape({
          city: Yup.number().required()
        })
       
      });
    
      const formik = useFormik({
        initialValues: {
            clinicTypes: '',
            clinicName: '',
            lastname: '',
            jobTitle:'',
            
            address:{
              country:"",
              city:""

            },
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
      <div className={`${classes.root} bg-white w-100`}>
        
        <form  className="p-5 w-100" onSubmit={formik.handleSubmit}>

    
            <div className="row w-100">

            <div className="col-lg-5 col-md-5">
                <TextField
                select
                className={`${clsx(classes.margin, classes.textField)} `}
                variant="outlined"
                id="clinicType"
                label="Clinic Type"
                name="clinicType"
                value={formik.values.title}
                onChange={formik.handleChange}
                InputProps={{
                    startAdornment: ""
                }}
                >

                {clinicTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </div>
            
            <div className="col-lg-7 col-md-7">
                <TextField
                fullWidth
                id="clinicName"
                className={`${clsx(classes.margin, classes.textField)} `}
                variant="outlined"
                label="Clinic Name"
                name="clinicName"
                value={formik.values.clinicName}
                onChange={formik.handleChange}
                error={formik.touched.clinicName && Boolean(formik.errors.clinicName)}
                
                InputProps={{
                    startAdornment: "",
                }}
                />
            </div>
            

            

            </div>

            <div class="d-flex align-items-center">
            <TextField
            select
            className={`${clsx(classes.margin, classes.textField)} `}
            variant="outlined"
            id="country"
            label="Country"
            name="address.country"
            value={formik.values.address.country}
            onChange={(e) => { console.log(e.target.value); props.selectCountry(e.target.value); formik.values.address.city="";formik.handleChange("address.country")(e)}}
            InputProps={{
                startAdornment: ""
            }}
            
            >
              {country.map(option => (
                <MenuItem key={option.id} value={option.id}>
                {option.country_name}
                </MenuItem>
            ))}
            </TextField>

            <TextField
            select
            className={`${clsx(classes.margin, classes.textField)} `}
            variant="outlined"
            id="city"
            label="City"
            name="address.city"
            value={formik.values.address.city}
            onChange={formik.handleChange}
            InputProps={{
                startAdornment: ""
            }}
            error={formik.touched.address.city && Boolean(formik.errors.address.city)}
            
            >
              {cities.map(option => (
                <MenuItem key={option.id} value={option.id}>
                {option.city_name}
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


  export default connect(null, administration.actions)(Registration);