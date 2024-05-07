import React, {useEffect} from 'react';
import {deleted, getAllClass} from "../class-manager/class.service";
import Swal from "sweetalert2";
import {Button} from "@mui/material";
import {formatDate} from "../../../../../utils/date.utils";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteSweepSharpIcon from "@mui/icons-material/DeleteSweepSharp";
import AddIcon from "@mui/icons-material/Add";
import {DataGrid} from "@mui/x-data-grid";
import Modal from "react-bootstrap/Modal";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClassModal from "./class.modal";
import {getRole} from "../../../../../utils/authentication";
import DataTable from "../../../../student-manager/share/table";


export default function Class(props) {
    const [rows, setRows] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalOpenSchedule, setIsModalOpenSchedule] = React.useState(false);
    const [rowSchedule, setRowSchedule] = React.useState(null);
    const [columnSchedule, setColumnSchedule] = React.useState(null);
    const [modalType, setModalType] = React.useState(null);
    const [selectedId, setSelectedId] = React.useState(null);
    const [role, setRole] = React.useState(null);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function handleAddNew() {
        setIsModalOpen(true);
        setModalType('add');
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

    const getAllData = async () => {
        try {
            const response = await getAllClass();
            if (response && response.data && response.data.length > 0) {
                const formattedData = response.data.map(item => ({
                    ...item,
                    majorName: item.major.majorName,
                    facultyName: item.major.faculty.facultyName,
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

    useEffect(() => {
        getAllData();
        console.log(getRole())
        setRole(getRole());
    }, []);

    useEffect(() => {
        let isAdmin = role === 'ADMIN';
        forceUpdate(); // Force re-render
    }, [role]);


    let isAdmin = role === 'ADMIN';
    console.log("hi", isAdmin);
    console.log("hi", role);

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

    function handleStudent(row) {

    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},

        {field: 'name', headerName: 'Tên lớp', width: 200},
        {
            field: 'majorName', headerName: 'Tên chuyên ngành', width: 200,
        },
        {
            field: 'facultyName', headerName: 'Tên khoa', width: 200,
        },
        {
            field: 'students',
            headerName: 'Số sinh viên',
            width: 180,
            // valueFormatter: (params) => params.length,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        // onClick={() => handleStudent(params.row)}
                    >
                        <AccountCircleIcon/>
                        Sinh viên
                    </Button>
                </div>
            ),
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
                        onClick={() => handleSchedule(params.row.schedules)}
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

    return (
        <div>
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
                className="table-container"
                rows={rows}
                columns={columns}
                pageSize={10}
                checkboxSelection
            />
            <Modal show={isModalOpen}
                   fullscreen={true}
                   onHide={() => setIsModalOpen(false)}>
                <ClassModal
                    id={selectedId}
                    type={modalType}
                    onClose={handleCloseModal}/>
            </Modal>

            {isModalOpenSchedule && columnSchedule && (
                <Modal show={isModalOpenSchedule} fullscreen={true} onHide={() => setIsModalOpenSchedule(false)}>
                    <DataTable rows={rowSchedule} columns={columnSchedule}/>
                </Modal>
            )}
        </div>
    );
};
