import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const BuildingsList = ( props ) => {
  if (!props?.buildings) return <p>test</p>


  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>שם\תאור בנין</TableCell>
            <TableCell align="right">מספר קומות</TableCell>
            <TableCell align="right">מפלס הכניסה לקומה הגבוהה ביותר במבנה</TableCell>
            <TableCell align="right">מפלס הרצפה הנמוכה ביותר במבנה</TableCell>
            <TableCell align="right">בנין מגורים</TableCell>
            <TableCell align="right">בנין התקהלות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.buildings.map((row) => (
            <span>test</span>
        ))}
        </TableBody>
      </Table>
    </>





  )
}



export default BuildingsList;