import {Card, CardContent, Typography} from "@mui/material";
import React, {useState, useEffect} from "react";
import './card.scss'
const NameCard = ({title, rows}) => {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage(currentPage => (currentPage + 1) % Math.ceil(rows.length / 3));
        }, 5000);

        return () => clearInterval(interval);
    }, [rows.length]);

    const handleClick = (id) => {
        alert(id);
    };

    return (
        <>
            <h4><i className={'fw-bolder text-uppercase'}>{title}</i></h4>
            <i>Tổng số : {rows.length}</i>
            <hr/>
            <div className="card-wrapper">
                {rows && rows.slice(currentPage * 3, (currentPage + 1) * 3).map((row, index) => (
                    <Card className="card d-flex" key={index} onClick={() => handleClick(row.id)}>
                        <CardContent style={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant="h6" component="div" align="center">
                                {row.name}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default NameCard;
