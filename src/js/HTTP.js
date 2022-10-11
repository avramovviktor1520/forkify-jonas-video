import { TIMEOUT_SECONDS } from "./configuration";

const timeoutHTTP = function(timeoutSeconds) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('The request timed out')), timeoutSeconds * 1000);
    })
}

export const AJAX = async function(url, data) {
    try {
        const fetchRequest = data ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }) : fetch(url);
    
        const response = await Promise.race([fetchRequest, timeoutHTTP(TIMEOUT_SECONDS)]);
        if(!response) throw new Error(`Bad request. Status code ${response.status}`);
        return (await response.json());
        
    } catch(err) {
        throw err;
    }

    
}

export const sendJSON = async function(url, data) {
    const fetchPro = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })


    const response = await Promise.race([fetchPro, timeoutHTTP(TIMEOUT_SECONDS)]);
    const jsonData = await response.json();
    if(!response.ok) throw new Error("Bad request. Status code " + response.status);
    console.log(jsonData.data);
    return jsonData.data.recipe;
}

export const getJSON = async function(url) {
    try {
        const response = await Promise.race([fetch(url), timeoutHTTP(TIMEOUT_SECONDS)]);
        if(!response.ok) throw new Error("Bad request. Status code " + response.status);
        return (await response.json()).data;

    } catch(err) {
        throw err;
    }
}