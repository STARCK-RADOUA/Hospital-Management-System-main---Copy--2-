import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
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
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Prescription.module.css';

const columns = [
  { id: 'Company', label: 'Company', minWidth: 170 },
  { id: 'Name', label: 'Name', minWidth: 170 },
  { id: 'Description', label: 'Description', minWidth: 170 },
  { id: 'Price', label: 'Price', minWidth: 100 },
  { id: 'actionsID', label: 'Actions', minWidth: 100 },
];

function createData(Company, Name, Description, Price, actionsID) {
  return { Company, Name, Description, Price, actionsID };
}

export default function UserTable({ medicineList, deleteMedicine }) {
  const { currentUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openConfirmDeleteDialogue, setOpenConfirmDeleteDialogue] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteDialogueOpen = () => {
    setOpenConfirmDeleteDialogue(true);
  };

  const handleDeleteDialogueClose = () => {
    setOpenConfirmDeleteDialogue(false);
  };

  let rows = medicineList.map((medicine) => {
    return createData(medicine.company, medicine.name, medicine.description, medicine.price, medicine._id);
  });

  return (
    <Paper className={styles.paper}>
      <TableContainer className={styles.tableContainer}>
        {isMobile ? (
          // Mobile view
          <div>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <div key={row.actionsID} style={{ marginBottom: '1rem' }}>
                {columns.map((column) => (
                  <div key={column.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>{column.label}:</strong>
                    <span>{row[column.id]}</span>
                  </div>
                ))}
                {currentUser.userType === "Admin" && (
                  <div>
                    <Tooltip title="Edit" placement="top" arrow>
                      <EditIcon
                        style={{ color: '#ff6600', fontSize: 30 }}
                        onClick={() => navigate(`/dash/medicines/edit/${row.actionsID}`)}
                      />
                    </Tooltip>
                    <Tooltip title="Delete" placement="top" arrow>
                      <DeleteIcon
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
                        deleteMedicine(row.actionsID);
                        handleDeleteDialogueClose();
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Desktop view
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth, fontWeight: 'bold' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.actionsID}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'actionsID' && currentUser.userType === "Admin") {
                      return (
                        <TableCell key={column.id}>
                          <Tooltip title="Edit" placement="top" arrow>
                            <EditIcon
                              className="mx-2"
                              style={{ color: '#ff6600', fontSize: 30 }}
                              onClick={() => navigate(`/dash/medicines/edit/${value}`)}
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
                              deleteMedicine(value);
                              handleDeleteDialogueClose();
                            }}
                          />
                        </TableCell>
                      );
                    } else if (column.id === 'Description') {
                      return (
                        <TableCell key={column.id} style={{ maxWidth: 200 }}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    } else if (column.id === 'Price') {
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === 'number' ? column.format(value) : `MAD ${value}`}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={column.id}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
