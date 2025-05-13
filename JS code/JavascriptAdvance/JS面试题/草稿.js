setTimeout(() => {
    console.log('1');
},30);

(async () => {
    console.log('2');
    await new Promise((resolve) => {
        console.log('3');
        setTimeout(() => {
            console.log('4')
            resolve('5');
        }, 10)
    })
    .then((res) => {
        console.log(res);
    });

})();

setTimeout(() => {
    console.log('6');
},20)