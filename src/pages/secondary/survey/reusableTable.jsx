import React, { useState } from 'react';
// material-ui
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import EnhancedTableHead from 'utils/enhanceFunction';
import { getSurvey } from 'redux/surveyRelated/surveyHandle';
// assets

// project imports
import MainCard from 'components/MainCard';
import ViewSurveyModal from './modal/viewSurveyModal';
// import { headerData } from './basic';

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
const headers = [
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
    id: 'link',
    numeric: false,
    disablePadding: false,
    label: 'Link'
  },
  {
    id: 'community',
    numeric: false,
    disablePadding: false,
    label: 'Community'
  },
  {
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    label: 'Start Date'
  },
  {
    id: 'endDate',
    numeric: false,
    disablePadding: false,
    label: 'End Date'
  }
];
export default function ReusableTable() {
  const dispatch = useDispatch();
  const { total_count, tablePage, items_per_page, surveyList } = useSelector((state) => state.survey);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const profileModalOpen = () => setSurveyOpen(true);
  const surveyModalClose = () => setSurveyOpen(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(items_per_page);
  const [surveyInfo, setSurveyInfo] = React.useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(getSurvey(rowsPerPage, newPage + 1));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('hi');
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
    dispatch(getSurvey(parseInt(event.target.value, 10), 1));
  };

  // avoid a layout jump when reaching the last page with empty rowData.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total_count) : 0;

  return (
    <>
      <MainCard content={false} title="All Surveys">
        {/* table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={total_count}
              headCells={headers}
            />
            <TableBody>
              {stableSort(surveyList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  /** make sure no display bugs if row isn't an OrderData object */
                  if (typeof row === 'number') return null;
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row" padding="none" align="left" sx={{ width: '10px' }}>
                        {row.id}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          '&:hover': {
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }
                        }}
                        onClick={() => {
                          setSurveyInfo(row);
                          profileModalOpen();
                        }}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="left">{row.surveyUrl}</TableCell>
                      <TableCell align="left">{row.community.name}</TableCell>
                      <TableCell align="left">{row.startDate}</TableCell>
                      <TableCell align="left">{row.endDate}</TableCell>
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

        {/* table rowData */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total_count}
          rowsPerPage={items_per_page}
          page={tablePage - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
      <ViewSurveyModal modalOpen={surveyOpen} modalClose={surveyModalClose} surveyInfo={surveyInfo} />
    </>
  );
}
