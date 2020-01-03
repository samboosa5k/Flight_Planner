/* 
    Routes:
    - This file contains all routes to be used within this React project
    - 'Revealing Module design pattern'/encapsulation used for fun, even though a simple JSON would have worked fine :p
*/

export const routes = () => {
    const basename = "/projects/flight_planner";

    return { basename };
}

console.log(routes().basename)