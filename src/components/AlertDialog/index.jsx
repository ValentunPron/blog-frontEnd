import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertDialog = ({ title = 'Помилка', status, onCloseWindow, text }) => {

	return (
		<Dialog
			open={status}
			keepMounted
			TransitionComponent={Transition}
			onClose={onCloseWindow}
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					{text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCloseWindow}>Закрити</Button>
			</DialogActions>
		</Dialog>
	);
}