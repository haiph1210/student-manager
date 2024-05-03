import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useEffect} from "react";
import {deleted, getAll} from "./faculty.service";
import {formatDate} from "../../../../../utils/date.utils";
import './faculty.scss';
import {Button} from "@mui/material";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import DensitySmallSharpIcon from '@mui/icons-material/DensitySmallSharp';
import AddIcon from '@mui/icons-material/Add';
import FacultyModal from "./faculty.modal";
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";

export default function Faculty() {
    const [rows, setRows] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState(null);
    const [selectedId, setSelectedId] = React.useState(null);

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
    };

    const handleEditClick = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
        setModalType('edit');
        // Additional logic for editing, if needed
    };

    const handleAddNew = () => {
        setIsModalOpen(true);
        setModalType('add');
    };

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
        {field: 'facultyName', headerName: 'Tên khoa', width: 200},
        {field: 'totalYearLearn', headerName: 'Tổng số năm', width: 130},
        {
            field: 'createdAt',
            headerName: 'Người tạo',
            width: 130,
            valueFormatter: (params) => params??"ADMIN"
        },
        {
            field: 'updateAt',
            headerName: 'Người thay đổi',
            width: 130,
            valueFormatter: (params) => params??"ADMIN"

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
            field: 'majors',
            headerName: 'Số ngành',
            width: 180,
            valueFormatter: (params) => params.length,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => alert("Hi")}
                    >
                        <DensitySmallSharpIcon/>
                        Ngành học
                    </Button>
                </div>
            ),
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
                <FacultyModal
                    id={selectedId}
                    type={modalType}
                    onClose={handleCloseModal}/>
            </Modal>

        </div>
    );
}
