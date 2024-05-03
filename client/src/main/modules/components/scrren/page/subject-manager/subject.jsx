import React, {useEffect} from 'react';
import {deleted, getAll} from "../subject-manager/subject.service";
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
import SubjectModal from "./subject.modal";


export default function Subject(props) {
    const [rows, setRows] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState(null);
    const [selectedId, setSelectedId] = React.useState(null);

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
            const response = await getAll();
            if (response && response.data && response.data.length > 0) {
                setRows(response.data);
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
    }, []);

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},

        {field: 'subjectName', headerName: 'Tên môn học', width: 200},
        {
            field: 'credits', headerName: 'Số tín chỉ', width: 200,
        },
        {
            field: 'createdAt',
            headerName: 'Người tạo',
            width: 130,
            valueFormatter: (params) => params ?? "ADMIN"
        },
        {
            field: 'updateAt',
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

        {
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
        },
    ];


    return (
        <div>
            <div className={"d-flex justify-content-end"}>
                <Button className={"m-lg-1"} variant="contained" color="success"
                        size="small"
                        onClick={() => handleAddNew()}>
                    <AddIcon/>Thêm mới
                </Button>
            </div>
            <DataGrid
                className="table-container mt-2"
                rows={rows}
                columns={columns}
                pageSize={10}
                checkboxSelection
            />
            <Modal show={isModalOpen}
                   fullscreen={true}
                   onHide={() => setIsModalOpen(false)}>
                <SubjectModal
                    id={selectedId}
                    type={modalType}
                    onClose={handleCloseModal}/>
            </Modal>

        </div>
    );
};
