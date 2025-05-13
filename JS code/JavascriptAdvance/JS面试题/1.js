console.log("1");//1 1

setTimeout(() => {
  console.log("2");//8 2
  Promise.resolve()
    .then(() => {
      console.log("3");//9 3
      return new Promise((resolve) => {
        console.log("4");//10 4
        //h5
        setTimeout(() => {
          console.log("5");//22 5
          resolve("6");
        }, 40);
      });
    })
    .then((res) => {
      console.log(res);//23 6
      //h7
      setTimeout(() => {
        console.log("7");//26 7
      }, 0);
    });
}, 0);

Promise.reject("8")
  .catch((err) => {
    console.log(err);//5 8
    return "9";
  })
  .then(async (res) => {
    console.log(res);//6 9
    await Promise.resolve()
      .then(() => {
        console.log("10");//7 10
        return new Promise((resolve) => {
          //h4
          setTimeout(() => {
            console.log("11");//18 11
            resolve("12");
          }, 30);
        });
      })
      .then((res) => {
        console.log(res);//19 12
      });
    console.log("13");//20 13
  })
  .finally(() => {
    console.log("14");//21 14
  });

(async () => {
  console.log("15");//2 15
  await new Promise((resolve) => {
    console.log("16");//3 16
    //h2
    setTimeout(() => {
      console.log("17");//11 17
      resolve();
    }, 20);
  });
  console.log("18");//12 18
})();

//h3
setTimeout(() => {
  console.log("19");//13 19
  Promise.resolve()
    .then(() => {
      console.log("20");//14 20
      return Promise.reject("21");
    })
    .catch((err) => {
      console.log(err);//15 21
      return "22";
    })
    .then((res) => {
      console.log(res);//16 22
      return new Promise((resolve) => {
        console.log("23");//17 23
        //h6
        setTimeout(() => {
          console.log("24");//24 24
          resolve("25");
        }, 10);
      });
    })
    .then((res) => {
      console.log(res);//25 25
    });
}, 10);

console.log("26");//4 26