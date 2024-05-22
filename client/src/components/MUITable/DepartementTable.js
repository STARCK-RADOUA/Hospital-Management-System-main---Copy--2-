import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ConfirmDeleteDialogue from '../MUIDialogueBox/ConfirmDeleteDialogue';
import { useNavigate } from 'react-router-dom';
import styles from './Prescription.module.css';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 170 },
    { id: 'actionsID', label: 'Actions', minWidth: 100 },
];

function createData(name, description, actionsID) {
    return { name, description, actionsID };
}

export default function DepartementTable({ departementList, deleteDepartement }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openConfirmDeleteDialogue, setOpenConfirmDeleteDialogue] = React.useState(false);
    const navigate = useNavigate();

    const handleDeleteDialogueOpen = () => {
        setOpenConfirmDeleteDialogue(true);
    };

    const handleDeleteDialogueClose = () => {
        setOpenConfirmDeleteDialogue(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = departementList.map((departement) => {
        return createData(
            departement.name, 
            departement.description,
            departement._id,
        );
    });

    React.useEffect(() => {
        console.log("Rows:", rows);
    }, [rows]);

    return (
        <Paper className={styles.paper} sx={{ width: '100%', overflow: 'hidden', boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)" }}>
            <TableContainer className={styles.tableContainer}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.actionsID}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'actionsID') {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Tooltip title="Edit" placement="top" arrow>
                                                            <EditIcon
                                                                className="mx-2"
                                                                style={{ color: '#ff6600', fontSize: 30 }}
                                                                onClick={() => {
                                                                    navigate(`/departements/edit/${value}`);
                                                                }}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip title="Delete" placement="top" arrow>
                                                            <DeleteIcon
                                                                className="mx-2"
                                                                style={{ color: 'red', fontSize: 30 }}
                                                                onClick={handleDeleteDialogueOpen}
                                                            />
                                                        </Tooltip>
                                                        <ConfirmDeleteDialogue
                                                            title="Confirm Delete"
                                                            message="Are you sure you want to delete this record? This action cannot be undone."
                                                            open={openConfirmDeleteDialogue}
                                                            handleClose={handleDeleteDialogueClose}
                                                            handleDelete={() => {
                                                                deleteDepartement(value);
                                                                handleDeleteDialogueClose();
                                                            }}
                                                        />
                                                    </TableCell>
                                                );
                                            } else {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    "& p": {
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    }
                }}
            />
        </Paper>
    );
}