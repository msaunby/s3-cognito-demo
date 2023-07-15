import {s3url} from "./s3url.js";

// If the url ends ?get=/some/path then
// redirect to that path in the protected bucket
let query = window.location.search;
let params = new URLSearchParams(query);
let path = params.get('get');

s3url(path, async (url) => {
    document.location.replace(url);
});

