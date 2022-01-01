import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import { resetPassword } from '../../../redux/actions/authActions';

import CircularProgress from '../../../helpers/CircularProgress';

import Button from '@material-ui/core/Button';
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
		textAlign: 'start'
	},
	inputField: {
		background: '#fff',
		border: '1px solid #d9d9d9 !important',
		margin: '20px 0',
		borderRadius: 5,
		maxWidth: 250
	}
}));

const VerificationEmail = () => {
	const classes = useStyles();

	const { authStatus, isAuthenticating } = useSelector(state => ({
		isAuthenticating: state.app.isAuthenticating,
		authStatus: state.app.authStatus
	}));
	const dispatch = useDispatch();
	const [isSendingForgotPWRequest, setIsSending] = useState(false);
	const [field, setField] = useState({});

	useScrollTop();
	useDocumentTitle('Forgot Password | Gullit Gebeya');

	const onEmailChange = (value, error) => {
		setField({ email: value, error });
	};

	const onSubmitEmail = () => {
		if (!!field.email && !field.error) {
			dispatch(resetPassword(field.email));
		}
	};

	return (
		<div className="verification-email is-authenthicating">
			<Card className={classes.signinContent}>
				<Grid item spacing={0} xs={12} className={classes.header}>
					<Typography className={classes.headerTypo}>Verify Your Email</Typography>
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
						label="Your Email"
						id="verification"
						name="verification"
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
						/>Send
					</Button>
				</Grid>
			</Card>
		</div>
	);
};

export default VerificationEmail;
