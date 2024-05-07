import React, {useEffect} from 'react';
import {detail} from "./user.service";
import Swal from "sweetalert2";
import {useFormik} from "formik";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {Button} from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modal from "react-bootstrap/Modal";
import AddOrUpdateToClassModal from "./add.or.update.to.class.modal";
import {getRole} from "../../../../../utils/authentication";

export default function UserDetailModal({id, onClose}) {
    const [isModalOpenAddClass, setIsModalOpenAddClass] = React.useState(false);
    const [modalType, setModalType] = React.useState(null);
    const [selectedId, setSelectedId] = React.useState(null);
    const [className, setClassName] = React.useState(null);
    const [role, setRole] = React.useState(null);

    const formik = useFormik({
        initialValues: {
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
        }
    });

    useEffect(() => {
        getDetail();
        setRole(getRole());
    }, []);

    const getDetail = async () => {
        try {
            const response = await detail(id);
            if (response && response.data) {
                formik.setValues(response.data);
                setClassName(response.data.aclass ? response.data.aclass.name : null);
                console.log(className)
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
    };

    function handleResetPassword() {
        console.log(selectedId);
    }

    function handleAddOrUpdateToClass() {
        setIsModalOpenAddClass(true);
    }


    function handleRemoveFromClass() {
    }


    return (
        <>
            <div className="modal-content" style={{position: 'absolute', top: '150px', zIndex: 1000}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="Họ"
                            value={formik.values.firstName}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Tên"
                            value={formik.values.lastName}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Số điện thoại"
                            value={formik.values.phoneNumber}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Địa chỉ"
                            value={formik.values.address}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="nation"
                            name="nation"
                            label="Quốc gia"
                            value={formik.values.nation}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="dateOfBirth"
                            name="dateOfBirth"
                            label="Ngày sinh"
                            value={formik.values.dateOfBirth}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="citizenId"
                            name="citizenId"
                            label="Số CMND"
                            value={formik.values.citizenId}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="religion"
                            name="religion"
                            label="Tôn giáo"
                            value={formik.values.religion}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="nationality"
                            name="nationality"
                            label="Quốc tịch"
                            value={formik.values.nationality}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="gender"
                            name="gender"
                            label="Giới tính"
                            value={formik.values.gender}
                            readOnly={true}
                            variant="outlined"
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={"mt-5 d-flex justify-content-center"}>
                    <Button className={"m-lg-1"} variant="contained" color="inherit"
                            size="small"
                            onClick={() => handleResetPassword()}
                    >
                        <RotateLeftIcon/>Reset Password
                    </Button>
                    {role && role === 'ADMIN' && (
                        <>
                            {!className ? (
                                <Button
                                    className={"m-lg-1"}
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => handleAddOrUpdateToClass()}
                                >
                                    <PlaylistAddCircleIcon/>Thêm vào lớp
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        className={"m-lg-1"}
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleAddOrUpdateToClass()}
                                    >
                                        <EditNoteIcon/> Cập nhật lớp
                                    </Button>
                                    <Button
                                        className={"m-lg-1"}
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleRemoveFromClass()}
                                    >
                                        <DeleteForeverIcon/> Xóa khỏi lớp
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </Grid>

                <Modal show={isModalOpenAddClass}
                       fullscreen={true}
                       onHide={() => onClose()}>
                    <AddOrUpdateToClassModal
                        selectedId={id}
                        className={className}
                        onClose={() => onClose()}/>
                </Modal>

            </div>
        </>
    )
        ;
}