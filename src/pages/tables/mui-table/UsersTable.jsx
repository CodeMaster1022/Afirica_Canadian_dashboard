import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
// material-ui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import { Typography } from '@mui/material';
import formatDate from 'utils/dateForm';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userDelete, userReactivate, userDeactivate, getOptionUsers } from 'redux/userRelated/userHandle';
import IconButton from 'components/@extended/IconButton';
// assets

import { PauseOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
// project imports
import ProfileModal from 'pages/main/Modal/profileView';
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

// table header
const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID'
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'Users'
  },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number'
  },
  {
    id: 'community',
    numeric: false,
    disablePadding: false,
    label: 'Community'
  },
  {
    id: 'joinedDate',
    numeric: false,
    disablePadding: false,
    label: 'Joined'
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions'
  }
];

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
            align={headCell.numeric ? 'left' : 'center'}
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

export default function UsersTable() {
  const dispatch = useDispatch();
  // Toast Message
  const handleAction = (id, action) => {
    console.log('reactiveate');
    Swal.fire({
      title: `Do you want to ${action} this user?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (action === 'reactivate') dispatch(userReactivate(id));
        else if (action === 'deactivate') dispatch(userDeactivate(id));
        else if (action === 'delete') dispatch(userDelete(id));
      } else if (result.isDenied) {
        Swal.fire(`${action} was cancelled`, '', 'info');
      }
    });
  };
  const { usersList, total_count, tablePage, items_per_page } = useSelector((state) => state.users);
  const [user, setUser] = useState({});
  const handleButtonClick = (rowData) => {
    console.log(user);
    profileModalOpen();
    setUser(rowData);
  };
  const [profileOpen, setProfileOpen] = useState(false);
  const profileModalOpen = () => setProfileOpen(true);
  const profileModalClose = () => setProfileOpen(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(items_per_page);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = usersList.map((n, index) => index);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
    dispatch(getOptionUsers(rowsPerPage, newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
    dispatch(getOptionUsers(parseInt(event.target.value, 10), 1));
  };

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total_count) : 0;

  return (
    <>
      <MainCard content={false} title="All Users">
        {/* table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={total_count}
            />
            <TableBody>
              {stableSort(usersList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  /** make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') return null;
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="left" sx={{ width: '10px' }}>
                        {index + 1 + rowsPerPage * (tablePage - 1)}
                      </TableCell>
                      <TableCell align="left" sx={{ width: { xs: '200px', md: '250px', lg: '300px' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          {row.profileImageKey ? (
                            <img
                              src={row.profileImageKey}
                              alt="groupImage"
                              style={{ width: '40px', height: '40px', borderRadius: '50px' }}
                            />
                          ) : (
                            <IconButton shape="rounded" variant="contained" sx={{ height: '45px', width: '45px' }} color="secondary">
                              {row.firstName[0]}
                            </IconButton>
                          )}

                          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                            <Typography sx={{ marginLeft: '10px' }}>
                              {row.firstName}
                              {row.lastName}
                            </Typography>
                            <Typography sx={{ marginLeft: '10px' }}>{row.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">{row.community ? row.community.name : 'null'}</TableCell>
                      <TableCell align="center">{formatDate(row.joinedDate)}</TableCell>
                      <TableCell align="center" sx={{ minWidth: '200px' }}>
                        <IconButton onClick={() => handleButtonClick(row)}>
                          <EditOutlined />
                        </IconButton>
                        {row.status === 'active' && (
                          <IconButton sx={{ color: '#FAAD14' }} onClick={() => handleAction(row.keycloakUserId, 'deactivate')}>
                            <PauseOutlined />
                          </IconButton>
                        )}
                        {row.status === 'deactivate' && (
                          <IconButton sx={{ color: '#FAAD14' }} onClick={() => handleAction(row.keycloakUserId, 'reactivate')}>
                            <PlayCircleOutlined />
                          </IconButton>
                        )}
                        {row.status === 'deleted' && (
                          <>
                            <IconButton sx={{ color: '#FAAD14' }} disabled>
                              <PlayCircleOutlined />
                            </IconButton>
                            <IconButton sx={{ color: '#FF4D4F' }} disabled>
                              <DeleteOutlined />
                            </IconButton>
                          </>
                        )}
                        {/* {row.status === 'deactivate' ? (
                          <IconButton sx={{ color: '#FAAD14' }} onClick={() => handleAction(row.keycloakUserId, 'reactivate')}>
                            <PlayCircleOutlined />
                          </IconButton>
                        ) : (
                          <IconButton sx={{ color: '#FAAD14' }} onClick={() => handleAction(row.keycloakUserId, 'deactivate')}>
                            <PauseOutlined />
                          </IconButton>
                        )} */}
                        {row.status !== 'deleted' && (
                          <IconButton sx={{ color: '#FF4D4F' }} onClick={() => handleAction(row.keycloakUserId, 'delete')}>
                            <DeleteOutlined />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total_count}
          rowsPerPage={rowsPerPage}
          page={tablePage - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
      <ProfileModal modalOpen={profileOpen} modalClose={profileModalClose} user={user} />
    </>
  );
}

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.any,
  order: PropTypes.any,
  orderBy: PropTypes.any,
  numSelected: PropTypes.any,
  rowCount: PropTypes.any,
  onRequestSort: PropTypes.any
};
