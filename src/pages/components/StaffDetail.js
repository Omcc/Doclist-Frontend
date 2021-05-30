
import React from 'react';
import clsx from 'clsx';
import 'pages/partials/Formik/formik-demo.css';
import 'pages/partials/Formik/rich-editor.css';
import Select from 'react-select';
import {actions} from "modules/Auth/_redux/authRedux"
import {connect, useSelector} from "react-redux"
import {Formik} from "formik";
import {languagesSelector,specsSelector,jobsSelector,titlesSelector} from "modules/Administration/_redux/selectors"
import {withSnackbar} from "pages/partials/Snackbar/SnackbarHOC"




import { 
    makeStyles,
    TextField,
    MenuItem,
    Typography

 } from '@material-ui/core';

 import ProfileAvatar from "pages/partials/Profile/ProfileAvatar"
 import {useFormik} from "formik"

import MultiSelect from "pages/partials/Formik/MultiSelect"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorState,convertToRaw,convertFromRaw} from 'draft-js';
import { RichEditorExample } from "pages/partials/Formik/RichEditor";
import * as Yup from "yup";





const gender= [
    {
        value:"M",
        label:"Male"
    },
    {
        value:"F",
        label:"Female"
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

 

  
  
 function StaffDetail(props) {

    

    const specialisations = useSelector(specsSelector)
    const languages = useSelector(languagesSelector)
    const jobTitles = useSelector(jobsSelector)
    const personalTitles = useSelector(titlesSelector)
    


    

 
    const initialStaffValues = {
        id:props.staff.id,
        clinic:props.staff.clinic,
        title: props.staff.title.id,
        firstname: props.staff.firstname,
        lastname: props.staff.lastname,
        job:props.staff.job.id,
        gender: props.staff.gender,
        description: props.staff.description ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.staff.description))) : EditorState.createEmpty(),
        specialisations:props.staff.specialisations,
        languages:props.staff.languages,
    }

    
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
        title: Yup.number()
        .required(
        ),
        job: Yup.number()
        .required(
        ),
        gender : Yup.string().required(),

          
      });
    
     
      
    const classes = useStyles();
    
  

    return (
      <div className={`${classes.root} bg-white`}>
          <Formik
            initialValues = {initialStaffValues}
            enableReinitialize = {true}
            validationSchema= {LoginSchema}
            onSubmit = {(values) => {

                console.log(values)

                const descriptionState = values.description.getCurrentContent();
                const body = {...values}

                if(body.languages){
                   body.languages =  body.languages.map(language => language.id)
                }
                if(body.specialisations){
                    body.specialisations = body.specialisations.map(spec => spec.id)
                }

                console.log(body)
                console.log(props);
                
        
                
                body.description = JSON.stringify(convertToRaw(descriptionState))
                

                props.updateStaffRequest(values.id,body)
                props.snackbarShowMessage("Staff Informations Updated")
            }}
          >
              {props => (
                <form  className="p-5" onSubmit={props.handleSubmit}>

    
                <div className="d-flex align-items-center">

                <TextField
                select
                className={`${clsx(classes.margin, classes.textField)} `}
                variant="outlined"
                id="title"
                label="Title"
                name="title"
                error={props.touched.title && Boolean(props.errors.title)}
                value={props.values.title}
                onChange={props.handleChange}
                InputProps={{
                    startAdornment: ""
                }}
                >
                {personalTitles.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.name}
                    </MenuItem>
                ))}
                </TextField>



                <TextField
                id="firstname"
                className={`${clsx(classes.margin, classes.textField)} `}
                variant="outlined"
                label="Firstname"
                name="firstname"
                value={props.values.firstname}
                onChange={props.handleChange}
                error={props.touched.firstname && Boolean(props.errors.firstname)}

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
                value={props.values.lastname}
                onChange={props.handleChange}
                error={props.touched.lastname && Boolean(props.errors.lastname)}

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
                value={props.values.gender}
                error={props.touched.gender && Boolean(props.errors.gender)}
                onChange={props.handleChange}
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
                id="job"
                label="Job Title"
                name="job"
                error={props.touched.job && Boolean(props.errors.job)}
                value={props.values.job}
                onChange={props.handleChange}
                InputProps={{
                    startAdornment: ""
                }}
                >
                {jobTitles.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                    {option.title}
                    </MenuItem>
                ))}
                </TextField>
                </div>
                <div className="ml-2 mt-2">
                <Typography variant="body1" gutterBottom>
                    Descriptions
                </Typography>

                <RichEditorExample
                editorState={props.values.description}
                onChange={props.setFieldValue}/>


                </div>

                <MultiSelect 
                    value = {props.values.languages}
                    onChange = {props.setFieldValue}
                    options = {languages}
                    fieldName = "languages"
                    label="Languages"
                    labelKey="name"

                    
                />

                <MultiSelect 
                        value = {props.values.specialisations}
                        onChange = {props.setFieldValue}
                        options = {specialisations}
                        fieldName = "specialisations"
                        label="Specialisations"
                        labelKey="title"
                    
                        
                />








                <button
                id="kt_login_signin_submit"
                type="submit"

                className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
                >
                <span>Update Staff</span>

                </button>
                </form>
              )}
             

          </Formik>
        
        
      </div>
    );
  }


  export default connect(null,{updateStaffRequest:actions.updateStaffRequest})(withSnackbar((StaffDetail)))