import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import classes from './project.module.css';
import { TextField, Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';



export default function Project() {
    const router = useRouter();
    const [project, setProject] = useState({ name: '', address: '' });
    const nameInput = useRef();
    const addressInput = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const saveProject = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const method = project._id ? 'PUT' : 'POST'
        const response = await fetch('/api/projects', {
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
            setIsLoading(false);
            if (router.asPath !== projectRoute) {
                router.replace(projectRoute);
            }

        } else {
            setIsLoading(false);
            console.log(response.statusText);
        }

    }

    const moveToBuilding = () => {
        router.push(`${router.asPath}/buildings`);
    }
    if (!project) {
        return (<h1>Loading...</h1>)
    }
    const addUpdateProjectBtn = project._id ? 'עדכן פרויקט' : 'הוסף פרויקט';
    const nextButtonDisabeled = project._id ? false : true;

    return (
        <main className={classes.projectFormWrapper}>
            {
                isLoading &&
                <CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />
            }

            <form className={classes.form}>
                <div className={classes.project}>
                    <h1 className={classes.title}>ניהול פרויקט</h1>
                    <TextField
                        id='projectName'
                        label='שם פרויקט'
                        color="secondary"
                        name='name'
                        type='text'
                        InputLabelProps={{ shrink: true }}
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
                        color="secondary"
                        className={classes.textBox}
                        multiline={true}
                        rows={3}
                        placeholder='הזן כתובת'
                        ref={addressInput} />
                    <div className={classes.submitProject}>
                        <Button color="secondary" onClick={saveProject} variant="contained" className={classes.button}>{addUpdateProjectBtn}</Button>
                        <Tooltip title="עבור להוספת בינינים">
                        <Button color="secondary" onClick={moveToBuilding} disabled={nextButtonDisabeled} variant="contained" className={classes.button}>הבא</Button>
                        </Tooltip>
                    </div>

                </div>


            </form>
        </main>
    )
}

