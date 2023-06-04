import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import classes from './project.module.css';
import { TextField, Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { getProjects } from '../api/projects';



export default function Project(props) {
    const router = useRouter();
    const [currentProject, setCurrentProject] = useState(null);
    const nameInput = useRef();
    const addressInput = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const { error, project } = props;

    useEffect(() => {
        if (error) {
            alert(error);
        } else if (project) {
            setCurrentProject(project)
            nameInput.current.value = project.name;
            addressInput.current.value = project.address;
        }
        else {
            setCurrentProject({ name: '', address: '' });
        }

    }, [error, project])
    const saveProject = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        debugger;
        const method = currentProject._id ? 'PUT' : 'POST'
        const response = await fetch('/api/projects', {
            method,
            body: JSON.stringify({ _id: currentProject._id, name: nameInput.current.value, address: addressInput.current.value }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            const savedProj = await response.json();
            setCurrentProject(savedProj);
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
    if (!currentProject) {
        return (<h1>Loading...</h1>)
    }
    const addUpdateProjectBtn = currentProject._id ? 'עדכן פרויקט' : 'הוסף פרויקט';
    const nextButtonDisabeled = currentProject._id ? false : true;

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
                        inputRef={nameInput}
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
                        inputRef={addressInput} />
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
export const getStaticPaths = async () => {
    const projects = await getProjects();
    const ids = projects.map(project => project._id);
    const params = ids.map((id) => ({ params: { projectId: id } }));

    return {
        paths: params,
        fallback: 'blocking'
    }

}


export const getStaticProps = async (context) => {
    const { params } = context;
    const projectId = params.projectId;
    try {

        const projects = await getProjects();

        const project = projects.find((project) => project._id === projectId);
        console.log(project);
        return {
            props: {
                project,
            },
        };
    }
    catch (error) {
        console.log(error);
        return {
            props: {
                error
            },

        }
    }
}

