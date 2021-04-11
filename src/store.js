import {setGlobal,addCallback} from "reactn";

addCallback((global) => {
    console.log('callback global: ', global)
});

setGlobal({
    accessToken: '',
    userInfo: null,
});
