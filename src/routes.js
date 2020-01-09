/* 
    routes.js:
    - This file contains all 'routes' to be used within this React project
        - Routes are to be used to guide get-requests to specific React 'views'/'components'

    - 'Revealing Module design pattern'/encapsulation used for fun, even though a simple JSON would have worked fine :p
        - Fun way to create ~objects/storage of functions & variables, both private and public, without using classes
*/

//  ROUTES
export const routes = () => {
    const basename = '/projects/flight_planner';

    return { basename };
}

console.log('Route basename: ', routes().basename);