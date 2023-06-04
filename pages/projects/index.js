import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import classes from './project.module.css';
import Link from 'next/link';
import { getProjects } from '../api/projects';
const projects = ({ projects }) => {

    if (!projects)
        return (<CircularProgress color="secondary" sx={{ position: 'absolute', top: '50%', left: '50%' }} />)

    return (
        <main className={classes.projectListCont}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginBlockEnd: '30px' }}
            >
                <InputBase
                    color="secondary"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="חיפוש פרויקט"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon color="secondary" />
                </IconButton>
            </Paper>

            <ul className={classes.projectList}>
                {
                    projects.map(project => (
                        <li key={project._id} className={classes.projectListItem}>
                            <div className={classes.projectName}>{`${project.name}:    `}</div>
                            <Link className={classes.link} href={`/projects/${project._id}`}>לפרויקט</Link>
                            <span className={classes.projectName}>{`\t | \t`}</span>
                            <Link className={classes.link} href={`/projects/${project._id}/buildings`}>לבינינים </Link>
                        </li>
                    ))
                }
            </ul >
        </main>
    )



}

export const getStaticProps = async () => {

    try {
        
        console.log(getProjects);
        const projects = await getProjects();        
        console.log(projects)
        return {
            props: { projects },
            revalidate: 10
        }
    }
    catch (error) {
        console.log(error);
        return {
            props: {},
            revalidate: 10
        }
    }
}



export default projects