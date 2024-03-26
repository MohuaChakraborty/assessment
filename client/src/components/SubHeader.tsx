import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface UserDetailsHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const SubHeader: React.FC<UserDetailsHeaderProps> = ({ title, showBackButton = true }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/users');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
      {showBackButton && (
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />} sx={{ minWidth: 0 }}>
          
        </Button>
      )}
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default SubHeader;
