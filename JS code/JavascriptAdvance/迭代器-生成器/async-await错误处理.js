async function fetchData(){
    try {
        const respone = await fetch('https://api');
        const data = await respone.json();
        console.log(data);
    } catch(error){
        console.error('Error:',error.message);
    }
};

fetchData();