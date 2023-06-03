import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react'
import classes from './buildings.module.css';
import { TextField } from '@mui/material';
import { FormControlLabel, Checkbox, Button } from '@mui/material';
import BuildingsList from '../../../../components/building-list/buildingsList';
export default function Buildings() {
   const router = useRouter();
   const [maxFloor, setMaxFloor] = useState(0);
   const [baseFloorLevel, setBaseFloorLevel] = useState(0);
   const [projectId, setProjectId] = useState(null);
   const [buildingId, setBuildingId] = useState(null);
   const descInput = React.useRef();
   const floorsInput = useRef();
   const minFloorInput = useRef();
   const [buildings, setBuildings] = useState([]);
   const [residence, setResidence] = useState(false);
   const [crowding, setCrowding] = useState(false);
   const buildingDef = {
      '1-12': {
         type: 'בניין רגיל',
         definition: ''
      },
      '13-29': {
         type: 'בניין גבוה',
         definition: 'בניין גבוה – בנין שבו הפרש הגובה בין מפלס הכניסה הקובעת לבנין לבין מפלס הכניסה לקומה הגבוהה ביותר המיועדת לאכלוס, שהכניסה אליה דרך חדר מדרגות משותף, עולה על 13 מטרים'
      },
      '30-999': {
         type: 'בניין רב קומות',
         definition: 'בניין רב קומות – בנין שבו הפרש הגובה בין מפלס הכניסה הקובעת לבנין לבין מפלס הכניסה לקומה הגבוהה ביותר המיועדת לאכלוס, שהכניסה אליה דרך חדר מדרגות משותף, עולה על 29 מטרים',

      }
   }


   const onSelectBuildnig = (building) => {
      setBuildingId(building._id);
      descInput.current.value = building.description;
      floorsInput.current.value = building.floors;
      minFloorInput.current.value = building.minFloor;
      setResidence(building.residence);
      setCrowding(building.crowding);
      setBaseFloorLevel(building.baseFloorLevel);
      setMaxFloor(building.maxFloor);
   }



   const getBuildingTypeDescription = () => {
      if (maxFloor && baseFloorLevel && maxFloor >= baseFloorLevel) {
         const height = maxFloor - baseFloorLevel;
         for (const [key, value] of Object.entries(buildingDef)) {
            const [num1, num2] = key.split('-').map(val => parseInt(val));
            if (height >= num1 && height <= num2)
               return value
         }
      }
      return null;
   }

   useEffect(() => {
      if (router.isReady) {
         const prjId = router.query.projectId;
         if (prjId) {
            setProjectId(prjId)
         }
      }


   }, [router.isReady])


   const saveBuilding = async (event) => {
      event.preventDefault();
      console.log('on save building')
      const building = {
         _id: buildingId,
         projectId,
         description: descInput.current.value,
         floors: +floorsInput.current.value,
         minFloor: +minFloorInput.current.value,
         maxFloor,
         baseFloorLevel,
         residence,
         crowding
      }
      const method = building._id ? 'PUT' : 'POST'
      const response = await fetch('/api/buildings', {
         method,
         body: JSON.stringify(building),
         headers: {
            'Content-Type': 'application/json'
         }
      });
      if (response.status === 201) {
         const savedBuilding = await response.json();
         const updated = [...buildings]
         if (method === 'POST')
            updated.push(savedBuilding)
         else {
            const itemIndex = updated.findIndex(item => item._id === savedBuilding._id);
            if (itemIndex !== -1)
               updated[itemIndex] = savedBuilding;
         }
         setBuildings(updated);
         setBuildingId(null);
         descInput.current.value = '';
         floorsInput.current.value = 0;
         minFloorInput.current.value = 0,
            setMaxFloor(0);
         setBaseFloorLevel(0);
         setResidence(false);
         setCrowding(false);

      } else {
         console.log(response.statusText);
      }



   }

   if (!projectId) {
      return <div>Loading...</div>
   }


   const buildingType = getBuildingTypeDescription();
   return (

      <form className={classes.building}>
         <div className={classes.title}>
            <h1 >הוספת מבנים</h1>
         </div>
         <div className={classes.buildingCol1}>
            <TextField
               id='description'
               name='description'
               type='text'
               inputRef={descInput}
               className={classes.textBox}
               multiline={true}
               InputLabelProps={{ shrink: true }}
               rows={3}
               label='שם\תיאור בניין'
               placeholder='הזן שם\תיאור בניין'
            />
            <TextField
               id='floors' name='floors'
               type='number'
               inputRef={floorsInput}
               InputLabelProps={{ shrink: true }}
               className={classes.textBox}
               multiline={false}
               label='מספר קומות'
               placeholder='הזן מספר קומות'
            />
            <TextField
               id='baseFloorLevel'
               name='baseFloorLevel'
               type='number'
               value={baseFloorLevel}
               className={classes.textBox}
               InputLabelProps={{ shrink: true }}
               helperText='מטר'
               multiline={false} label='מפלס הקומה הקובעת'
               placeholder='הזן מפלס הקומה הקובעת'
               onChange={() => setBaseFloorLevel(+event.target.value)} />
            <TextField
               id='maxFloor' name='maxFloor'
               type='number'
               value={maxFloor}
               className={classes.textBox}
               helperText='מטר'
               InputLabelProps={{ shrink: true }}
               multiline={false} label='מפלס הכניסה לקומה הגבוהה ביותר המיועדת לאיכלוס'
               onChange={() => setMaxFloor(+event.target.value)} />
            <TextField
               id='minFloor' name='minFloor'
               type='number'
               className={classes.textBox}
               inputRef={minFloorInput}
               helperText='מטר'
               InputLabelProps={{ shrink: true }}
               multiline={false} label='מפלס הרצפה הנמוכה ביותר במבנה' />
            <div className={classes.checkBoxs}>
               <FormControlLabel
                  id='residence'
                  name='residence'
                  label='בנין מגורים'
                  control={<Checkbox checked={residence} onChange={() => setResidence(!residence)} />}
               />
               <FormControlLabel
                  id='crowding'
                  name='crowding'
                  label='בנין להתקהלות'
                  control={<Checkbox checked={crowding} onChange={() => setCrowding(!crowding)} />}
               />
            </div>

         </div>
         <div className={classes.buildingCol2}>
            {
               (buildingType && buildingType.definition) &&
               <div className={classes.BuildingType}>
                  <label className={classes.lblType}>{buildingType ? buildingType.type : 'סוג בנין'}</label>
                  {buildingType ? buildingType.definition : ''}
               </div>
            }

         </div>
         <div className={classes.buildingView}>
            <BuildingsList onSelectBuildnig={onSelectBuildnig} buildings={buildings}>

            </BuildingsList>

         </div>

         <Button variant='contained'
            className={`${classes.SubmitBuilding} ${classes.button} `}
            onClick={saveBuilding}>{buildingId ? 'עדכן בנין' : 'הוסף בנין'}</Button>
      </form>
   )
}

// TODO:
// export async function getStaticsProps(context) {
//    const {params} =context;
//    const projectId=

// }


