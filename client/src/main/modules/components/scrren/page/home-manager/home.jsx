import React, {useEffect, useState} from 'react';
import Box from "../../../../student-manager/share/box";
import BoxSx from "../../../../student-manager/share/box";
import NameCard from "../../../../student-manager/share/box";
import {getAllFaculty} from "../faculty-manager/faculty.service";
import {getAllMajor} from "../major-manager/major.service";
import {getAllSubject} from "../subject-manager/subject.service";
import {getAllClass} from "../class-manager/class.service";


export default function Home(props) {
    const [faculties, setFaculty] = useState([]);
    const [majors, setMajors] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classs, setClasss] = useState([]);


    const getAllFaculties = async () => {
        const response = await getAllFaculty();
        if (response && response.data && response.data.length > 0) {
            const formattedData = response.data.map(item => ({
                id: item.id,
                name: item.facultyName
            }));
            setFaculty(formattedData);
        }
    }
    const getAllMajors = async () => {
        const response = await getAllMajor();
        if (response && response.data && response.data.length > 0) {
            const formattedData = response.data.map(item => ({
                id: item.id,
                name: item.majorName
            }));
            setMajors(formattedData);
        }
    }
    const getAllSubjects = async () => {
        const response = await getAllSubject();
        if (response && response.data && response.data.length > 0) {
            const formattedData = response.data.map(item => ({
                id: item.id,
                name: item.subjectName
            }));
            setSubjects(formattedData);
        }
    }
    const getAllClazz = async () => {
        const response = await getAllClass();
        if (response && response.data && response.data.length > 0) {
            const formattedData = response.data.map(item => ({
                id: item.id,
                name: item.name
            }));
            setClasss(formattedData);
        }
    }

    useEffect(() => {
        getAllFaculties();
        getAllMajors();
        getAllSubjects();
        getAllSubjects();
        getAllClazz();
    }, []);

    return (
        <>
            <div>
                <NameCard title={'khoa'} rows={faculties}/>
                <br/>
                <NameCard title={'Ngành'} rows={majors}/>
                <br/>
                <NameCard title={'Môn học'} rows={subjects}/>
                <br/>
                <NameCard title={'Lớp học'} rows={classs}/>
            </div>
        </>
    );
}

