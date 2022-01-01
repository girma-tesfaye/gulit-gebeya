import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../helpers/Input';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useDidMount from '../../../hooks/useDidMount';
import { signUp } from '../../../redux/actions/authActions';
import CircularProgress from '../../../helpers/CircularProgress';
import useScrollTop from '../../../hooks/useScrollTop';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import MuiPhoneNumber from "material-ui-phone-number";
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

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

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
        fullName: Yup.string().required('Fullname is required'),
        phone: Yup.string().max(14, 'Phone length must be less than 14').min(13, 'Phone length must be greater than 13').required('Phone is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phone: '+251',
            password: '',
            remember: false
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            //navigate('/dashboard', { replace: true });
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const isDisabled = false;

	return (
		<div className="signup">
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
					<div className={`signup-wrapper ${signUpStatus.message && (!authStatus.success && 'input-error')}`}>
						<h3>Sign up to Gullit Gebeya</h3>
						<FormikProvider value={formik}>
							<form className={classes.form} noValidate autoComplete={false}>
								<div className="signup-field">
									<TextField
										variant="outlined"
										margin="normal"
										required
										fullWidth
										disabled={isDisabled}
										id="fullName"
										label="Full Name"
										name="fullName"
										{...getFieldProps('fullName')}
										error={Boolean(touched.fullName && errors.fullName)}
										helperText={touched.fullName && errors.fullName}
										/* autoComplete="email" */
										autocomplete="nope4545"
										//autoFocus
									/>
								</div>
								<div className="signup-field">
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
								<div className="signup-field">
									<div style={{ display: 'flex', alignItems: 'flex-end' }} >
										<div style={{ flexGrow: 1 }}>
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
											/>
										</div>
										<FormControlLabel
											control={<Checkbox value="remember" color="primary" disabled={isDisabled} />}
											label="Remember me"
										/>
									</div>
								</div>
								<br />
								<br />
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
							</form>
						</FormikProvider>
					</div>
					<div className="signin-message">
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2" disabled={isDisabled}>
									Sign up with email
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2" disabled={isDisabled}>
									{"Already have an account? Sign in"}
								</Link>
							</Grid>
						</Grid>
					</div>
				</>
			)}
		</div>
	);
};

export default SignUp;
