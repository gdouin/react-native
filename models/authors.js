import React from 'react';
import ApiAirtableManager from "../utils/ApiAirtableManager";

export default async function getAuthors() {
    let offset = '' ;
    let authors = [];
    do {
        let tmp = await ApiAirtableManager.parseResponse(await ApiAirtableManager.apiFetch('/apprWNP5bkRqGyrMg/Auteurs'));
        tmp.records.forEach(r => authors.push(r));
        offset = (tmp.offset !== undefined) ? tmp.offset : ''
    } while (offset !== '');

    return authors;
}