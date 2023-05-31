import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import classes from './project.module.css';
import { TextField,Button } from "@mui/material";



export default function Project() {
    const router = useRouter();
    const [project, setProject] = useState({ name: '', address: '' });
    const nameInput = useRef();
    const addressInput = useRef();
    // useEffect(() => {
    //     const getProjectById = async (id) => {
    //         debugger;
    //         const response = await fetch(`/api/projects/${id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const savedProj = await response.json();
    //         setProject(savedProj);
    //     }
    //     const id = router.query.projectId;
    //     if (id && id !== 'new') {
    //         getProjectById(id);
    //     }
    //     else setProject({ name: '', address: '', buildings: [] })

    // }, [])


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
        event.preventDefault();        
        const method = project._id ? 'PUT' : 'POST'
        const response = await fetch('/api/projects/project', {
            method,
            body: JSON.stringify({ name: nameInput.current.value, address: addressInput.current.value }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            const savedProj = await response.json();
            setProject(savedProj);            
            const projectRoute = `/projects/${savedProj._id}`

            if (router.asPath !== projectRoute) {
                router.replace(projectRoute);
            }
        } else {
            console.log(response.statusText);
        }

    }

    const moveToBuilding = (event) => {
        router.push(`${router.asPath}/buildings`);
    }




    // const saveBuilding = (event) => {
    //     event.preventDefault();
    //     if (!currentBuilding._id) {
    //         currentBuilding._id = project.buildings.length + 1;
    //         project.buildings.push(currentBuilding);
    //     } else {
    //         const index = project.buildings.findIndex(p => p._id === currentBuilding._id);
    //         if (index < 0)
    //             project.buildings.push(currentBuilding);
    //         else
    //             project.buildings.splice(index, 1, currentBuilding);
    //     }
    //     saveProject();

    // }



    // const onProjectChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     const updated = { ...project };
    //     updated[name] = value;
    //     setProject(updated);
    // }

    




    if (!project) {
        return (<h1>Loading...</h1>)
    }
    const addUpdateProjectBtn = project._id ? 'עדכן פרויקט' : 'הוסף פרויקט';
    const nextButtonDisabeled = project._id ? false : true;

    return (
        <main className={classes.projectFormWrapper}>

            <form className={classes.form}>
                <div className={classes.project}>
                    <h1 className={classes.title}>ניהול פרויקט</h1>
                    <TextField
                        id='projectName'
                        label='שם פרויקט'
                        name='name'
                        type='text'
                        className={classes.textBox}
                        multiline={false}
                        placeholder='הזן שם פרויקט'
                        ref={nameInput}
                    />
                    <TextField
                        id='address'
                        name='address'
                        label='כתובת'
                        type='text'                        
                        className={classes.textBox}
                        multiline={true}
                        rows={3}
                        placeholder='הזן כתובת'
                        ref={addressInput} />
                    <div className={classes.submitProject}>
                        <Button onClick={saveProject} variant="contained" className={classes.button}>{addUpdateProjectBtn}</Button>
                        <Button onClick={moveToBuilding} disabled={nextButtonDisabeled} variant="contained" className={classes.button}>הבא</Button>
                    </div>

                </div>

                
            </form>
        </main>
    )
}

