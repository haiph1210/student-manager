import React, {useEffect} from 'react';
import {formatDate} from "../../../../../utils/date.utils";
import {Button} from "@mui/material";
import DensitySmallSharpIcon from "@mui/icons-material/DensitySmallSharp";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteSweepSharpIcon from "@mui/icons-material/DeleteSweepSharp";
import AddIcon from "@mui/icons-material/Add";
import {DataGrid} from "@mui/x-data-grid";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import {deleted, getAllMajor} from "./major.service";
import MajorModal from "./major.modal";
import {getRole} from "../../../../../utils/authentication";
import NameCard from "../../../../student-manager/share/card";

export default function Major() {
    const [rows, setRows] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState(null);
    const [selectedId, setSelectedId] = React.useState(null);
    const [role, setRole] = React.useState(null);
    const [isModalOpenMore, setIsModalOpenMore] = React.useState(false);
    const [classs, setClass] = React.useState([]);

    const handleOpenModalMore = (dataResponse) => {
        if (dataResponse && dataResponse) {
            const response = dataResponse.map(resp => ({id: resp.id, name: resp.name}));
            setClass(response);
            setIsModalOpenMore(true);
        }

    }

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
            getAllDataMajor();
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
        getAllDataMajor();
    };

    const getAllDataMajor = async () => {
        try {
            const response = await getAllMajor();
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
        getAllDataMajor();
        setRole(getRole());
    }, []);

    let isAdmin = role === 'ADMIN';
    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'majorName', headerName: 'Tên chuyên ngành', width: 200},
        {
            field: 'faculty', headerName: 'Tên khoa', width: 200,
            valueFormatter: (params) => params.facultyName,
        },
        {
            field: 'classes',
            headerName: 'Số lớp',
            width: 180,
            // valueFormatter: (params) => params.length,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleOpenModalMore(params.row.classes)}
                    >
                        <DensitySmallSharpIcon/>
                        Lớp học
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
                className="table-container  mt-2"
                rows={rows}
                columns={columns}
                pageSize={10}
                checkboxSelection
            />
            <Modal show={isModalOpen}
                   fullscreen={true}
                   onHide={() => setIsModalOpen(false)}>
                <MajorModal
                    id={selectedId}
                    type={modalType}
                    onClose={handleCloseModal}/>
            </Modal>

            <Modal show={isModalOpenMore}
                   size={'lg'}
                   onHide={() => setIsModalOpenMore(false)}>
                <div className="modal-content"
                     style={{position: 'absolute', top: '150px', zIndex: 1000, padding: "30px"}}>
                    <NameCard title={"Lớp"} rows={classs}/>
                </div>
            </Modal>

        </div>
    );
};

