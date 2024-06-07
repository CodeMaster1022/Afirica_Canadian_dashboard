import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
// material-ui
import {
  MenuItem,
  Menu,
  Box,
  Table,
  Checkbox,
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
import { Typography } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import Collapse from '@mui/material/Collapse';
import { alpha, useTheme } from '@mui/material/styles';
import { DashOutlined } from '@ant-design/icons';
// assets
import { RightOutlined } from '@ant-design/icons';
import DownOutlined from '@ant-design/icons/DownOutlined';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { groupReactivate, groupDeactivate, groupDelete, getOptionGroup, getGroupMembers } from 'redux/groupRelated/groupHandle';
// project imports
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

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
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

export default function GroupTable() {
  const dispatch = useDispatch();

  const { groupList, total_count, tablePage, items_per_page } = useSelector((state) => state.group);
  const { groupMembers } = useSelector((state) => state.groupMember);
  const theme = useTheme();
  const backColor = alpha(theme.palette.primary.lighter, 0.1);
  // Fetch Data
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(items_per_page);
  let data = stableSort(groupList, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const [anchorElArray, setAnchorElArray] = React.useState(Array(data.length).fill(null));

  const handleAction = (id, action) => {
    handleClose();
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
        if (action === 'reactivate') dispatch(groupReactivate(id));
        else if (action === 'deactivate') dispatch(groupDeactivate(id));
        else if (action === 'delete') dispatch(groupDelete(id));
      } else if (result.isDenied) {
        Swal.fire(`${action} was cancelled`, '', 'info');
      }
    });
  };
  const handleGetMember = (id) => {
    dispatch(getGroupMembers(id));
  };
  const actionHandleClick = (index) => (event) => {
    setAnchorElArray((prevAnchorElArray) => prevAnchorElArray.map((el, i) => (i === index ? event.currentTarget : null)));
  };
  const handleClose = (index) => {
    setAnchorElArray((prevAnchorElArray) => prevAnchorElArray.map((el, i) => (i === index ? null : el)));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getOptionGroup(rowsPerPage, newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(getOptionGroup(parseInt(event.target.value, 10), 1));
  };
  // const isSelected = (name) => selected.indexOf(name) !== -1;

  // avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total_count) : 0;

  return (
    <MainCard content={false} title="Community Group">
      {/* <RowSelection selected={selected.length} /> */}
      {/* table */}
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
          <EnhancedTableHead
            // numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            // onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={total_count}
          />
          <TableBody>
            {data.map((row, index) => {
              /** make sure no display bugs if row isn't an OrderData object */
              if (typeof row === 'number') return null;
              // const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <React.Fragment key={index}>
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    // selected={isItemSelected}
                  >
                    <TableCell padding="checkbox" sx={{ pl: 3 }}>
                      <Checkbox
                        color="primary"
                        // checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {row.avatar_image_key ? (
                          <img
                            src={row.avatar_image_key}
                            alt="groupImage"
                            style={{ width: '45px', height: '45px', borderRadius: '50px' }}
                          />
                        ) : (
                          <IconButton shape="rounded" variant="contained" sx={{ height: '45px', width: '45px' }} color="secondary">
                            {row.name[0]}
                          </IconButton>
                        )}
                        <Typography sx={{ marginLeft: '10px' }}>{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{row.community.name}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {row.members_count}
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => {
                            setExpandedRowId(expandedRowId === row.id ? null : row.id);
                            handleGetMember(row.id);
                          }}
                        >
                          {expandedRowId === row.id ? <RightOutlined /> : <DownOutlined />}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{row.privacy}</TableCell>
                    <TableCell align="center">{row.activity_level}</TableCell>
                    <TableCell align="center">{row.posting_count}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={actionHandleClick(index)} key={index} id={'show_button' + index}>
                        <DashOutlined />
                        <Menu
                          id={'simple-menu' + index}
                          anchorEl={anchorElArray[index]}
                          keepMounted
                          open={Boolean(anchorElArray[index])}
                          onClose={handleClose}
                          PaperProps={{
                            style: {
                              width: 100 // Set the width of the menu
                            }
                          }}
                        >
                          <MenuItem onClick={() => handleAction(row.id, 'deactivate')}>Deactivate</MenuItem>
                          <MenuItem onClick={() => handleAction(row.id, 'reactivate')}>Reactivate</MenuItem>
                          <MenuItem onClick={() => handleAction(row.id, 'delete')}>Delete</MenuItem>
                        </Menu>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
                    <TableCell sx={{ py: 0 }} colSpan={6}>
                      <Collapse in={expandedRowId === row.id} timeout="auto" unmountOnExit>
                        {open && (
                          <Box sx={{ py: 3, pl: { xs: 3, sm: 5, md: 6, lg: 10, xl: 12 } }}>
                            <TableContainer>
                              <MainCard content={false}>
                                <Table size="small" aria-label="purchases">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell align="center">Name</TableCell>
                                      <TableCell align="center">Photo</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {groupMembers.map((historyRow, index) => (
                                      <TableRow hover key={index}>
                                        <TableCell component="th" scope="row" align="center">
                                          {historyRow.user__email}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                          <img src={historyRow.user__profile_image_key} alt="avatar" style={{ width: '55px' }} />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </MainCard>
                            </TableContainer>
                          </Box>
                        )}
                      </Collapse>
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
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Community Group'
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Group Type'
  },
  {
    id: 'members_count',
    numeric: true,
    disablePadding: false,
    label: 'Members'
  },
  {
    id: 'privacy',
    numeric: false,
    disablePadding: false,
    label: 'Privacy Setting'
  },
  {
    id: 'activity',
    numeric: false,
    disablePadding: false,
    label: 'Activity Level'
  },
  {
    id: 'posting_count',
    numeric: true,
    disablePadding: false,
    label: 'Recent Posts'
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
