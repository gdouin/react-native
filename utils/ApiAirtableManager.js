import React from 'react';

const config = {
    apiBaseUrl: 'https://api.airtable.com/v0',
};

async function addTokenToFetchParams(fetchParams) {
    // ---- On l'ajoute en authorisation ----
    if (typeof(fetchParams) !== 'object') {
        fetchParams = {};
    }
    if (typeof(fetchParams.headers) !== 'object') {
        fetchParams.headers = {};
    }

    fetchParams.headers['Authorization'] = 'Bearer key0gq0zSNRdJGGd3' ;
    fetchParams.headers['Content-Type'] = 'application/json' ;

    return fetchParams;
}

async function apiFetch(apiPath, fetchParams, apiBaseUrl = config.apiBaseUrl) {
    try {
        // ---- Ajout du token dans le header ----
        fetchParams = await addTokenToFetchParams(fetchParams);
        // ---- Execution de la requete ----
        //alert(config.apiBaseUrl + apiPath, fetchParams);
        let response = await fetch(apiBaseUrl + apiPath, fetchParams)
            .catch((error) => {
                //console.log('catch dans le fetch');
                console.log(error);
            });

        // ---- Verification du code de retour ----
        if (response.status === '401') {
            // ---- Log ----
            console.log('Got 401 api.');
            //return null ;
            //throw new ExceptionAuth();
        }

        return response;
    } catch (error) {
        console.log(error);
        alert(JSON.stringify(error));
    }
}

async function parseResponse(response, syncCallback = null) {
    if (response !== null && response !== undefined) {
        try {
            let responseJson = await response.json();

            if (response.error === undefined && responseJson.error === undefined) {
                if (syncCallback != null) {
                    return syncCallback(responseJson);
                } else {
                    return responseJson;
                }
            } else if (response.status == '204') {
                return null;
            } else if(responseJson.error.code == 'E_BAD_TOKEN') {
                return responseJson.error.code
            }
        } catch (error) {
            return null;
        }
    }

    //throw new ExceptionReadable("Une erreur s'est produite dans l'API Airtable...");
}

export default { config, apiFetch, parseResponse };
