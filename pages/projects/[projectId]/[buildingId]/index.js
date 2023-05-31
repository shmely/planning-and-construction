import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import classes from './buildings.module.css';
import { TextField } from "@mui/material";
import { FormControlLabel, Checkbox, Button } from "@mui/material";
export default function Buildings() {
   const router = useRouter();
   const [currentBuilding, setBuilding] = useState(
      {
         _id: null,
         projectId: null,
         description: '',
         numberOfFloors: 0,
         determiningFloorLevelMetter: 0,
         entranceLevelHighestFloorIntendedOccupancyMetter: 0,
         lowestFloorLevelInbuilding: 0,
         isResidentialBuilding: false,
         isGatheringBuilding: false
      })
   useEffect(() => {
      const projectId = router.query.projectId;
      if (projectId) {
         setBuilding((prevState => {
            const building = { ...prevState };
            prevState.projectId = projectId;
            return building;

         }));
      }


   }, [])
   const saveBuilding = (event) => {
      event.preventDefault();
      console.log('on save building')

   }


   const onBuildingChange = (event) => {

      const name = event.target.name;
      let value;
      switch (name) {
         case 'numberOfFloors':
         case 'determiningFloorLevelMetter':
         case 'entranceLevelHighestFloorIntendedOccupancyMetter':
         case 'entranceLevelHighestFloorIntendedOccupancyMetter':
         case 'lowestFloorLevelInbuilding':
            value = +event.target.value;
            break;
         case 'isResidentialBuilding':
         case 'isGatheringBuilding':
            value = event.target.checked;
            break;
         default:
            value = event.target.value;
            break
      }

      const updated = { ...currentBuilding };
      updated[name] = value;
      setBuilding(updated);
   }
   return (

      <form className={classes.building}>
         <div>
            <h1 className={classes.title}>הוספת מבנים</h1>
         </div>
         <div className={classes.buildingCol1}>
            <TextField
               id='description' name='description'
               type='text' value={currentBuilding.description}
               className={classes.textBox}
               multiline={true}
               InputLabelProps={{ shrink: true }}
               rows={3}
               label='שם\תיאור בניין'
               placeholder='הזן שם\תיאור בניין'
               onChange={onBuildingChange} />
            <TextField
               id='numberOfFloors' name='numberOfFloors'
               type='number'
               InputLabelProps={{ shrink: true }}
               value={currentBuilding.numberOfFloors}
               className={classes.textBox}
               multiline={false}
               label='מספר קומות' placeholder='הזן מספר קומות'
               onChange={onBuildingChange} />
            <TextField
               id='determiningFloorLevelMetter'
               name='determiningFloorLevelMetter'
               type='number'
               value={currentBuilding.determiningFloorLevelMetter}
               className={classes.textBox}
               InputLabelProps={{ shrink: true }}
               helperText='מטר'
               multiline={false} label='מפלס הקומה הקובעת'
               placeholder='הזן מפלס הקומה הקובעת'
               onChange={onBuildingChange} />
         </div>
         <div className={classes.buildingCol2}>
            <TextField
               id='entranceLevelHighestFloorIntendedOccupancyMetter' name='entranceLevelHighestFloorIntendedOccupancyMetter'
               type='number' value={currentBuilding.entranceLevelHighestFloorIntendedOccupancyMetter}
               className={classes.textBox} helperText='מטר'
               InputLabelProps={{ shrink: true }}
               multiline={false} label='מפלס הכניסה לקומה הגבוהה ביותר המיועדת לאיכלוס'
               onChange={onBuildingChange} />
            <TextField
               id='lowestFloorLevelInbuilding' name='lowestFloorLevelInbuilding'
               type='number' value={currentBuilding.lowestFloorLevelInbuilding}
               className={classes.textBox} helperText='מטר'
               InputLabelProps={{ shrink: true }}
               multiline={false} label='מפלס הרצפה הנמוכה ביותר במבנה'
               onChange={onBuildingChange} />
            <div className={classes.checkBoxs}>
               <FormControlLabel
                  id='isResidentialBuilding' name='isResidentialBuilding'
                  checked={currentBuilding.isResidentialBuilding}
                  control={<Checkbox />} label="בנין מגורים"
                  onChange={onBuildingChange} />
               <FormControlLabel
                  id='isGatheringBuilding' name='isGatheringBuilding'
                  checked={currentBuilding.isGatheringBuilding}
                  control={<Checkbox />} label="בנין להתקהלות"
                  onChange={onBuildingChange} />
            </div>
         </div>
         <Button variant="contained"
            className={`${classes.SubmitBuilding} ${classes.button} `}
            onClick={saveBuilding}>{currentBuilding._id ? 'עדכן בנין' : 'הוסף בנין'}</Button>
      </form>
   )


}