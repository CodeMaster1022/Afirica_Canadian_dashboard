import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
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
import groupAvatar from 'assets/images/users/avatar-2.png';
import { visuallyHidden } from '@mui/utils';
import { Typography } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
// assets

import { PauseOutlined, EditOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
// project imports
import ProfileModal from 'pages/main/Modal/profileView';
import { header } from './basic';
import MainCard from 'components/MainCard';
import { CSVExport, RowSelection } from 'components/third-party/react-table';
function createData(id, user, photo, email, phone, community, join, action) {
  return {
    id,
    user,
    photo,
    email,
    phone,
    community,
    join,
    action
  };
}

const rows = [
  createData(2, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(5, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(7, 'Larry Doe ', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(8, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(1, 'Larry Doe', groupAvatar, 'ashy.handgun@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(3, 'Carson Darrin', groupAvatar, 'larry.doe@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(11, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(12, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(13, 'Larry Doe ', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(14, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(15, 'Larry Doe', groupAvatar, 'ashy.handgun@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(16, 'Carson Darrin', groupAvatar, 'larry.doe@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(17, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(18, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(19, 'Larry Doe ', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(20, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(21, 'Larry Doe', groupAvatar, 'ashy.handgun@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(22, 'Carson Darrin', groupAvatar, 'larry.doe@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(23, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(24, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(25, 'Larry Doe ', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1),
  createData(26, 'Carson Darrin', groupAvatar, 'carson.darrin@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(27, 'Larry Doe', groupAvatar, 'ashy.handgun@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 2),
  createData(28, 'Carson Darrin', groupAvatar, 'larry.doe@gmail.com', '+1 34 1234 5678', 'Somalia', '10/05/2024', 1)
];

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
    id: 'users',
    numeric: false,
    disablePadding: false,
    label: 'Users'
  },
  {
    id: 'phone',
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
    id: 'join',
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
        {/* <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
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
  const [profileOpen, setProfileOpen] = useState(false);
  const profileModalOpen = () => setProfileOpen(true);
  const profileModalClose = () => setProfileOpen(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [selectedValue, setSelectedValue] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = rows.map((n) => n.id);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    const selectedRowData = rows.filter((row) => newSelected.includes(row.group.toString()));
    setSelectedValue(selectedRowData);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <MainCard
        content={false}
        title="All Users"
        secondary={
          <CSVExport data={selectedValue.length > 0 ? selectedValue : rows} headers={header} filename={'selected-table-data.csv'} />
        }
      >
        <RowSelection selected={selected.length} />
        {/* table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  /** make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') return null;
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <>
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox" sx={{ pl: 3 }}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell> */}
                        <TableCell component="th" id={labelId} scope="row" padding="none" align="left" sx={{ width: '10px' }}>
                          {row.id}
                        </TableCell>
                        <TableCell align="left" sx={{ width: { xs: '200px', md: '250px', lg: '300px' } }}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img src={row.photo} alt="groupImage" style={{ width: '40px', borderRadius: '50px' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography sx={{ marginLeft: '10px' }}>{row.user}</Typography>
                              <Typography sx={{ marginLeft: '10px' }}>{row.email}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell align="center">{row.community}</TableCell>
                        <TableCell align="center">{row.join}</TableCell>
                        <TableCell align="center" sx={{ minWidth: '200px' }}>
                          <IconButton onClick={profileModalOpen}>
                            <EditOutlined />
                          </IconButton>
                          {row.action === 1 ? (
                            <IconButton sx={{ color: '#FAAD14' }}>
                              <PauseOutlined />
                            </IconButton>
                          ) : (
                            <IconButton sx={{ color: '#FAAD14' }}>
                              <PlayCircleOutlined />
                            </IconButton>
                          )}

                          <IconButton sx={{ color: '#FF4D4F' }}>
                            <DeleteOutlined />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
      <ProfileModal modalOpen={profileOpen} modalClose={profileModalClose} />
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
