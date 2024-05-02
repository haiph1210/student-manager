import React, {useEffect} from 'react';
import {Button, Container, Fade, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import AddIcon from '@mui/icons-material/Add';
import {add, detail, update} from "./major.service"; // Assuming you have a function named detail and update
import Swal from "sweetalert2";
import {getAll} from "../faculty-manager/faculty.service";

const MajorModal = ({id, type, onClose}) => {
    const [facylties, setFacylties] = React.useState([]);
    const formik = useFormik({
        initialValues: {
            majorName: '',
            facultyId: ''
        },
        validationSchema: Yup.object({
            majorName: Yup.string().required('Vui lòng nhập tên chuyên ngành.'),
            facultyId: Yup.string().required('Vui lòng nhập chọn khoa.'),

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

    const getAllFaculty = async () => {
        const response = await getAll();
        if (response && response.data && response.data.length > 0) {
            setFacylties(response.data);
        }
    }
    const getDetailMajor = async () => {
        if (id && type === 'edit') {
            try {
                const response = await detail(id);
                if (response) {
                    // Lấy dữ liệu từ response
                    const { majorName, faculty } = response.data;

                    formik.setValues({
                        majorName: majorName || '',
                        facultyId: faculty ? faculty.id : ''
                    });
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
        getDetailMajor();
        getAllFaculty();
    }, []);

    return (
        <Fade in={true}>
            <div className="modal-content">
                <h2 className={"text-center"}>{type === 'add' ? 'Thêm mới' : 'Chỉnh sửa'}</h2>
                <Container maxWidth="sm">
                    <form onSubmit={formik.handleSubmit} className="form d-flex flex-column align-items-center">
                        <Typography variant="h4" gutterBottom>
                            Chuyên ngành
                        </Typography>
                        <TextField
                            label="Tên chuyên ngành"
                            variant="outlined"
                            name="majorName"
                            value={formik.values.majorName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.majorName && !!formik.errors.majorName}
                            helperText={formik.touched.majorName && formik.errors.majorName}
                            margin="normal"
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Khoa</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="facultyId"
                                value={formik.values.facultyId}
                                label="Khoa"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {facylties && facylties.map((faculty) => (
                                    <MenuItem key={faculty.id} value={faculty.id}>
                                        {faculty.facultyName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

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

export default MajorModal;
