import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDidMount from '../../../hooks/useDidMount';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import {
	signIn,
	signInWithGoogle,
	signInWithFacebook,
	signInWithGithub
} from '../../../redux/actions/authActions';
//import Input from '../../../helpers/Input';
import { FORGOT_PASSWORD } from '../../../constants/routes';
import CircularProgress from '../../../helpers/CircularProgress';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { useFormik, Form, FormikProvider } from 'formik';
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

const useStyles = makeStyles((theme) => ({    
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

//phone sign in
const SignIn = (props) => {
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

	const onSignUp = () => props.history.push('/signup');

	const onSignInWithGoogle = () => {
		dispatch(signInWithGoogle());
		setProviderSelected('google');
	};

	const onSignInWithFacebook = () => {
		dispatch(signInWithFacebook());
		setProviderSelected('facebook');
	};

	const onSignInWithGithub = () => {
		dispatch(signInWithGithub());
		setProviderSelected('github');
	};

	/* const onSubmitForm = (e) => {
		e.preventDefault();
		const noError = Object.keys(field).every(key => !!field[key].value && !field[key].error);

		if (noError) {
			dispatch(signIn(field.email.value, field.password.value));
			setProviderSelected('signin');
		}
	}; */

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

	return (
		<div className="signin-content">
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
					<div className={`signin ${signInStatus.message && (!authStatus.success && 'input-error')}`}>
						<div className="signin-main">
							<h3>Sign in to Gullit Gebeya</h3>
							<br />
							<div className="signin-wrapper">
								<FormikProvider value={formik}>
									<form noValidate autoComplete={false}>
										<div className="signin-field">
										<MuiPhoneNumber
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
										</div>
										<div className="signin-field">
										<TextField
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
											/* autoComplete="current-password" */
											//autocomplete="nope154"
											/>
										</div>
										<br />
										<FormControlLabel
											control={<Checkbox value="remember" color="primary" disabled={isDisabled} />}
											label="Remember me"
										/>
										<div className="signin-field signin-action">
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
										<Grid container>
											<Grid item xs>
												<Link href="#" variant="body2" disabled={isDisabled}>
													Forgot password?
												</Link>
											</Grid>
											<Grid item>
												<Link href="#" variant="body2" disabled={isDisabled}>
													{"Don't have an account? Sign Up"}
												</Link>
											</Grid>
										</Grid>
										</div>
									</form>
								</FormikProvider>
							</div>
						</div>
						<div className="signin-divider">
							<h6>OR</h6>
						</div>
						<div className="signin-provider">
							<button
								className="button signin-provider-button provider-facebook"
								disabled={isSigningIn}
								onClick={onSignInWithFacebook}
							>
								{isSigningIn && providerSelected === 'facebook' ? (
									<CircularProgress theme="light" />
								) : (			
                    				<FontAwesomeIcon icon={["fab", "facebook"]} />					
                    
									)}
								<span>Sign in with Facebook</span>
							</button>
							<button
								className="button signin-provider-button provider-google"
								disabled={isSigningIn}
								onClick={onSignInWithGoogle}
							>
								{isSigningIn && providerSelected === 'google' ? (
									<CircularProgress theme="dark" />
								) : (
										<FontAwesomeIcon icon={["fab", "google"]} />
									)}
								<span>Sign in with Google</span>
							</button>
							<button
								className="button signin-provider-button provider-github"
								disabled={isSigningIn}
								onClick={onSignInWithGithub}
							>
								{isSigningIn && providerSelected === 'github' ? (
									<CircularProgress theme="light" />
								) : (
									<FontAwesomeIcon icon={["fab", "github"]} />
									)}
								<span>Sign in with GitHub</span>
							</button>
						</div>
					</div>
					<div className="signin-message">
						<span className="signin-info">
							<strong>Don't have an account?</strong>
						</span>
						<button
							className="button button-small button-border button-border-gray"
							disabled={isSigningIn}
							onClick={onSignUp}
						>
							Sign Up
            			</button>
					</div>
				</>
			)}
		</div>
	);
};

export default SignIn;
