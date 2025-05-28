import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorDisplayProps {
  /** Icon to display; defaults to a warning icon */
  icon?: React.ReactNode;
  /** Main title of the error */
  title: string;
  /** Detailed message explaining the error */
  description?: string;
  /** Optional action button */
  actionLabel?: string;
  /** Callback when action button is clicked */
  onAction?: () => void;
}

/**
 * Reusable error display component for empty states, network errors, etc.
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
      p={4}
    >
      <Box mb={2}>
        {icon || <ErrorOutlineIcon color="warning" style={{ fontSize: 60 }} />}
      </Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="textSecondary" paragraph>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" color="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default ErrorDisplay;
