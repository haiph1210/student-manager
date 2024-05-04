import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Logout(props) {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    const handleClose = () => {
        window.location.href = '/';

    };

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal.Dialog>
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>Đăng xuất</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Bạn có chắc chắn muốn đăng xuất?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleLogout}>Đăng xuất</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}
