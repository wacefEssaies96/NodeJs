console.log("debut")
setTimeout(() => {
    console.log("callback 1")
    setTimeout(() => {
        console.log("callback 2")
    }, 1000)
}, 2000)
console.log("fin")
console.log("debut 2")

// debut
// fin
// debut 2
// callback
// callback 2