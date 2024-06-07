import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
// material-ui
import { DashOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { alpha, useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import groupAvatar from 'assets/images/users/avatar-2.png';
import avatar1 from 'assets/images/users/avatar-4.png';
import IconButton from 'components/@extended/IconButton';
// assets
import { RightOutlined } from '@ant-design/icons';
import DownOutlined from '@ant-design/icons/DownOutlined';

// project imports
import MainCard from 'components/MainCard';
import { CSVExport, RowSelection } from 'components/third-party/react-table';
import { header } from './basic';
function createData(id, group, groupImage, groupType, privacy, activity, posts) {
  return {
    id,
    group,
    groupImage,
    groupType,
    privacy,
    activity,
    posts,
    member: [
      { id: '1', name: 'John', avatar: `${avatar1}` },
      { id: '2', name: 'mary', avatar: `${avatar1}` }
    ]
  };
}

const rows = [
  createData(1, 'African Youth Empowerment', groupAvatar, 'Educational', 'Public', 'High', '98'),
  createData(2, 'African Youth Empowerment', groupAvatar, 'Educational', 'Public', 'High', '98'),
  createData(3, 'African Youth Empowerment', groupAvatar, 'Educational', 'Public', 'High', '98'),
  createData(4, 'African Youth Empowerment', groupAvatar, 'Educational', 'Public', 'High', '98'),
  createData(5, 'African Youth Empowerment', groupAvatar, 'Educational', 'Public', 'High', '98'),
  createData(6, 'African Youth Empowerment', groupAvatar, 'Educational', 'Private', 'High', '98')
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
    id: 'group',
    numeric: false,
    disablePadding: false,
    label: 'Community Group'
  },
  {
    id: 'groupType',
    numeric: false,
    disablePadding: false,
    label: 'Group Type'
  },
  {
    id: 'members',
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
    id: 'posts',
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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
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

export default function CommunityTable() {
  // Catch data

  const theme = useTheme();
  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  const [expandedRowId, setExpandedRowId] = useState(null);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
    <MainCard
      content={false}
      title="Data Tables"
      secondary={<CSVExport data={selectedValue.length > 0 ? selectedValue : rows} headers={header} filename={'selected-table-data.csv'} />}
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
                      <TableCell padding="checkbox" sx={{ pl: 3 }}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
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
                          <img src={row.groupImage} alt="groupImage" style={{ width: '40px', borderRadius: '50px' }} />
                          <Typography sx={{ marginLeft: '10px' }}>{row.group}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{row.groupType}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          {row.member.length}
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setExpandedRowId(expandedRowId === row.id ? null : row.id)}
                          >
                            {expandedRowId === row.id ? <RightOutlined /> : <DownOutlined />}
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{row.privacy}</TableCell>
                      <TableCell align="center">{row.activity}</TableCell>
                      <TableCell align="center">{row.posts}</TableCell>
                      <TableCell align="center">
                        <IconButton>
                          <DashOutlined />
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
                                      {row.member?.map((historyRow) => (
                                        <TableRow hover key={historyRow.id}>
                                          <TableCell component="th" scope="row" align="center">
                                            {historyRow.name}
                                          </TableCell>
                                          <TableCell component="th" scope="row" align="center">
                                            <img src={historyRow.avatar} alt="avatar" style={{ width: '55px' }} />
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
