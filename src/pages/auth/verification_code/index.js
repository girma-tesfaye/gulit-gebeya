

import React, {useState} from 'react';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { useFormik, FormikProvider } from 'formik';
import TextField from '@material-ui/core/TextField';
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
		maxWidth: 250,
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
		fontSize: 18,
		fontFamily: '"Trirong", serif',
		fontWeight: 100
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

const VerificationCode = (props) => {
	const classes = useStyles();
	const [field, setField] = useState({});

	useScrollTop();
	useDocumentTitle('Verify your phone | Gullit Gebeya');

	const LoginSchema = Yup.object().shape({
        code: Yup.string().length(6, 'Code length is 6').required('Code is required'),
    });

	const onCodeInput = (value, error) => {
		setField({ ...field, fullname: { value, error } });
	};

	const formik = useFormik({
        initialValues: {
            code: ''
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const { errors, touched, getFieldProps } = formik;

	const isDisabled = false;

	const onSubmitForm = (e) => {
		e.preventDefault();
	};

	return (
		<div className="verification-code is-authenthicating">
			<Card className={classes.signinContent}>
				<Grid item spacing={0} xs={12} className={classes.header}>
					<Typography className={classes.headerTypo}>Verify Your Phone</Typography>
				</Grid>
				<Grid item spacing={0} xs={12} className={classes.tittle}>
					<Typography className={classes.tittleTypo}>Enter the code sent to your phone</Typography>
				</Grid>
				<FormikProvider value={formik}>
					<form noValidate autoComplete={false} onSubmit={onSubmitForm}>
						<Grid item spacing={0} xs={12} className="inputform">
							<TextField
								length={6}
								className={classes.inputField}
								id="code"
								name="code"
								label="Code"
								disabled={isDisabled}
								onChange={onCodeInput}
								{...getFieldProps('fullName')}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								error={Boolean(touched.code && errors.code)}
								helperText={touched.code && errors.code}
								autocomplete="nope4545"
							/>
							<Button
								className={classes.submit}
								type="submit"
								size='large'
							> Verify
							</Button>
						</Grid>
					</form>
				</FormikProvider>
			</Card>
		</div>
	);
};

export default VerificationCode;