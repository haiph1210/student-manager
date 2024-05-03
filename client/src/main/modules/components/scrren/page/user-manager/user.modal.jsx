import React, {useEffect} from 'react';
import {Button, Container, Fade, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import AddIcon from '@mui/icons-material/Add';
import {add, detail, update} from "./user.service"; // Assuming you have a function named detail and update
import Swal from "sweetalert2";
import {getAll} from "../major-manager/major.service";

const UserModal = ({id, type, onClose}) => {
    const [majores, setMajores] = React.useState([]);
    const formik = useFormik({
        initialValues: {
            name: '',
            majorId: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên chuyên ngành.'),
            majorId: Yup.string().required('Vui lòng nhập chọn khoa.'),

        }),
        onSubmit: async (values) => {
            console.log('hi')
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

    const getAllMajores = async () => {
        const response = await getAll();
        if (response && response.data && response.data.length > 0) {
            setMajores(response.data);
        }
    }
    const getDetailClass = async () => {
        if (id && type === 'edit') {
            try {
                const response = await detail(id);
                if (response) {
                    const {name, major} = response.data;

                    formik.setValues({
                        name: name || '',
                        majorId: major ? major.id : ''
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
        getDetailClass();
        getAllMajores();
    }, []);

    return (
        <Fade in={true}>
            <div className="modal-content">
                <h2 className={"text-center"}>{type === 'add' ? 'Thêm mới' : 'Chỉnh sửa'}</h2>
                <Container maxWidth="sm">
                    <form onSubmit={formik.handleSubmit} className="form d-flex flex-column align-items-center">
                        <Typography variant="h4" gutterBottom>
                            Lớp học
                        </Typography>
                        <TextField
                            label="Tên lớp"
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && !!formik.errors.name}
                            helperText={formik.touched.name && formik.errors.name}
                            margin="normal"
                            fullWidth
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Chuyên ngành</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="majorId"
                                value={formik.values.majorId}
                                label="Chuyên ngành"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {majores && majores.map((major) => (
                                    <MenuItem key={major.id} value={major.id}>
                                        {major.majorName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

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

export default UserModal;
