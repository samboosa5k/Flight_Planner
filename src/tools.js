/* 
    Date functionality for Flight Planner
    - Used Revealing module/encapsulation design pattern
*/

export const date = () => {
    const d = (t) => { 
        if(t){
            return new Date(t*10) ;
        } else {
            return new Date();
        }
    }; 
    const day = d().getDate().toString();
    const month = (d().getMonth() +1).toString();
    const year = d().getFullYear().toString();

    //  Date related
    const todayFormatted = `${day}/${month}/${year}`;
    const formatted = (inputDay, inputMonth, inputYear) => {
        return `${inputDay}/${inputMonth}/${inputYear}`
    }

    //  Time related
    const timeFromUnix = (t) => {
        const hours = (d(t).getHours().toString().length === 1) ? '0' + d(t).getHours() : d(t).getHours();
        const minutes = (d(t).getMinutes().toString().length === 1) ? '0' + d(t).getMinutes() : d(t).getMinutes();
        return `${hours}:${minutes}`;
    }

    return {
        d,
        day,
        month,
        year,
        todayFormatted,
        formatted,
        timeFromUnix
    }
}

/* 
    Url builder for Flight Planner
    - Needed to create a query string for KIWI api
    - base = the base url
    - paramValArray = array of objects, consisting of parameter name & value
*/

export const urlBuilder = () => {
    const buildQueryString = (paramValArray) => {
        let query = '?';
        paramValArray.forEach((arr,index)=>{
            const amp = (index+1 === paramValArray.length) ? '' : '&';
            query += `${arr[0]}=${arr[1]}${amp}`;
        })
        return query;
    }

    const construct = (base, paramValArray) => {
        return base + buildQueryString(paramValArray);
    }

    return {construct}
}
