import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
// material-ui
import {
  Box,
  Table,
  Divider,
  TableBody,
  TableCell,
  TableHead,
  TableSortLabel,
  TableContainer,
  TableRow,
  TablePagination
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import IconButton from 'components/@extended/IconButton';
// assets
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { eventDelete, getAllEvent } from 'redux/eventRelated/eventHandle';
// project imports
import MainCard from 'components/MainCard';
import AddNewEvent from 'pages/main/Modal/addNewEvent';
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

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function EventTable() {
  const dispatch = useDispatch();

  const { eventList, total_count,tablePage, items_per_page } = useSelector((state) => state.event);
  // Fetch Data
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(items_per_page);
  let data = stableSort(eventList, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const [user, setUser] = useState({});
  const handleButtonClick = (rowData) => {
    profileModalOpen();
    setUser(rowData);
  };
  const [profileOpen, setProfileOpen] = useState(false);
  const profileModalOpen = () => setProfileOpen(true);
  const profileModalClose = () => setProfileOpen(false);
  const handleAction = (id, action) => {
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
          dispatch(eventDelete(id));
          dispatch(getAllEvent);
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
    dispatch(getAllEvent(rowsPerPage, newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('new page');
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(getAllEvent(parseInt(event.target.value, 10), 1));
  };

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total_count) : 0;

  return (
    <>
      <MainCard content={false} title="Community Group">
        {/* table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={total_count} />
            <TableBody>
              {data.map((row, index) => {
                /** make sure no display bugs if row isn't an OrderData object */
                if (typeof row === 'number') return null;
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <React.Fragment key={index}>
                    <TableRow role="checkbox" tabIndex={-1}>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.user.email}</TableCell>
                      <TableCell align="center">{row.eventHappeningDate}</TableCell>
                      <TableCell align="center" sx={{ minWidth: '200px' }}>
                        <IconButton onClick={() => handleButtonClick(row)}>
                          <EditOutlined />
                        </IconButton>
                        <IconButton sx={{ color: '#FF4D4F' }} onClick={() => handleAction(row.user.keycloakUserId, 'delete')}>
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
      <AddNewEvent modalOpen={profileOpen} modalClose={profileModalClose} currentEvent={user} action="edit" />
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
    label: 'Community Group'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Posted By'
  },
  {
    id: 'eventHappeningDate',
    numeric: false,
    disablePadding: false,
    label: 'Event Posted'
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action'
  }
];
EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.any,
  order: PropTypes.any,
  orderBy: PropTypes.any,
  numSelected: PropTypes.any,
  rowCount: PropTypes.any,
  onRequestSort: PropTypes.any
};
