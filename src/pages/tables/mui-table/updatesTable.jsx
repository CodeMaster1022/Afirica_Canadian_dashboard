import PropTypes from 'prop-types';
import React from 'react';
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
import IconButton from 'components/@extended/IconButton';
import formatDate from 'utils/dateForm';
import { resourceApprove, resourceReject } from 'redux/resourceRelated/resourceHandle';
import { placesApprove, placesReject } from 'redux/placesRelated/placesHandle';
// assets
// Redux
import { useDispatch } from 'react-redux';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
// project imports
// import ProfileModal from 'pages/usersProfileView/profileView';
// import { header } from './basic';
import MainCard from 'components/MainCard';
// import { CSVExport, RowSelection } from 'components/third-party/react-table';

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
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title'
  },
  {
    id: 'eamil',
    numeric: false,
    disablePadding: false,
    label: 'Posted By'
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Date Posted'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status'
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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
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

export default function UpdatesTable({ rows, source }) {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleAction = (id, action, source) => {
    console.log(id);
    Swal.fire({
      title: `Do you want to ${action} this user?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        if (source === 'resource') {
          if (action === 'approve') dispatch(resourceApprove(id));
          else if (action === 'reject') dispatch(resourceReject(id));
        }
        if (source === 'status') {
          if (action === 'approve') dispatch(statusApprove(id));
          else if (action === 'reject') dispatch(statusReject(id));
        }
        if (source === 'places') {
          if (action === 'approve') dispatch(placesApprove(id));
          else if (action === 'reject') dispatch(placesReject(id));
        }
      } else if (result.isDenied) {
        Swal.fire(`${action} was cancelled`, '', 'info');
      }
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <MainCard content={false} title="Community Updates">
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length} />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  if (typeof row === 'number') return null;
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="left" sx={{ width: '10px' }}>
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{source === 'resource' ? row.title : row.name}</TableCell>
                      <TableCell align="left" sx={{ maxWidth: '180px' }}>
                        {row.user.email}
                      </TableCell>
                      <TableCell align="left">{formatDate(row.createdAt)}</TableCell>
                      <TableCell align="left" sx={{ maxWidth: '130px' }}>
                        {row.isActive === true && (
                          <>
                            <Box sx={{ display: 'flex' }}>
                              <Typography
                                fontSize={12}
                                sx={{ color: '#52C41A', borderRadius: '5px', backgroundColor: '#F6FFED', padding: '5px' }}
                              >
                                Published
                              </Typography>
                            </Box>
                          </>
                        )}
                        {row.isPending === true && (
                          <>
                            <Box sx={{ display: 'flex' }}>
                              <Typography
                                fontSize={12}
                                sx={{ color: '#1890FF', borderRadius: '5px', backgroundColor: '#E6F7FF', padding: '5px' }}
                              >
                                Pending Review
                              </Typography>
                            </Box>
                          </>
                        )}
                        {row.isDeleted === true && (
                          <>
                            <Box sx={{ display: 'flex' }}>
                              <Typography
                                fontSize={12}
                                sx={{ color: '#FF4D4F', borderRadius: '5px', backgroundColor: '#FFF1F0', padding: '5px' }}
                              >
                                Deleted
                              </Typography>
                            </Box>
                          </>
                        )}
                      </TableCell>
                      {row.isDeleted === true && (
                        <TableCell align="left" sx={{ maxWidth: '100px' }}>
                          <IconButton disabled>
                            <CloseOutlined />
                          </IconButton>
                          <IconButton sx={{ color: '#FF4D4F' }} disabled>
                            <CheckOutlined />
                          </IconButton>
                        </TableCell>
                      )}
                      {row.isDeleted === false && (
                        <TableCell align="left" sx={{ maxWidth: '100px' }}>
                          <IconButton onClick={() => handleAction(row.id, 'reject', source)}>
                            <CloseOutlined />
                          </IconButton>
                          {row.isActive ? (
                            <IconButton sx={{ color: '#FF4D4F' }} disabled>
                              <CheckOutlined />
                            </IconButton>
                          ) : (
                            <IconButton sx={{ color: '#FF4D4F' }} onClick={() => handleAction(row.id, 'approve', source)}>
                              <CheckOutlined />
                            </IconButton>
                          )}
                        </TableCell>
                      )}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
}
UpdatesTable.propTypes = {
  rows: PropTypes.array.isRequired,
  source: PropTypes.string.isRequired
};
EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.any,
  order: PropTypes.any,
  orderBy: PropTypes.any,
  rowCount: PropTypes.any,
  onRequestSort: PropTypes.any
};
