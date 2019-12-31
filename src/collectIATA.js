/* 
    Collect IATA codes from Wikipedia

    DOMParser tip came from Stackoverflow: https://stackoverflow.com/questions/36631762/returning-html-with-fetch
*/
const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const url = "https://en.wikipedia.org/wiki/List_of_airports_by_IATA_code:_";

const collectHTML = async () => {
    const response = await fetch(url+alphabet[0]);
    const data = await response.text();

    return data;
}

const parseHTML = async (incoming) => {
    const data = await incoming;
    const parser = new DOMParser;
    const doc = parser.parseFromString(data, "text/html");
    const allRows = doc.querySelectorAll('tr td:first-child');

    for(let i = 0; i<256; i++){
        console.log('parseHTML', allRows[i].innerHTML);
    }
}

parseHTML(collectHTML());
// collectIATA();