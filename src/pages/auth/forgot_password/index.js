import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDidMount from '../../../hooks/useDidMount';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import Input from '../../../helpers/Input'; 
import { resetPassword } from '../../../redux/actions/authActions';

import CircularProgress from '../../../helpers/CircularProgress';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

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
		maxWidth: 400,
		height: 'auto',
		margin: 'auto',
		position: 'relative',
		top: '10%',
		[theme.breakpoints.down('xs')]: {
            width: '100%',
        },	
	},
	header: { 
		borderBottom: '1px solid #d9d9d9',
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
		textAlign: 'start'
	},
	inputField: {
		background: '#fff',
		border: '1px solid #d9d9d9 !important',
		margin: '20px 0',
		borderRadius: 5
	}
}));

const ForgotPassword = () => {
	const classes = useStyles();

	const { authStatus, isAuthenticating } = useSelector(state => ({
		isAuthenticating: state.app.isAuthenticating,
		authStatus: state.app.authStatus
	}));
	const dispatch = useDispatch();
	const didMount = useDidMount();
	const [forgotPWStatus, setForgotPWStatus] = useState({});
	const [isSendingForgotPWRequest, setIsSending] = useState(false);
	const [field, setField] = useState({});

	useScrollTop();
	useDocumentTitle('Forgot Password | Gullit Gebeya');
	useEffect(() => {
		if (didMount) {
			setForgotPWStatus(authStatus);
			setIsSending(isAuthenticating);
		}
	}, [authStatus, isAuthenticating]);

	const onEmailChange = (value, error) => {
		setField({ email: value, error });
	};

	const onSubmitEmail = () => {
		if (!!field.email && !field.error) {
			dispatch(resetPassword(field.email));
		}
	};

	return (
		<div className="forgot_password is-authenthicating">
			<Card className={classes.signinContent}>
				{forgotPWStatus.message && (
					<h5 className={`text-center ${authStatus.success ? 'toast-success' : 'toast-error'}`}>
						{authStatus.message}
					</h5>
				)}
				<Grid item spacing={0} xs={12} className={classes.header}>
					<Typography className={classes.headerTypo}>Forgot Your Password?</Typography>
				</Grid>
				<Grid item spacing={0} xs={12} className={classes.tittle}>
					<Typography className={classes.tittleTypo}>Enter your email address and we will send you a password reset verification code</Typography>
				</Grid>
				<Grid item spacing={0} xs={12} className="inputform">
					<TextField
						className={classes.inputField}
						maxLength={40}
						onChange={onEmailChange}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="your email"
						id="email"
						name="email"
						readOnly={isSendingForgotPWRequest || authStatus.success}
					/>
					<Button
						className={classes.submit}
						disabled={isSendingForgotPWRequest || authStatus.success}
						onClick={onSubmitEmail}
						type="submit"
						size='large'
					>
						<CircularProgress
							theme="light"
							visible={isSendingForgotPWRequest}
						/>
						{isSendingForgotPWRequest ? 'Sending Password Reset Email' : 'Send Password Reset Email'}
					</Button>
				</Grid>
			</Card>
		</div>
	);
};

export default ForgotPassword;
