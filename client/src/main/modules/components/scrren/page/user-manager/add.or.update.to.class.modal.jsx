import React, {useEffect, useState} from 'react';
import {Button, Container, Fade, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useFormik} from "formik";
import {getAllClass} from "../class-manager/class.service";
import {addOrUpdateUserToClass, removeUserToClass} from "../user-manager/user.service";
import AddIcon from "@mui/icons-material/Add";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import Swal from "sweetalert2";
import {getRole} from "../../../../../utils/authentication";

export default function AddOrUpdateToClassModal({selectedId, className, onClose}) { // Thêm dấu ngoặc nhọn để lấy tham số type và onClose
    console.log(className)
    const [classs, setClass] = useState([]);
    const [role, setRole] = React.useState(null);

    const formik = useFormik({
        initialValues: {
            classId: '',
        }, onSubmit: async (values) => {
            try {
                if (!className) {
                    const addResponse = await addOrUpdateUserToClass(selectedId, values.classId);
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
                } else {
                    const updateResponse = await addOrUpdateUserToClass(selectedId, values.classId);
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
    const getAllClasss = async () => {
        const response = await getAllClass();
        if (response && response.data && response.data.length > 0) {
            setClass(response.data);
        }
    }


    useEffect(() => {
        getAllClasss();
        setRole(getRole());
    }, []);

    return (
        <Fade in={true}>
            <div className="modal-content" style={{position: 'absolute', top: '150px', zIndex: 1000}}>
                <Container maxWidth="sm">
                    <form onSubmit={formik.handleSubmit} className="form d-flex flex-column align-items-center">
                        <FormControl fullWidth>
                            <InputLabel id="classId-label">Chọn lớp</InputLabel>
                            <Select
                                labelId="classId-label"
                                id="classId"
                                name="classId"
                                value={formik.values.classId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {classs && classs.map((clazz) => (
                                    <MenuItem key={clazz.id} value={clazz.id}>
                                        {clazz.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br/>

                        <Button type="submit" variant="contained"
                                color={!className ? "success" : "warning"}
                                size="large" fullWidth>
                            {!className ? <AddIcon/> : <EditNoteSharpIcon/>}
                            {!className ? 'Thêm mới' : 'Cập nhật'}
                        </Button>
                    </form>
                </Container>
            </div>
        </Fade>
    );
}
