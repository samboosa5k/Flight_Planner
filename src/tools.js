/* 
    Date functionality for Flight Planner
    - Used Revealing module/encapsulation design pattern
*/

export const date = () => {
    const d = new Date(); 
    const day = d.getDate().toString();
    const month = (d.getMonth() +1).toString();
    const year = d.getFullYear().toString();

    const todayFormatted = `${day}/${month}/${year}`;
    const formatted = (inputDay, inputMonth, inputYear) => {
        return `${inputDay}/${inputMonth}/${inputYear}`
    }
    const nrDaysInMonth = (inputMonth, inputYear) => {
        return new Date(inputYear, inputMonth, 0).getDate();
    }

    return {
        day,
        month,
        year,
        todayFormatted,
        formatted,
        nrDaysInMonth
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
        paramValArray.forEach((obj,index)=>{
            const amp = (index+1 === paramValArray.length) ? '' : '&';
            query += `${obj.key}=${obj.value}${amp}`;
        })
        return query;
    }

    const construct = (base, paramValArray) => {
        return base + buildQueryString(paramValArray);
    }

    return {construct}
}
