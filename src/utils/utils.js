const objIsNull = (obj) => {
    if(obj === null) return true;
    
    let numKeys = 0;
    let nullAttributes = 0;
    
    for (let key in obj) {
        numKeys++;
        if (obj[key] === null || obj[key] === "")
        nullAttributes++;
    }
    return numKeys === nullAttributes;
}

export {
    objIsNull
}