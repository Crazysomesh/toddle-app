import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  width: theme.spacing(57.25),
  padding: 0,
  margin: theme.spacing(2.25, 3),
}));

const DialogHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(2.5),
  fontWeight: 700,
  lineHeight: theme.spacing(3.5),
}));

const HelperText = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(1.75),
  fontWeight: 500,
  lineHeight: theme.spacing(2.5),
  marginBottom: theme.spacing(4),
}));

const ActionButton = styled(Button)(() => ({
  backgroundColor: '#D33852',
  color: 'white',
  '&:hover': {
    backgroundColor: '#D33852',
  },
}));

const StyledDialogActions = styled(DialogActions)(() => ({
  padding: 0,
}));

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 0, 5),
}));

const StyledCloseIcon = styled(CloseIcon)(() => ({
  cursor: 'pointer',
}));

const Popup = ({
  title,
  helperText,
  open,
  closePopup,
  actionButtonHandler,
  actionButtonText,
  content,
}) => {
  return (
    <Dialog
      onClose={(e, reason) => {
        if (reason !== 'backdropClick') closePopup();
      }}
      open={open}
      disableEscapeKeyDown
    >
      <StyledDialogContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <DialogHeader>{title}</DialogHeader>
          </Grid>
          <Grid item>
            <StyledCloseIcon onClick={closePopup} />
          </Grid>
        </Grid>
        {helperText && <HelperText>{helperText}</HelperText>}
        <Container>{content}</Container>
        <StyledDialogActions>
          <ActionButton onClick={actionButtonHandler} variant="contained">
            {actionButtonText}
          </ActionButton>
        </StyledDialogActions>
      </StyledDialogContent>
    </Dialog>
  );
};

export default Popup;
