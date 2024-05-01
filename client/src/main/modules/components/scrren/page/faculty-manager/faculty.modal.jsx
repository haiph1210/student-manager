import React from 'react';
import {Button, Container, Fade, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import AddIcon from '@mui/icons-material/Add';


const FacultyModal = ({type, onClose}) => {
    const formik = useFormik({
        initialValues: {
            facultyName: '',
            totalYearLearn: ''
        },
        validationSchema: Yup.object({
            facultyName: Yup.string().required('Vui lòng nhập tên khoa.'),
            totalYearLearn: Yup.string()
                .required('Vui lòng nhập số năm học.')
                .min(1, "Số năm học phải lớn hơn 1")
                .max(10, "Số năm học phải nhỏ hơn 10")
        }),
        onSubmit: async (values) => {

            // const loginResponse = await login({request: values});
            // if (loginResponse) {
            //     Swal.fire({
            //         icon: 'success',
            //         title: 'Thành công!',
            //         text: 'Đăng nhập thành công!,',
            //         showConfirmButton: true,
            //         timer: 1500
            //     });
            //     localStorage.setItem("auth", JSON.stringify(loginResponse.data));
            //     window.location.href = "/";
            // }

        }
    });

    return (

        <Fade in={true}>
            <div className="modal-content">
                <h2 className={"text-center"}>{type === 'add' ? 'Thêm mới' : 'Chỉnh sửa'}</h2>

                <>
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
                            {
                                type === 'add'
                                    ? <Button type="submit" variant="contained" color="success" size="large" fullWidth>
                                        <AddIcon/>
                                        Thêm mới
                                    </Button>
                                    : <Button type="submit" variant="contained" color="warning" size="large" fullWidth>
                                        <EditNoteSharpIcon/>
                                        Cập Nhật
                                    </Button>
                            }

                        </form>
                    </Container></>
            </div>
        </Fade>

    );
};

export default FacultyModal;
