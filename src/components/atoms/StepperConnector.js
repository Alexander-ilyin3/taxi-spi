import { stepConnectorClasses } from "@mui/material";
import { StepConnector } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StepperConnector = styled(StepConnector)(({ theme }) => {

  return {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.blue,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.blue,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.grey,
      borderTopWidth: 2,
      borderRadius: 1,
    },
  }
})