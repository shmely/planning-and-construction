import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import classes from './editProject.module.css';
import { TextField } from "@mui/material";
import { FormControlLabel, Checkbox, Button } from "@mui/material";


export default function ProjectEdit() {
    const router = useRouter();
    const [project, setProject] = useState(null);
    useEffect(() => {
        const getProjectById = async (id) => {
            debugger;
            const response = await fetch(`/api/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const savedProj = await response.json();
            setProject(savedProj);
        }
        const id = router.query.projectId;
        if (id && id !== 'new') {
            getProjectById(id);
        }
        else setProject({ name: '', address: '', buildings: [] })

    }, [])


    const [currentBuilding, setBuilding] = useState(
        {
            _id: null,
            description: '',
            numberOfFloors: 0,
            determiningFloorLevelMetter: 0,
            entranceLevelHighestFloorIntendedOccupancyMetter: 0,
            lowestFloorLevelInbuilding: 0,
            isResidentialBuilding: false,
            isGatheringBuilding: false
        })




    const saveProject = async (event) => {
        if (event)
            event.preventDefault();
        const method = project._id ? 'PUT' : 'POST'
        const response = await fetch('/api/projects/project', {
            method,
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            const savedProj = await response.json();
            setProject(savedProj);
            console.log(savedProj);
            const projectRoute = `/projects/edit/${savedProj._id}`

            if (router.asPath !== projectRoute) {
                router.replace(projectRoute);
            }
        } else {
            console.log(response.statusText);
        }

    }




    const saveBuilding = (event) => {
        event.preventDefault();
        if (!currentBuilding._id) {
            currentBuilding._id = project.buildings.length + 1;
            project.buildings.push(currentBuilding);
        } else {
            const index = project.buildings.findIndex(p => p._id === currentBuilding._id);
            if (index < 0)
                project.buildings.push(currentBuilding);
            else
                project.buildings.splice(index, 1, currentBuilding);
        }
        saveProject();

    }



    const onProjectChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const updated = { ...project };
        updated[name] = value;
        setProject(updated);
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




    if (!project && currentBuilding) {
        return (<h1>Loading...</h1>)
    }
    const btnDescription = project._id ? 'עדכן פרויקט' : 'הוסף פרויקט';

    return (
        <main className={classes.projectFormWrapper}>

            <form className={classes.form}>
                <div className={classes.project}>
                    <h1 className={classes.title}>ניהול פרויקט</h1>
                    <TextField
                        id='projectName'
                        label='שם פרויקט'
                        name='name'
                        type='text' value={project.name}
                        className={classes.textBox}
                        multiline={false}
                        placeholder='הזן שם פרויקט'
                        onChange={onProjectChange} />
                    <TextField
                        id='address'
                        name='address'
                        label='כתובת'
                        type='text'
                        value={project?.address}
                        className={classes.textBox}
                        multiline={true}
                        rows={3}
                        placeholder='הזן כתובת' onChange={onProjectChange} />
                    <Button onClick={saveProject} variant="contained" className={`${classes.submitProject} ${classes.button}`}>{btnDescription}</Button>
                </div>

                <div className={classes.building}>
                    <div>
                        <h1 className={classes.title}>הוספת מבנים</h1>
                    </div>
                    <div className={classes.buildingCol1}>
                        <TextField
                            id='description' name='description'
                            type='text' value={currentBuilding.description}
                            className={classes.textBox} multiline={true}
                            rows={3}
                            label='שם\תיאור בניין'
                            placeholder='הזן שם\תיאור בניין'
                            onChange={onBuildingChange} />
                        <TextField
                            id='numberOfFloors' name='numberOfFloors'
                            type='number' value={currentBuilding.numberOfFloors}
                            className={classes.textBox} multiline={false}
                            label='מספר קומות' placeholder='הזן מספר קומות'
                            onChange={onBuildingChange} />
                        <TextField
                            id='determiningFloorLevelMetter' name='determiningFloorLevelMetter'
                            type='number' value={currentBuilding.determiningFloorLevelMetter}
                            className={classes.textBox} helperText='מטר'
                            multiline={false} label='מפלס הקומה הקובעת'
                            placeholder='הזן מפלס הקומה הקובעת'
                            onChange={onBuildingChange} />
                    </div>
                    <div className={classes.buildingCol2}>
                        <TextField
                            id='entranceLevelHighestFloorIntendedOccupancyMetter' name='entranceLevelHighestFloorIntendedOccupancyMetter'
                            type='number' value={currentBuilding.entranceLevelHighestFloorIntendedOccupancyMetter}
                            className={classes.textBox} helperText='מטר'
                            multiline={false} label='מפלס הכניסה לקומה הגבוהה ביותר המיועדת לאיכלוס'
                            onChange={onBuildingChange} />
                        <TextField
                            id='lowestFloorLevelInbuilding' name='lowestFloorLevelInbuilding'
                            type='number' value={currentBuilding.lowestFloorLevelInbuilding}
                            className={classes.textBox} helperText='מטר'
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
                    <Button disabled={project._id ? false : true} variant="contained"
                        className={`${classes.SubmitBuilding} ${classes.button} `}
                        onClick={saveBuilding}>{currentBuilding._id ? 'עדכן בנין' : 'הוסף בנין'}</Button>
                </div>
            </form>
        </main>
    )
}

