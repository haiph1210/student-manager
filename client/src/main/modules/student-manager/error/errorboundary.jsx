import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, loi: null, thongTinLoi: null };
    }

    componentDidCatch(loi, thongTinLoi) {
        // Ghi log lỗi
        console.error('Lỗi được bắt bởi ErrorBoundary:', loi, thongTinLoi);
        // Cập nhật state để hiển thị thông báo lỗi
        this.setState({ hasError: true, loi: loi, thongTinLoi: thongTinLoi });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', color: 'red' }}>
                    <h2>Hệ thống đang nâng cấp tính năng này.</h2>
                    <p>Vui lòng thử lại sau.</p>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.loi && this.state.loi.toString()}
                        <br />
                        {this.state.thongTinLoi.componentStack}
                    </details>
                </div>
            );
        }
        // Trả về các children nếu không có lỗi
        return this.props.children;
    }
}

export default ErrorBoundary;
