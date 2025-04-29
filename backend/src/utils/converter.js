var myHeaders = new Headers();
myHeaders.append("apikey", "PWkgnrQRbWmpe1Zt4b5yLsMblR56ov0y");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

// fetch("https://api.apilayer.com/fixer/convert?to={to}&from={from}&amount={amount}", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


export const converter = async(from, to, amount) => {
    try {
        const response = await fetch(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
        const data = await response.json();
        //console.log(data.result);
        return data.result;
    } catch (error) {
        console.log(error);
    }
}