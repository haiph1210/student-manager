import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';
import Box from '../../../../student-manager/share/card';
import NameCard from '../../../../student-manager/share/card';
import { getAllFaculty } from '../faculty-manager/faculty.service';
import { getAllMajor } from '../major-manager/major.service';
import { getAllSubject } from '../subject-manager/subject.service';
import { getAllClass } from '../class-manager/class.service';
import { Typography, Button } from '@mui/material';
import './home.scss';
const override = css`
    display: block;
    margin: 0 auto;
`;

export default function Home(props) {
    const [faculties, setFaculty] = useState([]);
    const [majors, setMajors] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classs, setClasss] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false); // State để theo dõi việc hiển thị spinner

    useEffect(() => {
        // Kiểm tra localStorage
        const authData = localStorage.getItem('auth');
        if (authData) {
            setIsLoggedIn(true);
            // Lấy dữ liệu
            getAllData();
        } else {
            // Nếu không có auth trong localStorage, xử lý nổi bật
            handleNotLoggedIn();
        }
    }, []);

    const getAllData = async () => {
        setLoading(true);
        await Promise.all([
            getAllFaculties(),
            getAllMajors(),
            getAllSubjects(),
            getAllClazz()
        ]);
        setLoading(false);
    };

    // const getAllData = async () => {
    //     setLoading(true);
    //     setTimeout(async () => {
    //         await Promise.all([
    //             getAllFaculties(),
    //             getAllMajors(),
    //             getAllSubjects(),
    //             getAllClazz()
    //         ]);
    //         setLoading(false);
    //     }, 1000);
    // };

    const getAllFaculties = async () => {
        const response = await getAllFaculty();
        if (response && response.data && response.data.length > 0) {
            const formattedData = response.data.map(item => ({
                id: item.id,
                name: item.facultyName
            }));
            setFaculty(formattedData);
        }
    };
    const getAllMajors = async () => {
        const response = await getAllMajor();
        if (response && response.data && response.data.length > 0) {
            const formattedData = response.data.map(item => ({
                id: item.id,
                name: item.majorName
            }));
            setMajors(formattedData);
        }
    };
    const getAllSubjects = async () => {
        const response = await getAllSubject();
        if (response && response.data && response.data.length > 0) {
            const formattedData = response.data.map(item => ({
                id: item.id,
                name: item.subjectName
            }));
            setSubjects(formattedData);
        }
    };
    const getAllClazz = async () => {
        const response = await getAllClass();
        if (response && response.data && response.data.length > 0) {
            const formattedData = response.data.map(item => ({
                id: item.id,
                name: item.name
            }));
            setClasss(formattedData);
        }
    };

    const handleNotLoggedIn = () => {
        console.log('User is not logged in.');
    };

    const handleLogin = () => {
        setLoading(true); // Bật spinner khi nhấn nút "Đăng nhập"
        // Sau khi ấn nút "Đăng nhập", bạn có thể chuyển hướng trang sau một khoảng thời gian
        setTimeout(() => {
            window.location.href = '/login';
            setLoading(false); // Tắt spinner khi chuyển hướng trang
        }, 1000); // Giả lập chuyển hướng sau 1 giây, bạn có thể thay đổi thời gian này
    };

    return (
        <div>
            {loading ? (
                <div className="overlay">
                    <ScaleLoader color={'#36D7B7'} loading={loading} css={override} size={150} />
                </div>
            ) : isLoggedIn ? (
                <>
                    <NameCard title={'khoa'} rows={faculties} />
                    <br />
                    <NameCard title={'Ngành'} rows={majors} />
                    <br />
                    <NameCard title={'Môn học'} rows={subjects} />
                    <br />
                    <NameCard title={'Lớp học'} rows={classs} />
                </>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Vui lòng đăng nhập để truy cập
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                </div>
            )}
        </div>
    );
}
