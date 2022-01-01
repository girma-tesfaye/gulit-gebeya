import React from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { useFormik, FormikProvider } from 'formik';
import MuiPhoneNumber from "material-ui-phone-number";
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({  
	
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
		background: '#0f7dc2'
    },
	signinContent: {
		padding: 0,
		maxWidth: 375,
		height: 'auto',
		margin: 'auto',
		position: 'relative',
		top: '10%',
		[theme.breakpoints.down('xs')]: {
            width: '100%',
        },	
	},
	header: { 
		/* borderBottom: '1px solid #d9d9d9', */
		padding: 10
	},
	headerTypo: {
		fontSize: 20,
		fontFamily: '"Trirong", serif',
		fontWeight: 600
	},
	tittle: {
		padding: 10,
		marginBottom: 10
	},
	tittleTypo: {
		fontSize: 14,
		fontFamily: '"Trirong", serif',
		fontWeight: 100,
		textAlign: 'center'
	},
	inputField: {
		background: '#fff',
		border: '1px solid #d9d9d9 !important',
		margin: '20px 0',
		borderRadius: 5,
		maxWidth: 250
	}
}));

const VerificationPhone = (props) => {
	const classes = useStyles();

	useScrollTop();
	useDocumentTitle('Verify your phone | Gullit Gebeya');

	const LoginSchema = Yup.object().shape({
        phone: Yup.string().max(14, 'Phone length must be less than 14').min(13, 'Phone length must be greater than 13').required('Phone is required'),
    });

	const formik = useFormik({
        initialValues: {
            phone: '+251'
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const { errors, touched, setFieldValue } = formik;

	const isDisabled = false;

	const onSubmitForm = (e) => {
		e.preventDefault();
	};

	return (
		<div className="verification-phone is-authenthicating">
			<Card className={classes.signinContent}>
				<Grid item spacing={0} xs={12} className={classes.header}>
					<Typography className={classes.headerTypo}>Verify Your Phone</Typography>
				</Grid>
				<Grid item spacing={0} xs={12} className={classes.tittle}>
					<Typography className={classes.tittleTypo}>Enter your country code and phone number to receive verification code</Typography>
				</Grid>
				<Grid item spacing={0} xs={12} className="inputform">
					<FormikProvider value={formik}>
						<form noValidate autoComplete={false} onSubmit={onSubmitForm}>
							<MuiPhoneNumber
								className={classes.inputField}
								id="phone"
								name="phone"
								label="Phone number"
								data-cy="user-phone"
								disabled={isDisabled}
								onChange={(value) => {
									setFieldValue('phone', value);
								}}
								defaultCountry={"et"}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								error={Boolean(touched.phone && errors.phone)}
								helperText={touched.phone && errors.phone}
								autocomplete="nope4545"
							/>
							<Button
								className={classes.submit}
								type="submit"
								size='large'
							> Send your phone
							</Button>
						</form>
					</FormikProvider>
				</Grid>
			</Card>
		</div>
	);
};

export default VerificationPhone;