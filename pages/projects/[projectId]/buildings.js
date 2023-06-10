import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef, useContext } from 'react'
import classes from './buildings.module.css';
import TextBox from '../../../components/UI/textbox/textbox';
import { Button } from '@mui/material';
import AppContext from '../../../context/app-context';
import CheckBox from '@/components/UI/checkbox/checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import BuildingsList from '../../../components/building-list/buildingsList';
import { getProjects } from '../../api/projects/index';
import { projectService } from '../../../services/projectSerivce';

export default function Buildings(props) {
   const { showMessage } = useContext(AppContext);
   const { loadedBuildings, prjId } = props;
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
   const [isLoading, setIsLoading] = useState(false);
   const { buildingsDefentions } = useContext(AppContext);
   useEffect(() => {

      if (loadedBuildings) {
         setBuildings(loadedBuildings);
      }
      if (prjId) setProjectId(prjId);
   }, [loadedBuildings]);


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
         for (const [key, value] of Object.entries(buildingsDefentions)) {
            const [num1, num2] = key.split('-').map(val => parseInt(val));
            if (height >= num1 && height <= num2) {
               return value
            }
         }
      }
      return null;
   }

   const onDeletBuilding = async (buildingId) => {
      const areYouSure = confirm("Press a button!");
      if (areYouSure) {
         setIsLoading(true);
         try {
            const response =await projectService.deleteBuilding(buildingId);
            if (response.status === 200) {
               projectService.refreshData(router.asPath);
               const buildingsArray = [...buildings];               
               const filterd = buildingsArray.filter(b => b._id !== buildingId);               
               setBuildings(filterd);
               setIsLoading(false);
               showMessage({ text: 'הבנין נמחק בהצלחה', type: 'success' })
            } else {
               setIsLoading(false);
               showMessage({ text: 'אופס משהו השתבש', type: 'error' });
            }
            
         } catch (error) {
            console.log(error);
            setIsLoading(false);
            showMessage({ text: 'אופס משהו השתבש', type: 'error' });
         }

      }
   }

   const saveBuilding = async (event) => {
      event.preventDefault();
      setIsLoading(true);
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
      const isInsert = building._id ? false : true;
      try {
         const savedBuilding = await projectService.saveBuilding(building);
         projectService.refreshData(router.asPath);
         const updated = [...buildings]
         if (isInsert)
            updated.push(savedBuilding)
         else {
            const itemIndex = updated.findIndex(item => item._id === savedBuilding._id);
            if (itemIndex !== -1)
               updated[itemIndex] = savedBuilding;
         }
         setBuildings(updated);
         clearValues();
         setIsLoading(false);
         showMessage({ text: 'הבנין נשמר בהצלחה', type: 'success' })
      } catch (error) {
         setIsLoading(false);
         console.log(error);
         showMessage({ text: 'אופס משהו השתבש', type: 'error' });
      }
   }

   const clearValues = () => {
      setBuildingId(null);
      descInput.current.value = '';
      floorsInput.current.value = 0;
      minFloorInput.current.value = 0,
         setMaxFloor(0);
      setBaseFloorLevel(0);
      setResidence(false);
      setCrowding(false);

   }


   if (!projectId) {
      return <div>Loading...</div>
   }


   const buildingType = getBuildingTypeDescription();
   return (
      <div className={classes.container}>
         {
            isLoading &&
            <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
         }
         <form className={classes.building}>

            <div className={classes.title}>
               <h1 >הוספת מבנים</h1>
            </div>
            <div className={classes.buildingCol1}>
               <TextBox
                  inputRef={descInput}
                  multiline={true}
                  rows={3}
                  label='שם\תיאור בניין'
                  placeholder='הזן שם\תיאור בניין'
               />
               <TextBox
                  type='number'
                  inputRef={floorsInput}
                  label='מספר קומות'
                  placeholder='הזן מספר קומות'
               />
               <TextBox
                  id='baseFloorLevel'
                  type='number'
                  helperText='מטר'
                  multiline={false}
                  value={baseFloorLevel}
                  label='מפלס הקומה הקובעת'
                  placeholder='הזן מפלס הקומה הקובעת'
                  onChange={() => setBaseFloorLevel(+event.target.value)} />
               <TextBox
                  id='maxFloor'
                  type='number'
                  value={maxFloor}
                  helperText='מטר'
                  multiline={false}
                  label='מפלס הכניסה לקומה הגבוהה ביותר המיועדת לאיכלוס'
                  onChange={() => setMaxFloor(+event.target.value)} />
               <TextBox
                  id='minFloor'
                  name='minFloor'
                  type='number'
                  inputRef={minFloorInput}
                  helperText='מטר'
                  InputLabelProps={{ shrink: true }}
                  multiline={false} label='מפלס הרצפה הנמוכה ביותר במבנה' />
               <div className={classes.checkBoxs}>
                  <CheckBox
                     id='residence'
                     label='בנין מגורים'
                     checked={residence}
                     onChange={() => setResidence(!residence)}
                  />
                  <CheckBox
                     id='crowding'
                     label='בנין להתקהלות'
                     checked={crowding}
                     onChange={() => setCrowding(!crowding)}
                  />

               </div>
               <Button variant='contained' color="secondary"
                  className={classes.button}
                  onClick={saveBuilding}>{buildingId ? 'עדכן בנין' : 'הוסף בנין'}</Button>

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
               <BuildingsList onSelectBuildnig={onSelectBuildnig} onDeletBuilding={onDeletBuilding} buildings={buildings}></BuildingsList>
            </div>


         </form>
      </div>
   )
}

export const getStaticPaths = async () => {
   const data = await getProjects();
   const ids = data.projects.map(project => project._id);
   const params = ids.map((id) => ({ params: { projectId: id } }));

   return {
      paths: params,
      fallback: 'blocking'
   }

}

export const getStaticProps = async (context) => {
   console.log(context)
   const { params } = context;
   const projectId = params.projectId;
   console.log(`projectId: ${projectId}`)
   try {


      const data = await getProjects();
      const buildings = data.buildings.filter(building => building.projectId === projectId)

      console.log(buildings);
      return {
         props: {
            prjId: projectId,
            loadedBuildings: JSON.parse(JSON.stringify(buildings))
         }
      };
   }
   catch (error) {
      console.log(error);
      return {
         props: {
            error
         }
      }
   }
}


