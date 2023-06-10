import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import classes from './project.module.css';
import { Button } from "@mui/material";
import TextBox from '@/components/UI/textbox/textbox';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { getProjects } from '../api/projects/index';
import AppContext from '../../context/app-context';
import { projectService } from '../../services/projectSerivce.js';

export default function Project(props) {
    const { showMessage } = useContext(AppContext);
    const router = useRouter();
    const [currentProject, setCurrentProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { error, project } = props;

    useEffect(() => {
        if (error) {
            return <h1 style={{ color: 'red' }}>{error}</h1>
        }

        if (!project) {
            return (<CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />)
        }
        setCurrentProject(project)

    }, [project, error])


    const onChange = (event) => {
        const key = event.target.name;
        const updated = { ...currentProject };
        updated[key] = event.target.value;
        setCurrentProject(updated);
    }

    const saveProject = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const savedProj = await projectService.saveProject(currentProject);
            projectService.refreshData(router.asPath);
            setCurrentProject(savedProj);
            const projectRoute = `/projects/${savedProj._id}`
            setIsLoading(false);
            if (router.asPath !== projectRoute) {
                router.replace(projectRoute);
            }
            showMessage({ text: 'הפרויקט נשמר בהצלחה', type: 'success' })
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            showMessage({ text: 'אופס משהו השתבש', type: 'error' });
        }

    }

    const moveToBuilding = () => {
        router.push(`${router.asPath}/buildings`);
    }
    if (!currentProject) {
        return (<CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />)
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
                    <TextBox
                        id='name'
                        label='שם פרויקט'
                        type='text'
                        value={currentProject.name}
                        multiline={false}
                        placeholder='הזן שם פרויקט'
                        onChange={onChange}
                    />
                    <TextBox
                        id='address'
                        label='כתובת'
                        type='text'
                        multiline={true}
                        value={currentProject.address}
                        rows={3}
                        placeholder='הזן כתובת'
                        onChange={onChange}
                    />
                    <div className={classes.submitProject}>
                        <Button sx={{ width: '120px', marginInlineEnd: '15px' }} color="secondary" onClick={saveProject} variant="contained">{addUpdateProjectBtn}</Button>
                        <Tooltip title="עבור להוספת בינינים">
                            <span>
                                <Button sx={{ width: '120px' }} color="secondary" onClick={moveToBuilding} disabled={nextButtonDisabeled} variant="contained" className={classes.button}>הבא</Button>
                            </span>
                        </Tooltip>
                    </div>

                </div>


            </form>
        </main>
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
    const { params } = context;
    const projectId = params.projectId;
    try {

        if (projectId === 'new') {
            return {
                props: {
                    project: { _id: null, name: '', address: '' }
                },
            };
        }
        const data = await getProjects();


        const project = data.projects.find((project) => project._id === projectId);
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

