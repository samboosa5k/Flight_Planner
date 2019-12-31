/* 
    Date functionality for Flight Planner
    - Used module/encapsulation design pattern
*/

export const date = () => {
    const d = new Date(); 
    const day = d.getDate().toString();
    const month = (d.getMonth() +1).toString();
    const year = d.getFullYear().toString();

    const todayFormatted = `${day}-${month}-${year}`;
    const formatted = (inputDay, inputMonth, inputYear) => {
        return `${inputDay}-${inputMonth}-${inputYear}`
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

console.log(date().nrDaysInMonth(2,2008))