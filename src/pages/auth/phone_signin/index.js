import React, {useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDidMount from '../../../hooks/useDidMount';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import {
	signIn,
	signInWithGoogle,
	signInWithFacebook,
} from '../../../redux/actions/authActions';
//import Input from '../../../helpers/Input';
//import { FORGOT_PHONE_PASSWORD } from '../../../constants/routes';
import CircularProgress from '../../../helpers/CircularProgress';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { useFormik, FormikProvider } from 'formik';
import MuiPhoneNumber from "material-ui-phone-number";
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { BsFillEyeFill } from 'react-icons/bs';
import { RiEyeOffFill } from 'react-icons/ri';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineMail } from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({  
	
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
		background: '#0f7dc2'
    },
	 phoneIcon: {
		background: 'none',
		width: 30,
		height: 25,
		paddingRight: 10,
		color: '#00cc66'
	},
	emailIcon: {
		background: 'none',
		width: 30,
		height: 25,
		paddingRight: 10,
		color: '#00A1F1'
	},
	facebookIcon: {
		background: 'none',
		width: 30,
		height: 25,
		paddingRight: 10,
		color: '#3B5998'
	},
	googleIcon: {
		background: 'none',
		width: 30,
		height: 25,
		paddingRight: 10,
		color: '#3B5998'
	},
	/*googleButton: {
		background: '#fff'
	},
	facebookButton: {
		background: '#fff',
		maxWidth: 200,
		width: '100%'
	}, */
	signinContent: {
		maxWidth: 400,
		height: 'auto',
		margin: 'auto',
		[theme.breakpoints.down('xs')]: {
            width: '100%',
        },	
	},
	signinContentWrapper: {
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
	signinMain: {
		width: '100%',
		paddingRight: 10,
		textAlign: 'start',
	},
	signinitem: {
		padding: '10px 15px',
	},
	checkbox: {
		padding: 5
	},
	signinProvider: {
		width: '100%',
		padding: 10
	},
	textfield: {
        paddingRight: 0,
    	background: '#fff',
		border: '1px solid #d9d9d9 !important',
		margin: '20px 0',
		borderRadius: 5
    },
	signupMessage: {
		width: 'max-content',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: 0,
		marginLeft: 'auto',
		background: 'none',
		border: 'none',
	},
	passwordRecoveryLink: {
		alignItems: 'center',
	},
	signupLink: {
		fontSize: 14,
		padding: 7,
		borderRadius: 5,
		fontFamily: '"Trirong", serif'
	}
}));

//phone sign in
const PhoneSignIn = (props) => {
	const classes = useStyles();
	const { authStatus, isAuthenticating } = useSelector(state => ({
		authStatus: state.app.authStatus,
		isAuthenticating: state.app.isAuthenticating
	}));
	const [providerSelected, setProviderSelected] = useState(undefined);

	const [signInStatus, setSignInStatus] = useState({});
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [field, setField] = useState({});
	// --- 
	const dispatch = useDispatch();
	const didMount = useDidMount();

	useScrollTop();
	useDocumentTitle('Sign In | Gullit Gebeya');
	useEffect(() => {
		if (didMount) {
			setSignInStatus(authStatus);
			setIsSigningIn(isAuthenticating);
		}
		return;
	}, [authStatus, isAuthenticating]);


	const onEmailInput = (value, error) => {
		setField({ ...field, email: { value, error } });
	};

	const onPasswordInput = (value, error) => {
		setField({ ...field, password: { value, error } });
	};

	const onSignInWithEmail = () => props.history.push('signin');

	/* const onPhoneSignUp = () => props.history.push('/phone_signup'); */

	const onPhoneSignUp = () => props.history.push('/verification_phone');

	/* const onForgotPassword = () => props.history.push('/forgot_password'); */

	const onForgotPhonePassword = () => props.history.push('/verification_email');

	const onSignInWithGoogle = () => {
		dispatch(signInWithGoogle());
		setProviderSelected('google');
	};

	const onSignInWithFacebook = () => {
		dispatch(signInWithFacebook());
		setProviderSelected('facebook');
	};

	const onSubmitForm = (e) => {
		e.preventDefault();
		const noError = Object.keys(field).every(key => !!field[key].value && !field[key].error);

		if (noError) {
			dispatch(signIn(field.email.value, field.password.value));
			setProviderSelected('signin');
		}
	};

	const onClickLink = (e) => {
		if (isSigningIn) e.preventDefault();
	};

	const isSuccess = !!authStatus.success && authStatus.type === 'auth';

    const [showPassword, setShowPassword] = useState(false);

	const LoginSchema = Yup.object().shape({
        phone: Yup.string().max(14, 'Phone length must be less than 14').min(13, 'Phone length must be greater than 13').required('Phone is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            phone: '+251',
            password: '',
            remember: false
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const isDisabled = false;

	const authpage = useRef(null);
	const authHandler = () => {
		if (authpage.current && signIn) {
			if (signIn) {
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
			<Card className={classes.signinContent}>
				{isSuccess && (
					<div className="loader">
						<h3 className="toast-success signin-success">
							{authStatus.message}
							<CircularProgress />
						</h3>
					</div>
				)}
				{signInStatus.message && (
					<h5 className="text-center toast-error">
						{authStatus.message}
					</h5>
				)}
				{!isSuccess && (
					<>
						<Grid container spacing={0} className={classes.signinContentWrapper}>
							<Grid className={classes.authHeader} item xs={12} container spacing={0}>
								<Typography className={classes.header}>Sign in to Gullit Gebeya</Typography>
							</Grid>
							<Grid item xs={12} container spacing={0} className={`signin ${signInStatus.message && (!authStatus.success && 'input-error')}`}>
								<Grid item xs={12} container className={classes.signinMain}>
									<FormikProvider value={formik}>
										<form noValidate autoComplete={false} onSubmit={onSubmitForm}>
											<Grid className="signinform">
												<MuiPhoneNumber
													className={classes.textfield}
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
													/* autoComplete="phone" */
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
													onChange={onPasswordInput}
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
													/* autoComplete="current-password" */
													//autocomplete="nope154"
												/>
											</Grid>
											<Grid className="signinitem">
												<FormControlLabel
													className={classes.signinitem}
													control={<Checkbox value="remember" color="primary" disabled={isDisabled} className={classes.checkbox}/>}
													label="Remember me"
												/>
											</Grid>
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
													Sign In
												</Button>
												<Grid xs={12} className={classes.passwordRecoveryLink} container>
													<Grid item>
														<Link onClick={onForgotPhonePassword} variant="body2" disabled={isDisabled}>
															Forgot password?
														</Link>
													</Grid>
													<Grid item spacing={0} className={classes.signupMessage}>
														<Link className={classes.signupLink} onClick={onPhoneSignUp} variant="body2" disabled={isDisabled}>
															{"New user? Sign Up"}
														</Link>
													</Grid>
												</Grid>
											</div>
										</form>
									</FormikProvider>
								</Grid>
								<Grid item xs={12} className="signin-divider">
									<h6>OR</h6>
								</Grid>
								<Grid item xs={12} className="signinProvider">
									<Button
										variant="contained"
										color="primary"
										size='large'
										disabled={isSigningIn}
										onClick={onSignInWithEmail}
									>
										{isSigningIn && providerSelected === 'facebook' ? (
											<CircularProgress theme="light" />
										  ) : (			
											<AiOutlineMail className={classes.emailIcon}/>					
										)}
										<span>Sign in with Email</span>
									</Button>
									<Button
										variant="contained"
										color="primary"
										size='large'
										disabled={isSigningIn}
										onClick={onSignInWithGoogle}
									>
										{isSigningIn && providerSelected === 'google' ? (
											<CircularProgress theme="dark" />
										) : (
												<FcGoogle className={classes.googleIcon}/>
											)}
										<span>Sign in with Google</span>
									</Button>
									<Button
										variant="contained"
										color="primary"
										size='large'
										disabled={isSigningIn}
										onClick={onSignInWithFacebook}
									>
										{isSigningIn && providerSelected === 'github' ? (
											<CircularProgress theme="light" />
										  ) : (
											<FaFacebook className={classes.facebookIcon}/>
										)}
										<span>Sign in with Facebook</span>
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</>
				)}
			</Card>
		</div>
	);
};

export default PhoneSignIn;
