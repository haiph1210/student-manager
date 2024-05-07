import {DataGrid} from "@mui/x-data-grid";

export default function DataTable({rows,columns}) {
    console.log(rows)
    console.log(columns)
    return (
        <div className="modal-content" style={{position: 'absolute', top: '150px', zIndex: 1000, padding: '50px'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                // initialState={{
                //     pagination: {
                //         paginationModel: {page: 0, pageSize: 5},
                //     },
                // }}
                // pageSizeOptions={[5, 10]}
                // checkboxSelection
            />
        </div>
    );
}