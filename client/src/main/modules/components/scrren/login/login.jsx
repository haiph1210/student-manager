import React, {useState} from 'react';
import {Container, TextField, Button, Typography, InputAdornment, IconButton} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Link} from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './login.scss';
import Swal from "sweetalert2";
import {login} from "./LoginService";

export default function Login(key, value) {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Vui lòng nhập tên đăng nhập.'),
            password: Yup.string().required('Vui lòng nhập mật khẩu.')
        }),
        onSubmit: async (values) => {

            const loginResponse = await login({request: values});
            if (loginResponse) {
                localStorage.setItem("auth", JSON.stringify(loginResponse.data));
                window.location.href = "/";
            }
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Đăng nhập thành công!,',
                showConfirmButton: true,
                timer: 1500
            });
        }
    });

    return (
        <>
            <Container maxWidth="sm" className={"form-container mt-sm-5"}>
                <form onSubmit={formik.handleSubmit} className="form d-flex flex-column align-items-center">
                    <Typography variant="h4" gutterBottom>
                        Đăng nhập
                    </Typography>
                    <TextField
                        label="Tên đăng nhập"
                        variant="outlined"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && !!formik.errors.username}
                        helperText={formik.touched.username && formik.errors.username}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Mật khẩu"
                        variant="outlined"
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility}>
                                        {isPasswordVisible ? <VisibilityOffIcon/> : <RemoveRedEyeIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <div className="link mt-2">
                        <Link to="/forgot-password" variant="body2">
                            Quên mật khẩu
                        </Link>
                    </div>
                    <div className="link m-3">
                        <span>Bạn mới biết đến Shopee? </span>
                        <Link to='/register' variant="body2">
                            Đăng ký
                        </Link>
                    </div>

                    <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                        Đăng nhập
                    </Button>
                </form>
            </Container>
        </>
    );
}