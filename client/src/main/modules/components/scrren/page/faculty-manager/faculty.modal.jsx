import React, { useEffect } from 'react';
import { Button, Container, Fade, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import AddIcon from '@mui/icons-material/Add';
import { add, detail, update } from "./faculty.service"; // Assuming you have a function named detail and update
import Swal from "sweetalert2";

const FacultyModal = ({ id, type, onClose }) => {
    const formik = useFormik({
        initialValues: {
            facultyName: '',
            totalYearLearn: 1
        },
        validationSchema: Yup.object({
            facultyName: Yup.string().required('Vui lòng nhập tên khoa.'),
            totalYearLearn: Yup.number()
                .required('Vui lòng nhập số năm học.')
                .min(1, "Số năm học phải lớn hơn 1")
                .max(10, "Số năm học phải nhỏ hơn 10")
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

    useEffect(() => {
        const fetchData = async () => {
            if (id && type === 'edit') {
                try {
                    const response = await detail(id);
                    if (response) {
                        // Set values for formik
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
        fetchData();
    }, []);

    return (
        <Fade in={true}>
            <div className="modal-content" style={{position: 'absolute', top: '150px', zIndex: 1000}}>
                {/*<h2 className={"text-center"}>{type === 'add' ? 'Thêm mới' : 'Chỉnh sửa'}</h2>*/}
                <Container maxWidth="sm">
                    <form onSubmit={formik.handleSubmit} className="form d-flex flex-column align-items-center">
                        <Typography variant="h4" gutterBottom>
                            Khoa
                        </Typography>
                        <TextField
                            label="Tên khoa"
                            variant="outlined"
                            name="facultyName"
                            value={formik.values.facultyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.facultyName && !!formik.errors.facultyName}
                            helperText={formik.touched.facultyName && formik.errors.facultyName}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Số năm học"
                            variant="outlined"
                            type={'number'}
                            name="totalYearLearn"
                            value={formik.values.totalYearLearn}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.totalYearLearn && !!formik.errors.totalYearLearn}
                            helperText={formik.touched.totalYearLearn && formik.errors.totalYearLearn}
                            margin="normal"
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color={type === 'add' ? "success" : "warning"}
                                size="large" fullWidth>
                            {type === 'add' ? <AddIcon/> : <EditNoteSharpIcon/>}
                            {type === 'add' ? 'Thêm mới' : 'Cập nhật'}
                        </Button>
                    </form>
                </Container>
            </div>
        </Fade>
    );
};

export default FacultyModal;
