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
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FormControlLabel, Checkbox, Button } from '@mui/material';
import { useState } from 'react';
import classes from './buildingsList.module.css';
const BuildingsList = (props) => {
  const [open, setOpen] = useState(false);



  return (
    <div className={classes.container}>
      <Table sx={{ minWidth: 650, background: 'white', borderRadius: '5px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ערוך</TableCell>
            <TableCell>שם\תאור בנין</TableCell>
            <TableCell align="center">מספר קומות</TableCell>
            <TableCell align="center">מפלס הקומה הקובעת</TableCell>
            <TableCell align="center">מפלס הכניסה לקומה הגבוהה ביותר במבנה</TableCell>
            <TableCell align="center">מפלס הרצפה הנמוכה ביותר במבנה</TableCell>
            <TableCell align="center">בנין מגורים</TableCell>
            <TableCell align="center">בנין התקהלות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.buildings.map((row) => (
            <TableRow key={row._id} sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  size="small"
                  color="secondary"
                  onClick={() => props.onSelectBuildnig(row)}
                >
                  {<EditIcon />}
                </IconButton>
              </TableCell>
              <TableCell sx={{ display: 'none' }}>{row._id}</TableCell>
              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell align="center">{row.floors}</TableCell>
              <TableCell align="center">{row.baseFloorLevel}</TableCell>
              <TableCell align="center">{row.maxFloor}</TableCell>
              <TableCell align="center">{row.minFloor}</TableCell>
              <TableCell align="center"><FormControlLabel

                checked={row.residence}
                control={<Checkbox  color="secondary" />}
              />
              </TableCell>
              <TableCell align="center"><FormControlLabel
                checked={row.crowding}
                control={<Checkbox  color="secondary" />}
              /></TableCell>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>





  )
}



export default BuildingsList;