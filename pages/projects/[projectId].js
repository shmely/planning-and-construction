import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import classes from './project.module.css';
import { TextField, Button } from "@mui/material";



export default function Project() {
    const router = useRouter();
    const [project, setProject] = useState({ name: '', address: '' });
    const nameInput = useRef();
    const addressInput = useRef();

    const saveProject = async (event) => {
        event.preventDefault();
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

            if (router.asPath !== projectRoute) {
                router.replace(projectRoute);
            }
        } else {
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

            <form className={classes.form}>
                <div className={classes.project}>
                    <h1 className={classes.title}>ניהול פרויקט</h1>
                    <TextField
                        id='projectName'
                        label='שם פרויקט'
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

