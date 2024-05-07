import React, {useEffect} from 'react';
import {Button, Container, Fade, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import AddIcon from '@mui/icons-material/Add';
import {add, detail, update} from "./subject.service"; 
import Swal from "sweetalert2";

const SubjectModal = ({id, type, onClose}) => {
    const [majores, setMajores] = React.useState([]);
    const formik = useFormik({
        initialValues: {
            subjectName: '',
            credits: ''
        },
        validationSchema: Yup.object({
            subjectName: Yup.string().required('Vui lòng nhập tên môn học.'),
            credits: Yup.string().required('Vui lòng nhập tín chỉ.'),

        }),
        onSubmit: async (values) => {
            try {
                if (type === 'add') {
                    const addResponse = await add({request: values});
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
                    const updateResponse = await update(id, {request: values});
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
            onClose();
        }
    });

    const getDetail = async () => {
        if (id && type === 'edit') {
            try {
                const response = await detail(id);
                if (response) {
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

    return (
        <Fade in={true}>
            <div className="modal-content" style={{position: 'absolute', top: '150px', zIndex: 1000}}>
                {/*<h2 className={"text-center"}>{type === 'add' ? 'Thêm mới' : 'Chỉnh sửa'}</h2>*/}
                <Container maxWidth="sm">
                    <form onSubmit={formik.handleSubmit} className="form d-flex flex-column align-items-center">
                        <Typography variant="h4" gutterBottom>
                            Tên môn học
                        </Typography>
                        <TextField
                            label="Tên môn học"
                            variant="outlined"
                            name="subjectName"
                            value={formik.values.subjectName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.subjectName && !!formik.errors.subjectName}
                            helperText={formik.touched.subjectName && formik.errors.subjectName}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Tín chỉ"
                            type={"number"}
                            variant="outlined"
                            name="credits"
                            value={formik.values.credits}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.credits && !!formik.errors.credits}
                            helperText={formik.touched.credits && formik.errors.credits}
                            margin="normal"
                            fullWidth
                        />
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
    );
};

export default SubjectModal;
