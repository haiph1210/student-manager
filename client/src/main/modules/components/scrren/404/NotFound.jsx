import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Typography, Button} from '@mui/material';


export default function NotFound() {
    return (
        <Container maxWidth="sm" style={{textAlign: 'center', marginTop: '50px'}}>
            <Typography variant="h2" gutterBottom>
                Xin vui lòng thử lại sau!
            </Typography>
            <Typography variant="h4" gutterBottom>
                Hệ thống đang nâng cấp tính năng này, xin vui lòng thử lại sau!
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary" style={{marginTop: '20px'}}>
                Quay lại trang chủ
            </Button>
        </Container>
    );
};

