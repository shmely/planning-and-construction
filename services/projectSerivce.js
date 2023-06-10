
const saveProject = async (project) => {
    const response = await fetch('/api/projects', {
        method: project._id ? 'PUT' : 'POST',
        body: JSON.stringify(project),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 201) {
        return await response.json();
    } else {
        throw `status: ${response.status} description: ${response.statusText}`
    }

}

const saveBuilding = async (building) => {
    const response = await fetch('/api/buildings', {
        method: building._id ? 'PUT' : 'POST',
        body: JSON.stringify(building),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 201) {
        return await response.json();
    } else {
        throw `status: ${response.status} description: ${response.statusText}`
    }

}

const deleteBuilding = async (id) => {
    const response = await fetch(`/api/buildings/${id}`, {
        method: 'DELETE'        
    });
    return response;

}

const refreshData = (path) => {
    const url = `/api/revalidate?path=${path}`
    console.log(url);
    fetch(url, { method: 'GET' });

}


export const projectService = {
    saveProject,
    saveBuilding,
    deleteBuilding,
    refreshData
}