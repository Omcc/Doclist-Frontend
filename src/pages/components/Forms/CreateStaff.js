import React from 'react'
import {useFormik} from "formik";
import * as yup from "yup";
import {
    Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle
} from "@material-ui/core";
import { connect } from 'react-redux';

import {actions} from "modules/Auth/_redux/authRedux"



function CreateStaff(props) {

    const validationSchema = yup.object({
        firstname:yup
            .string("Enter firstname")
            .min(2,'Firstname should be of minimum 2 characters')
            .required('Firstname is required'),
        lastname:yup
            .string('Enter lastname')
            .min(2,'Lastname should be of minimum 2 characters')
            .required('Lastname is required')

    })

    const WithMaterialUI = () => {
        const formik = useFormik({
            initialValues: {
                firstname:'',
                lastname:''
            },
            validationSchema:validationSchema,
            onSubmit:(values) => {
                console.log(props)
                
                props.createStaffRequest(values.firstname,values.lastname)
                formik.resetForm()
                props.handleClose()
            }
       
        })

    return (

        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Create Staff</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please enter informations below to create staff. You may edit the further informations
                    </DialogContentText>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                            fullWidth
                            id="firstname"
                            name="firstname"
                            label="Firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.touched.firstname && formik.errors.firstname}
                            />
                            <TextField
                            fullWidth
                            id="lastname"
                            name="lastname"
                            label="Lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                            />
                            
                        </form>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={formik.handleSubmit} color="primary">
                      Subscribe
                    </Button>
                  </DialogActions>
        </Dialog>
        
      );
    }

    return WithMaterialUI()

}

export default connect(null,actions)(CreateStaff)
