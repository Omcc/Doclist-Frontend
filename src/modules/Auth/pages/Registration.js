
import React,{useEffect} from 'react';
import {useSelector} from "react-redux"
import clsx from 'clsx';
import 'pages/partials/Formik/formik-demo.css';
import 'pages/partials/Formik/rich-editor.css';
import {FormattedMessage,injectIntl} from "react-intl";


import { connect } from "react-redux";
import * as administration from "modules/Administration/_redux/adminRedux"
import * as clinic from "modules/Clinic/_redux/clinicRedux"
import DividerWithText from "pages/partials/Divider/DividerMiddleText"
import { Alert, AlertTitle } from '@material-ui/lab';

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
    Typography,
 
    Backdrop,
    CircularProgress

 } from '@material-ui/core';

 import ProfileAvatar from "pages/partials/Profile/ProfileAvatar"
 import {useFormik, yupToFormErrors,getIn} from "formik"

import MultiSelect from "pages/partials/Formik/MultiSelect"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorState,convertToRaw} from 'draft-js';
import { RichEditorExample } from "pages/partials/Formik/RichEditor";
import * as Yup from "yup";


const mapDispatchToProps = {
  
    ...administration.actions,
    ...clinic.actions
  
}


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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    alert:{
      fontSize:16
    }
  }));

  const data="test"

 

  
  
  function Registration(props) {
    

    const country= useSelector(state => state.addressFields.countries)
    const cities= useSelector(state => state.addressFields.cities)
    const counties= useSelector(state => state.addressFields.counties)
    const clinicTypes= useSelector(state => state.clinic.clinicTypes)
    const clinicCreate = useSelector(state => state.clinic.clinicCreate)
    
    useEffect(function(){

      console.log(getIn(clinicCreate,"address.city"))
      console.log(props)
      props.requestCountries()
      props.requestClinicTypes()
      
    },[])

    

    const LoginSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
            
            ),
        address: Yup.object().shape({
          city: Yup.number().required(),
          county:Yup.number().required()
        }),
        user:Yup.object().shape({
          email: Yup.string()
            .email("Wrong email format")
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
              
            ),
          firstname:Yup.string()
          .min(3, "Minimum 3 symbols")
          .max(50, "Maximum 50 symbols")
          .required(
          
          ),
          lastname:Yup.string()
          .min(3, "Minimum 3 symbols")
          .max(50, "Maximum 50 symbols")
          .required(
          
          ),
          password: Yup.string()
          .min(3, "Minimum 3 symbols")
          .max(50, "Maximum 50 symbols")
          .required(
           
          ),

        }),
        telephone: Yup.number()
            .required(
            
            ),

       
      });
    
      const formik = useFormik({
        initialValues: {
            clinic_type: '',
            name: '',
            address:{
              country:"",
              city:"",
              county:"",
              full_address:"",
              postal_code:""

            },
            user:{
              email:"",
              firstname:"",
              lastname:"",
              password:""
            },
            telephone:""
            
        },
        validationSchema: LoginSchema,
        onSubmit: values => {

          console.log(getIn(clinicCreate,"loading"))
            
            console.log(values)

            props.requestClinicCreate(values)
            
          
        },
      });

      useEffect(function(){

        if(getIn(clinicCreate,"success")){
          formik.resetForm()
        }
  
      },[getIn(clinicCreate,"success")])

      
    const classes = useStyles();
    
  
   
 
  
    return (
      <div className={`${classes.root} bg-white w-100`}>

      <div >

        {getIn(clinicCreate,"success")?(
          <div>
              <Alert className={classes.alert} severity="success">
            <AlertTitle>Success</AlertTitle>
            We have received your request successfully. We will contact you for your clinic confirmation process — <strong>Thank you for the registration!</strong>
            </Alert>
            </div>
            
        ):""}
      
        <form  className="p-5 " onSubmit={formik.handleSubmit}>

    
<div className="row ">

  <div className="col-lg-5 col-md-5">
    <TextField
    select
    className={`${clsx(classes.margin, classes.textField)} w-100`}
    variant="outlined"
    id="clinic_type"
    label="Clinic Type"
    name="clinic_type"
    value={formik.values.clinic_type}
    onChange={formik.handleChange}
    InputProps={{
        startAdornment: ""
    }}
    >
    {clinicTypes.map(option => (
        <MenuItem key={option.id} value={option.id}>
        {option.name}
        </MenuItem>
    ))}
    </TextField>
  </div>

  

  <div className="col-lg-7 col-md-7">
      <TextField
      fullWidth
      id="name"
      className={`${clsx(classes.margin, classes.textField)} `}
      variant="outlined"
      label="Clinic Name"
      name="name"
      value={formik.values.name}
      onChange={formik.handleChange}
      error={formik.touched.name && Boolean(formik.errors.name)}
      
      InputProps={{
          startAdornment: "",
      }}
      />
  </div>





</div>

<DividerWithText className="mt-3" children={<Typography variant="h5"><FormattedMessage id="CLINIC.ADDRESS" /></Typography>}/>
<div>
  
</div>
<TextField
    fullWidth
    id="address.full_address"
    className={`${clsx(classes.margin, classes.textField)} `}
    variant="outlined"
    label="Clinic Address"
    name="address.full_address"
    value={formik.values.address.full_address}
    onChange={formik.handleChange}
    error={formik.touched.clinicName && Boolean(formik.errors.clinicName)}
    
    InputProps={{
        startAdornment: "",
    }}
    />

<div class="row">
<div className="col-lg-3 col-md-6 col-sm-12">
  <TextField
   fullWidth
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


 </div>     



<div className="col-lg-3 col-md-6 col-sm-12">
<TextField
  fullWidth
  select
  className={`${clsx(classes.margin, classes.textField)} `}
  variant="outlined"
  id="city"
  label="City"
  name="address.city"
  value={formik.values.address.city}
  onChange={(e) => {  props.selectCity(e.target.value); formik.values.address.county="";formik.handleChange("address.city")(e)}}
  InputProps={{
      startAdornment: ""
  }}
  error={getIn(formik.errors,"address.city") && getIn(formik.touched,"address.city") }

  
  >
    {cities.map(option => (
      <MenuItem key={option.id} value={option.id}>
      {option.city_name}
      </MenuItem>
  ))}
  </TextField>

</div>
<div className="col-lg-3 col-md-6 col-sm-12">

<TextField
fullWidth
select
className={`${clsx(classes.margin, classes.textField)} `}
variant="outlined"
id="county"
label="County"
name="address.county"
value={formik.values.address.county}
onChange={formik.handleChange}
InputProps={{
    startAdornment: ""
}}
error={getIn(formik.errors,"address.county") && getIn(formik.touched,"address.county") }


>
  {counties.map(option => (
    <MenuItem key={option.id} value={option.id}>
    {option.county_name}
    </MenuItem>
))}
</TextField>
</div>

<div className="col-lg-3 col-md-6 col-sm-12">
<TextField
      fullWidth
      id="address.postal_code"
      className={`${clsx(classes.margin, classes.textField)} `}
      variant="outlined"
      label="Postal Code"
      name="address.postal_code"
      type="number"
      value={formik.values.address.postal_code}
      onChange={formik.handleChange}
      error={formik.touched.name && Boolean(formik.errors.name)}
      
      InputProps={{
          startAdornment: "",
      }}
      />

</div>


</div>


<DividerWithText className="mt-3" children={<Typography variant="h5">Contact Informations</Typography>}/>

<div className="row">

  <div className="col-lg-4 col-md-4">
  <TextField
    fullWidth
    id="user.firstname"
    className={`${clsx(classes.margin, classes.textField)} `}
    variant="outlined"
    label="Firstname"
    name="user.firstname"
    value={formik.values.user.firstname}
    onChange={formik.handleChange}
    error={getIn(formik.errors,"user.firstname") && getIn(formik.touched,"user.firstname") }
    
    InputProps={{
        startAdornment: "",
    }}
    />
  </div>


  <div className="col-lg-4 col-md-4">
  <TextField
    fullWidth
    id="lastname"
    className={`${clsx(classes.margin, classes.textField)} `}
    variant="outlined"
    label="Lastname"
    name="user.lastname"
    value={formik.values.user.lastname}
    onChange={formik.handleChange}
    error={getIn(formik.errors,"user.lastname") && getIn(formik.touched,"user.lastname") }
    
    InputProps={{
        startAdornment: "",
    }}
    />
  </div>
  <div className="col-lg-4 col-md-4">
  <TextField
    fullWidth
    id="telephone"
    className={`${clsx(classes.margin, classes.textField)} `}
    variant="outlined"
    label="Phone"
    name="telephone"
    value={formik.values.telephone}
    onChange={formik.handleChange}
    error={formik.touched.telephone && Boolean(formik.errors.telephone)}
    
    InputProps={{
        startAdornment: "",
    }}
    />
  </div>

</div>

<TextField
    fullWidth
    id="user.email"
    className={`${clsx(classes.margin, classes.textField)} `}
    variant="outlined"
    label="Email"
    name="user.email"
    value={formik.values.user.email}
    onChange={formik.handleChange}
    error={getIn(formik.errors,"user.email") && getIn(formik.touched,"user.email") }
    
    InputProps={{
        startAdornment: "",
    }}
    />
 <TextField
    fullWidth
    id="user.password"
    className={`${clsx(classes.margin, classes.textField)} `}
    variant="outlined"
    label="Password"
    name="user.password"
    type="password"
    value={formik.values.user.password}
    onChange={formik.handleChange}
    error={getIn(formik.errors,"user.password") && getIn(formik.touched,"user.password") }
    
    InputProps={{
        startAdornment: "",
    }}
    />








<button 
id="kt_login_signin_submit"
type="submit"

className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
>
<span>Create Clinic</span>

</button>


<Backdrop className={classes.backdrop} open={getIn(clinicCreate,"loading")} >
<CircularProgress color="inherit" />
</Backdrop>
</form>
      </div>
        
       
        
      </div>
      
    );
  }


  export default injectIntl(connect(null, mapDispatchToProps)(Registration));