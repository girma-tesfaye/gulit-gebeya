import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../helpers/Input';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useDidMount from '../../../hooks/useDidMount';
import { signUp } from '../../../redux/actions/authActions';
import CircularProgress from '../../../helpers/CircularProgress';
import useScrollTop from '../../../hooks/useScrollTop';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { BsFillEyeFill } from 'react-icons/bs';
import { RiEyeOffFill } from 'react-icons/ri';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
		background: '#0f7dc2'
    },
	signUpContent: {
		maxWidth: 400,
		height: 'auto',
		margin: 'auto',
		[theme.breakpoints.down('xs')]: {
            width: '100%',
        },	
	},
	signUpContentWrapper: {
		/* border: '1px solid #c5c5c5' */
	},
	authHeader: {
		padding: 20,
		justifyContent: 'center', 
		borderBottom: '1px solid #f1f1f1'
	},  
	header: { 
		fontSize: 20,
		fontFamily: '"Trirong", serif',
		fontWeight: 600
	},
	signUpMain: {
		width: '100%',
		paddingRight: 10,
		textAlign: 'start',
	},
	signUpitem: {
		padding: '10px 15px',
	},
	checkbox: {
		padding: 5
	},
	textfield: {
        paddingRight: 0,
    	background: '#fff',
		border: '1px solid #d9d9d9 !important',
		margin: '20px 0',
		borderRadius: 5
    },
	signupMessage: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		margin: 'auto',
		background: 'none',
		border: 'none',
		borderTop: '1px solid #d9d9d9',
	},
	signUpPhoneLink: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		margin: 'auto',
		background: 'none',
		border: 'none',
	},
	signUpLink: {
		fontSize: 14,
		padding: 7,
		borderRadius: 5,
		fontFamily: '"Trirong", serif'
	}
}));

const SignUp = (props) => {
	const [passwordHidden, setPasswordHidden] = useState(true);

	/* separate states so that when user navigates to signin or forgot password,
	the authStatus message won't display to other routes.
  */
	const [signUpStatus, setSignUpStatus] = useState({});
	const [isSigningUp, setIsSigningUp] = useState(false);
	// ---
	const { isAuthenticating, authStatus } = useSelector(state => ({
		isAuthenticating: state.app.isAuthenticating,
		authStatus: state.app.authStatus
	}));
	const [field, setField] = useState({});
	const didMount = useDidMount();
	const dispatch = useDispatch();
	const passwordField = useRef(null);

	useScrollTop();
	useDocumentTitle('Sign Up | Gullit Gebeya');
	useEffect(() => {
		if (didMount) {
			setSignUpStatus(authStatus);
			setIsSigningUp(isAuthenticating);
		}
	}, [authStatus, isAuthenticating]);

	const onEmailInput = (value, error) => {
		setField({ ...field, email: { value, error } });
	};

	const onFullnameInput = (value, error) => {
		setField({ ...field, fullname: { value, error } });
	};

	const onPasswordInput = (value, error) => {
		setField({ ...field, password: { value, error } });
	};

	const onTogglePasswordVisibility = () => setPasswordHidden(!passwordHidden);

	const onClickSignIn = () => props.history.push('/signin');

	const onPhoneSignUp = () => props.history.push('/phone_signup')

	/* const onFormSubmit = (e) => {
		e.preventDefault();
		const noError = Object.keys(field).every(key => !!field[key].value && !field[key].error);

		if (noError) {
			dispatch(signUp({
				fullname: field.fullname.value.trim(),
				email: field.email.value.trim().toLowerCase(),
				password: field.password.value.trim()
			}));
		}
	}; */
	const isSuccess = !!authStatus.success && authStatus.type === 'auth';

	const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        /* fullName: Yup.string().required('Fullname is required'), 
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')*/
    });

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            //navigate('/dashboard', { replace: true });
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const isDisabled = false;

	const authpage = useRef(null);
	const authHandler = () => {
		if (authpage.current && signUp) {
			if (signUp) {
				authpage.current.classList.add('is-authenthicating');
			} else {
				authpage.current.classList.remove('is-authenthicating');
			}
		}
	};

	useEffect(() => {
		window.addEventListener('click', authHandler);

		return () => window.removeEventListener('click', authHandler);
	}, []);


	return (
		<div className="auth-page" ref={authpage}>
			<Card className={classes.signUpContent}>
				{isSuccess && (
					<div className="loader">
						<h3 className="toast-success signin-success">
							{authStatus.message}
							<CircularProgress />
						</h3>
					</div>
				)}
				{signUpStatus.message && (
					<h5 className="text-center toast-error">
						{authStatus.message}
					</h5>
				)}
				{!isSuccess && (
					<>
						<Grid container spacing={0} className={classes.signUpContentWrapper}>
							<Grid className={classes.authHeader} item xs={12} container spacing={0}>
								<Typography className={classes.header}>Sign in to Gullit Gebeya</Typography>
							</Grid>
							<Grid item xs={12} container spacing={0} className={`signup ${signUpStatus.message && (!authStatus.success && 'input-error')}`}>
								<Grid item xs={12} className={classes.signUpMain}>
									<FormikProvider value={formik}>
										<form className={classes.form} noValidate autoComplete={false}>
											<Grid className="signUpform">
												<TextField
													className={classes.textfield}
													variant="outlined"
													margin="normal"
													required
													fullWidth
													disabled={isDisabled}
													id="fullName"
													label="Full Name"
													name="fullName"
													onChange={onFullnameInput}
													{...getFieldProps('fullName')}
													error={Boolean(touched.fullName && errors.fullName)}
													helperText={touched.fullName && errors.fullName}
													/* autoComplete="email" */
													autocomplete="nope4545"
													//autoFocus
												/>
												<TextField
													className={classes.textfield}
													variant="outlined"
													margin="normal"
													required
													fullWidth
													disabled={isDisabled}
													id="email"
													label="Email Address"
													name="email"
													onChange={onEmailInput}
													{...getFieldProps('email')}
													error={Boolean(touched.email && errors.email)}
													helperText={touched.email && errors.email}
													/* autoComplete="email" */
													autocomplete="nope4545"
													//autoFocus
												/>
												<TextField
													className={classes.textfield}
													variant="outlined"
													margin="normal"
													required
													fullWidth
													disabled={isDisabled}
													name="password"
													label="Password"
													type={showPassword ? 'text' : 'password'}
													id="password"
													{...getFieldProps('password')}
													InputProps={{
														endAdornment: (
															<InputAdornment position="end">
																<IconButton onClick={handleShowPassword} edge="end">
																{showPassword ? <BsFillEyeFill/> : <RiEyeOffFill />}
																</IconButton>
															</InputAdornment>
														)
													}}
													error={Boolean(touched.password && errors.password)}
													helperText={touched.password && errors.password}
												/>
											</Grid>
											<Grid className="signupitem">
												<FormControlLabel
													className={classes.signUpitem}
													control={<Checkbox value="remember" color="primary" disabled={isDisabled} className={classes.checkbox}/>}
													label="Remember me"
												/>
											</Grid>
											<br />
											<div className="signin-action">
												<Button
													type="submit"                    
													fullWidth
													variant="contained"
													disabled={isDisabled}
													color="primary"
													size='large'
													className={classes.submit}
												>
													<CircularProgress visible={isSigningUp} theme="light" />
														{isSigningUp ? 'Signing Up' : 'Sign Up'}
												</Button>
											</div>
										</form>
									</FormikProvider>
								</Grid>
								<Grid item xs={12} container spacing={0} className={classes.signUpPhoneLink}>
									<Link className={classes.signUpLink} onClick={onPhoneSignUp} variant="body2" disabled={isDisabled}>
										Sign up with your phone 
									</Link>
								</Grid>
							</Grid>
							<Grid item xs={12} container spacing={0} className={classes.signupMessage}>
								<Link className={classes.signUpLink} onClick={onClickSignIn} variant="body2" disabled={isDisabled}>
									{"Already Registered? Sign In"}
								</Link>
							</Grid>
						</Grid>
					</>
				)}
			</Card>
		</div>
	);
};

export default SignUp;
