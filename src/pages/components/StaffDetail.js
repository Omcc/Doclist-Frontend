
import React from 'react';
import clsx from 'clsx';


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

 } from '@material-ui/core';

import {QuickUser} from "_metronic/layout/components/extras/offcanvas/QuickUser"

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



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
  
  export default function StaffDetail() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
      title: '',
      firstname: '',
      lastname: '',
      gender: '',
      jobTitle:'',
      description:''
    });
  
    const handleChange = prop => event => {
      setValues({ ...values, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    return (
      <div className={`${classes.root} bg-white`}>
        
        <div >

            <div>
            <TextField
            select
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Title"
            value={values.title}
            onChange={handleChange('weightRange')}
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
            id="staff-firstname"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Firstname"
            value={values.firstname}
            onChange={handleChange('firstname')}
            InputProps={{
                startAdornment: "",
            }}
            />
            
            <TextField
            id="staff-lastname"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Lastname"
            value={values.lastname}
            onChange={handleChange('lastname')}
            InputProps={{
                startAdornment: "",
            }}
            />

            </div>
           
           
        </div>
        <TextField
            id="outlined-adornment-weight"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Weight"
            value={values.weight}
            onChange={handleChange('weight')}
            helperText="Weight"
            InputProps={{
                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
            />

        <QuickUser />
        <TextField
          id="outlined-adornment-password"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          type={values.showPassword ? 'text' : 'password'}
          label="Password"
          value={values.password}
          onChange={handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }