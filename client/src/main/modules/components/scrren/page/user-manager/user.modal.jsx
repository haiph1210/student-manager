import React, {useEffect, useState} from 'react';
import {
    Button,
    Container,
    Fade,
    FormControl, IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import AddIcon from '@mui/icons-material/Add';
import {add, detail, update} from "./user.service"; // Assuming you have a function named detail and update
import Swal from "sweetalert2";
import {getAllMajor} from "../major-manager/major.service";
import {register} from "../../authentication/authentication.service";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {Link} from "react-router-dom";

const UserModal = ({id, type, onClose}) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const getDetail = async () => {
        if (id && type === 'edit') {
            try {
                const response = await detail(id);
                if (response&& response.data) {
                    formik.setValues(response.data);
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Thông báo!',
                        text: 'Có lỗi xảy ra phía server!',
                        showConfirmButton: true,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        getDetail();
    }, []);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            nation: '',
            dateOfBirth: '',
            citizenId: '',
            religion: '',
            nationality: '',
            gender: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Vui lòng nhập tên đăng nhập.'),
            password: Yup.string().required('Vui lòng nhập mật khẩu.'),
            firstName: Yup.string().required('Vui lòng nhập họ.'),
            lastName: Yup.string().required('Vui lòng nhập tên.'),
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Vui lòng nhập email.'),
            phoneNumber: Yup.string()
                .matches(/^[0-9]+$/, 'Số điện thoại chỉ chứa số')
                .min(10, 'Số điện thoại phải ít nhất 10 ký tự')
                .max(10, 'Số điện thoại không được vượt quá 10 ký tự')
                .required('Vui lòng nhập số điện thoại.'),
            dateOfBirth: Yup.string()
                .required('Vui lòng nhập ngày sinh.')
        }),
        onSubmit: async (values) => {
            try {
                if (type === 'add') {
                    const addResponse = await add({ request: values });
                    if (addResponse) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công!',
                            text: 'Thêm mới thành công!',
                            showConfirmButton: true,
                            timer: 1500
                        });
                        onClose();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thất bại!',
                            text: 'Thêm mới thất bại!',
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
                } else if (type === 'edit') {
                    const updateResponse = await update(id, { request: values });
                    if (updateResponse) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công!',
                            text: 'Cập nhật thành công!',
                            showConfirmButton: true,
                            timer: 1500
                        });
                        onClose();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thất bại!',
                            text: 'Cập nhật thất bại!',
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    return (
        <>
            <Fade in={true}>
                <div className="modal-content" style={{position: 'absolute', top: '150px', zIndex: 1000}}>
                    {/*<h2 className={"text-center"}>{type === 'add' ? 'Thêm mới' : 'Chỉnh sửa'}</h2>*/}
                    <Container maxWidth="sm">
                        <form onSubmit={formik.handleSubmit} className="form d-flex flex-column align-items-center">
                            {/*<Typography variant="h4" gutterBottom>*/}
                            {/*    */}
                            {/*</Typography>*/}
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
                                style={{ display: type === 'edit' ? 'none' : 'block' }}
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
                                style={{ display: type === 'edit' ? 'none' : 'block' }}
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
                                name="firstName" // Chỉnh sửa tên của trường để phản ánh chính xác dữ liệu
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && !!formik.errors.firstName}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                margin="normal"
                                fullWidth
                            />

                            <TextField
                                label="Tên"
                                variant="outlined"
                                name="lastName" // Chỉnh sửa tên của trường để phản ánh chính xác dữ liệu
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && !!formik.errors.lastName}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                margin="normal"
                                fullWidth
                            />

                            <TextField
                                label="Email"
                                variant="outlined"
                                name="email" // Chỉnh sửa tên của trường để phản ánh chính xác dữ liệu
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && !!formik.errors.email}
                                helperText={formik.touched.email && formik.errors.email}
                                margin="normal"
                                fullWidth
                            />

                            <TextField
                                label="Số điện thoại"
                                variant="outlined"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                margin="normal"
                                fullWidth
                            />

                            <TextField
                                label="Địa chỉ"
                                variant="outlined"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // error={formik.touched.address && !!formik.errors.address}
                                // helperText={formik.touched.address && formik.errors.address}
                                margin="normal"
                                fullWidth
                            />

                            <TextField
                                label="Quốc gia"
                                variant="outlined"
                                name="nation"
                                value={formik.values.nation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // error={formik.touched.nation && !!formik.errors.nation}
                                // helperText={formik.touched.nation && formik.errors.nation}
                                margin="normal"
                                fullWidth
                            />

                            <TextField
                                label="Ngày sinh"
                                variant="outlined"
                                name="dateOfBirth"
                                placeholder="DD/MM/YYYY"
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.dateOfBirth && !!formik.errors.dateOfBirth}
                                helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                margin="normal"
                                fullWidth
                            />

                            <TextField
                                label="CMND/CCCD"
                                variant="outlined"
                                name="citizenId"
                                value={formik.values.citizenId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // error={formik.touched.citizenId && !!formik.errors.citizenId}
                                // helperText={formik.touched.citizenId && formik.errors.citizenId}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Tôn giáo"
                                variant="outlined"
                                name="religion"
                                value={formik.values.religion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // error={formik.touched.religion && !!formik.errors.religion}
                                // helperText={formik.touched.religion && formik.errors.religion}
                                margin="normal"
                                fullWidth
                            />
                            <TextField
                                label="Quốc tịch"
                                variant="outlined"
                                name="nationality"
                                value={formik.values.nationality}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // error={formik.touched.nationality && !!formik.errors.nationality}
                                // helperText={formik.touched.nationality && formik.errors.nationality}
                                margin="normal"
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name={"gender"}
                                    value={formik.values.gender}
                                    label="Giới tính"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.gender && !!formik.errors.gender}
                                    helperText={formik.touched.gender && formik.errors.gender}
                                >
                                    <MenuItem value={"MALE"}>Nam</MenuItem>
                                    <MenuItem value={"FEMALE"}>Nữ</MenuItem>
                                </Select>
                            </FormControl>

                            <br/>
                            {/*<div className="link m-3">*/}
                            {/*    <span>Bạn đã có tài khoản ? </span>*/}
                            {/*    <Link to='/login' variant="body2">*/}
                            {/*        Đăng nhập*/}
                            {/*    </Link>*/}
                            {/*</div>*/}

                            <Button type="submit" variant="contained"
                                    color={type === 'add' ? "success" : "warning"}
                                    size="large" fullWidth>
                                {type === 'add' ? <AddIcon/> : <EditNoteSharpIcon/>}
                                {type === 'add' ? 'Thêm mới' : 'Cập nhật'}
                            </Button>
                        </form>
                    </Container>
                </div>
            </Fade>
        </>
    );
};

export default UserModal;
