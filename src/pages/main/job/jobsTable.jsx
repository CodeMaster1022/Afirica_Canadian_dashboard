import React, { useState } from 'react';
import Swal from 'sweetalert2';
// material-ui
import { Table, Divider, TableBody, TableCell, TableContainer, TableRow, TablePagination } from '@mui/material';
import formatDate from 'utils/dateForm';
import IconButton from 'components/@extended/IconButton';
// assets
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAlljobs, jobsDelete, getjobsById } from 'redux/jobRelated/jobHandle';
import ViewJob from './modal/ViewJob';

// project imports
import EnhancedTableHead from '../../../utils/enhanceFunction';
import MainCard from 'components/MainCard';

// table filter
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function JobTable() {
  const dispatch = useDispatch();

  const { jobsList, total_count, tablePage, items_per_page } = useSelector((state) => state.job);
  // Fetch Data
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(items_per_page);
  let data = stableSort(jobsList, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const handleButtonClick = (id) => {
    profileModalOpen();
    dispatch(getjobsById(id));
  };
  const [profileOpen, setProfileOpen] = useState(false);
  const profileModalOpen = () => setProfileOpen(true);
  const profileModalClose = () => setProfileOpen(false);
  const handleAction = (id, action) => {
    console.log(id);
    Swal.fire({
      title: `Do you want to ${action} user ${id}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (action === 'delete') {
          dispatch(jobsDelete(id));
        }
      } else if (result.isDenied) {
        Swal.fire(`${action} was cancelled`, '', 'info');
      }
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getAlljobs(rowsPerPage, newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(getAlljobs(parseInt(event.target.value, 10), 1));
  };

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total_count) : 0;

  return (
    <>
      <MainCard content={false} title="Community Group">
        {/* table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={total_count}
              headCells={headCells}
            />
            <TableBody>
              {data.map((row, index) => {
                /** make sure no display bugs if row isn't an OrderData object */
                if (typeof row === 'number') return null;
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <React.Fragment key={index}>
                    <TableRow role="checkbox" tabIndex={-1}>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="left">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.user.email}</TableCell>
                      <TableCell align="left">{formatDate(row.createdAt)}</TableCell>
                      <TableCell align="left" sx={{ maxWidth: '100px' }}>
                        <IconButton onClick={() => handleButtonClick(row.id)}>
                          <EditOutlined />
                        </IconButton>
                        <IconButton sx={{ color: '#FF4D4F' }} onClick={() => handleAction(row.id, 'delete')}>
                          <DeleteOutlined />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
              {emptyRows > 0 && (
                <TableRow sx={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />

        {/* table data */}
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={total_count}
          rowsPerPage={rowsPerPage}
          page={tablePage - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
      <ViewJob modalOpen={profileOpen} modalClose={profileModalClose} action="edit" />
    </>
  );
}
// table header
const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID'
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Posted By'
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Job Posted'
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action'
  }
];
