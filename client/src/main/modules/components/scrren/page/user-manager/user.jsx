import React, {useEffect} from 'react';
import {deleted, getAll} from "./user.service";
import Swal from "sweetalert2";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {formatDate} from "../../../../../utils/date.utils";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteSweepSharpIcon from "@mui/icons-material/DeleteSweepSharp";
import AddIcon from "@mui/icons-material/Add";
import {DataGrid} from "@mui/x-data-grid";
import Modal from "react-bootstrap/Modal";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UserModal from "./user.modal";
import UserDetailModal from "./user.detail.modal";
import {getRole} from "../../../../../utils/authentication";
import DataTable from "../../../../student-manager/share/table";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
export default function Class(props) {
    const [rows, setRows] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalOpenDetail, setIsModalOpenDetail] = React.useState(false);
    const [isModalOpenAddClass, setIsModalOpenAddClass] = React.useState(false);
    const [modalType, setModalType] = React.useState(null);
    const [selectedId, setSelectedId] = React.useState(null);
    const [selectedIds, setSelectedIds] = React.useState([]);
    const [role, setRole] = React.useState(null);
    const [isModalOpenSchedule, setIsModalOpenSchedule] = React.useState(false);
    const [rowSchedule, setRowSchedule] = React.useState(null);
    const [columnSchedule, setColumnSchedule] = React.useState(null);
    const [roleSelected, setRoleSelected] = React.useState('ADMIN');


    function handleSchedule(schedules) {
        if (schedules) {
            setIsModalOpenSchedule(true);
            const column = [
                {field: 'id', headerName: 'ID', width: 70},
                {
                    field: 'aClass',
                    headerName: 'Tên lớp học',
                    width: 200,
                    valueFormatter: (params) => params.name
                },
                {
                    field: 'subject',
                    headerName: 'Tên môn học',
                    width: 200,
                    valueFormatter: (params) => params.subjectName
                },
                {
                    field: 'startTime',
                    headerName: 'Giờ bắt đầu',
                    width: 200
                },
                {
                    field: 'endTime',
                    headerName: 'Giờ kết thúc',
                    width: 200,
                },
            ];
            setColumnSchedule(column);
            setRowSchedule(schedules);
        }
    }

    const handleSelectionModelChange = (selectionModel) => {
        console.log(selectionModel)
        setSelectedIds(selectionModel);
    };

    function handleAddNew() {
        setIsModalOpen(true);
        setModalType('add');
    }

    function handleResetPassword() {
        console.log(selectedId);
    }

    function handleAddToClass() {
        setIsModalOpenAddClass(true);
        setModalType('add');
    }


    function handleUpdateToClass() {
        setIsModalOpenAddClass(true);
        setModalType('edit');
    }

    function handleUpdateToClass() {
    }

    function handleRemoveFromClass() {
    }

    function handleEditClick(id) {
        setSelectedId(id);
        setIsModalOpen(true);
        setModalType('edit');
    }

    const handleDelete = async (id) => {
        const deleteResp = await deleted(id);
        if (deleteResp) {
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Xóa thành công!',
                showConfirmButton: true,
                timer: 1500
            });
            getAllData();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Thất bại!',
                text: 'Xóa thất bại!',
                showConfirmButton: true,
                timer: 1500
            });
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        getAllData();
    };

    const handleCloseModalDetail = () => {
        setIsModalOpenDetail(false);
        getAllData();
    };

    const getAllData = async () => {
        try {
            const response = await getAll(roleSelected);
            if (response && response.data && response.data.length > 0) {
                const formattedData = response.data.map(item => ({
                    ...item,
                    fullName: `${item.firstName} ${item.lastName}`
                }));
                setRows(formattedData);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Thất bại!',
                text: error,
                showConfirmButton: true,
                timer: 1500
            });
        }
    };

    function handleIdClick(id) {
        setSelectedId(id);
        setIsModalOpenDetail(true);
    }

    useEffect(() => {
        getAllData();
        setRole(getRole());
    }, []);

    let isAdmin = role === 'ADMIN';
    const columns = [
        {
            field: 'id', headerName: 'ID', width: 90,
            renderCell: (params) => (
                <Button variant="outlined" color="primary" size="small" onClick={() => handleIdClick(params.value)}>
                    {params.value}
                </Button>
            )
        },

        {field: 'fullName', headerName: 'Họ và tên', width: 200},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'phoneNumber', headerName: 'Số điện thoại', width: 150},
        {field: 'address', headerName: 'Địa chỉ', width: 300},
        {field: 'nation', headerName: 'Quốc gia', width: 150},
        {field: 'dateOfBirth', headerName: 'Ngày sinh', width: 150},
        {field: 'citizenId', headerName: 'Số CMND', width: 200},
        {field: 'religion', headerName: 'Tôn giáo', width: 150},
        {field: 'nationality', headerName: 'Quốc tịch', width: 150},
        {field: 'gender', headerName: 'Giới tính', width: 150},
        {
            field: 'aClass', headerName: 'Sinh viên lớp', width: 150,
            valueFormatter: (params) => {
                return params && params.name;
            }
        },
        {
            field: 'schedules',
            headerName: 'Lịch học',
            width: 180,
            // valueFormatter: (params) => params.length,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        onClick={() => handleSchedule(params.row.aClass.schedules)}
                    >
                        <CalendarMonthIcon/>
                        Lịch học
                    </Button>
                </div>
            ),
        },
        {
            field: 'createdBy',
            headerName: 'Người tạo',
            width: 130,
            valueFormatter: (params) => params ?? "ADMIN"
        },
        {
            field: 'updatedBy',
            headerName: 'Người thay đổi',
            width: 130,
            valueFormatter: (params) => params ?? "ADMIN"

        },
        {
            field: 'createdDate',
            headerName: 'Ngày tạo',
            width: 130,
            valueFormatter: (params) => formatDate(params),
        },
        {
            field: 'updatedDate',
            headerName: 'Ngày thay đổi',
            sortable: false,
            width: 160,
            valueFormatter: (params) => formatDate(params),
        },

        isAdmin && {
            field: 'actions',
            headerName: 'Hành động',
            sortable: false,
            width: 250,
            renderCell: (params) => (
                <div className={''}>
                    <Button className={"m-lg-1"} variant="contained" color="warning"
                            size="small"
                            onClick={() => handleEditClick(params.row.id)}>
                        <EditNoteSharpIcon/>
                        Cập nhật
                    </Button>
                    <Button variant="outlined" color="error"
                            size="small"
                            onClick={async () => handleDelete(params.row.id)}>
                        <DeleteSweepSharpIcon/>
                        Xóa
                    </Button>
                </div>
            ),
        }
    ];

    function findAction() {
        getAllData();
    }

    return (
        <div>
            <div className={"d-flex justify-content-start mb-lg-3"}>
                <FormControl size={'medium'}>
                    <InputLabel id="role-label">Vai trò</InputLabel>
                    <Select
                        labelId="role-label"
                        id="roleSelected"
                        name="roleSelected"
                        value={roleSelected} // Set the value of the Select component
                        onChange={(event) => setRoleSelected(event.target.value)}
                    >
                        <MenuItem value="ALL">Tất cả</MenuItem>
                        <MenuItem value="ADMIN">Quản trị viên</MenuItem>
                        <MenuItem value="USER">Sinh viên</MenuItem>

                    </Select>


                </FormControl>
                <Button className={"ms-3"} variant="contained" color="info"
                        size="small"
                        onClick={() => findAction()}>
                    <ManageSearchIcon/>Tìm kiếm
                </Button>

            </div>



            {role && role === 'ADMIN' && (
                <div className={"d-flex justify-content-start"}>
                    <Button className={"m-lg-1"} variant="contained" color="success"
                            size="small"
                            onClick={() => handleAddNew()}>
                        <AddIcon/>Thêm mới
                    </Button>
                </div>
            )}


            <DataGrid
                className="table-container mt-3"
                rows={rows}
                columns={columns}
                pageSize={10}
                checkboxSelection
                onSelectionModelChange={handleSelectionModelChange}
                selectionModel={selectedIds}
            />
            <Modal show={isModalOpen}
                   fullscreen={true}
                   onHide={() => setIsModalOpen(false)}>
                <UserModal
                    id={selectedId}
                    type={modalType}
                    onClose={handleCloseModal}/>
            </Modal>
            <Modal show={isModalOpenDetail}
                   fullscreen={true}
                   onHide={() => setIsModalOpenDetail(false)}>
                <UserDetailModal
                    id={selectedId}
                    type={modalType}
                    onClose={handleCloseModalDetail}/>
            </Modal>
            {isModalOpenSchedule && columnSchedule && (
                <Modal show={isModalOpenSchedule} fullscreen={true} onHide={() => setIsModalOpenSchedule(false)}>
                    <DataTable rows={rowSchedule} columns={columnSchedule}/>
                </Modal>
            )}
        </div>
    );
};
