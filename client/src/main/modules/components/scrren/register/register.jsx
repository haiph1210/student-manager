import React, {useState} from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Select,
    MenuItem,
    InputLabel, FormControl
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Link} from "react-router-dom";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './register.scss';
import Swal from "sweetalert2";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Register(key, value) {
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

            // const loginResponse = await login({request: values});
            // if (loginResponse) {
            //     localStorage.setItem("auth", JSON.stringify(loginResponse.data));
            //     window.location.href = "/";
            // }
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
                        Đăng ký tài khoản
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

                    <TextField
                        label="Họ"
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
                        label="Tên"
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
                        label="Email"
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
                        label="Số điện thoại"
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
                        label="Địa chỉ"
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
                        label="Quốc gia"
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
                        label="Quốc gia"
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Basic date picker"/>
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                        label="CMND/CCCD"
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
                        label="Tôn giáo"
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
                        label="Quốc tịch"
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
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.gender}
                            label="Giới tính"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && !!formik.errors.username}
                            helperText={formik.touched.username && formik.errors.username}
                        >
                            <MenuItem value={"MALE"}>Nam</MenuItem>
                            <MenuItem value={"FEMALE"}>Nữ</MenuItem>
                        </Select>
                    </FormControl>


                    <div className="link m-3">
                        <span>Bạn đã có tài khoản ? </span>
                        <Link to='/login' variant="body2">
                            Đăng nhập
                        </Link>
                    </div>

                    <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                        Đăng nhập
                    </Button>
                </form>
            </Container>
        </>
    )
        ;
}
