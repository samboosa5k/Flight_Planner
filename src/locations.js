/* 
    locations.js:
    - This file contains all 'routes' and 'urls' to be used within this React project

    - 'Revealing Module design pattern'/encapsulation used for fun, even though a simple JSON would have worked fine :p
        - Fun way to create ~objects/storage of functions & variables, both private and public, without using classes
*/

//  ROUTES
export const routes = () => {
    const basename = '/projects/flight_planner';

    return { basename };
}

//  URLs/EXTERNAL
export const urls = () => {
    const kiwiBase = 'https://api.skypicker.com/flights?';

    return { kiwiBase };
}