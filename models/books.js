import React from 'react';
import ApiAirtableManager from "../utils/ApiAirtableManager";

export default async function getBooks() {
    let offset = '' ;
    let books = [];
    do {
        let tmp = await ApiAirtableManager.parseResponse(await ApiAirtableManager.apiFetch('/apprWNP5bkRqGyrMg/Livres'));
        tmp.records.forEach(r => books.push(r));
        offset = (tmp.offset !== undefined) ? tmp.offset : ''
    } while (offset !== '');

    return books;
}
