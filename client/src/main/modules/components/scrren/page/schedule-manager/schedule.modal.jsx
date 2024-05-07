import React, {useEffect, useState} from 'react';
import {Button, Container, Fade, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import AddIcon from '@mui/icons-material/Add';
import {add, detail, update} from "./schedule.service";
import Swal from "sweetalert2";
import {getAllSubject} from "../subject-manager/subject.service";
import {getAllClass} from "../class-manager/class.service";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {format, parse} from "date-fns";
import dayjs from "dayjs";

const ScheduleModal = ({id, type, onClose}) => {
    const [subjects, setSubjects] = useState([]);
    const [classs, setClass] = useState([]);
    const formatTime = (dateTimeObject) => {
        if (!dateTimeObject || !dateTimeObject.$d) {
            return '';
        }

        const dayJsTime = dayjs(dateTimeObject.$d);

        return dayJsTime.format('HH:mm:ss');
    };


    const formik = useFormik({
        initialValues: {
            startTime: null,
            endTime: null,
            classId: '',
            subjectId: '',
        },
        validationSchema: Yup.object({
            startTime: Yup.date().required('Vui lòng nhập thời gian bắt đầu.'),
            endTime: Yup.date().required('Vui lòng nhập thời gian kết thúc.'),
            classId: Yup.string().required('Vui lòng nhập lớp.'),
            subjectId: Yup.string().required('Vui lòng nhập môn học.'),
        }),
        onSubmit: async (values) => {
            console.log('startTime', formik.values.startTime)
            const startTimeFormatted = dayjs(formik.values.startTime).format('HH:mm:ss');
            const endTimeFormatted = dayjs(formik.values.endTime).format('HH:mm:ss');

            console.log(startTimeFormatted);
            console.log(endTimeFormatted);
            // Tạo object mới chỉ với giờ
            const newValues = {
                startTime: startTimeFormatted,
                endTime: endTimeFormatted,
                classId: values.classId,
                subjectId: values.subjectId,
            };
            console.log(newValues)
            try {
                if (type === 'add') {
                    const addResponse = await add({request: newValues});
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

    const getAllSubjects = async () => {
        const response = await getAllSubject();
        if (response && response.data && response.data.length > 0) {
            setSubjects(response.data);
        }
    }

    const getAllClasss = async () => {
        const response = await getAllClass();
        if (response && response.data && response.data.length > 0) {
            setClass(response.data);
        }
    }

    useEffect(() => {
        getDetail();
        getAllSubjects();
        getAllClasss();
    }, []);

    return (
        <Fade in={true}>
            <div className="modal-content" style={{position: 'absolute', top: '150px', zIndex: 1000}}>
                <Container maxWidth="sm">
                    <form onSubmit={formik.handleSubmit} className="form d-flex flex-column align-items-center">
                        <Typography variant="h4" gutterBottom>
                            Thời khóa biểu
                        </Typography>

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
                        <FormControl fullWidth>
                            <InputLabel id="subjectId-label">Chọn môn học</InputLabel>
                            <Select
                                labelId="subjectId-label"
                                id="subjectId"
                                name="subjectId"
                                value={formik.values.subjectId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {subjects && subjects.map((subject) => (
                                    <MenuItem key={subject.id} value={subject.id}>
                                        {subject.subjectName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br/>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Thời gian bắt đầu"
                                value={formik.values.startTime}
                                onChange={(date) => formik.setFieldValue('startTime', date)}
                                renderInput={(params) => <TextField {...params} />}
                                error={formik.touched.startTime && !!formik.errors.startTime}
                                helperText={formik.touched.startTime && formik.errors.startTime}
                                margin="normal"
                                fullWidth
                                sx={{width: '100%'}}
                            />
                            <div style={{marginBottom: '1rem'}}/>
                            <TimePicker
                                label="Thời gian kết thúc"
                                value={formik.values.endTime}
                                onChange={(date) => formik.setFieldValue('endTime', date)}
                                renderInput={(params) => <TextField {...params} />}
                                error={formik.touched.endTime && !!formik.errors.endTime}
                                helperText={formik.touched.endTime && formik.errors.endTime}
                                margin="normal"
                                fullWidth
                                sx={{width: '100%'}}
                            />
                        </LocalizationProvider>

                        <br/>


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

export default ScheduleModal;
