function isOdd(numArray) {
    oddArray = []
    numArray.forEach(num => {
        if (num % 2 != 0) {
            oddArray.push(num)
        }
    })
    console.log(oddArray)
}

//console.log("isOdd function result of isOdd([1,2,3,4,5,6,7,8,9,10]) - ")
//isOdd([1,2,3,4,5,6,7,8,9,10])

function numberPadding(num) {
    padArray = []
    for (i = 1; i <= num; i++) {
        let pad = i.toString().padStart(3, '0')
        padArray.push(pad)
    }
    console.log(padArray)
}
//console.log("numberPadding function result for 100")
//numberPadding(100)
    
function eatAQueue(array) {
    while (array.length > 0) {
        console.log(array.pop())
    }
}

//console.log("isOdd function result of eatAQueue([1,2,3,4,5,6,7,8,9,10]) - ")
//eatAQueue([1,2,3,4,5,6,7,8,9,10])

function textChunker(text) {
    chunkArray = []
    let i = 0
    while (i < text.length) {
    chunkArray.push(text.slice(i, i+8).padEnd(8, '-'))
    i +=8
    }
    console.log(chunkArray)
}

//console.log("textChunker function result")
//textChunker("This is the story all about how my life got flipped, turned upside down")

function zipper(array1, array2) {
    zipArray = []
    while (array1.length > 0) {
        zipArray.push(array1.shift())
        zipArray.push(array2.shift())
    }
    console.log(zipArray)
}
//console.log("zipper function result")
//zipper([1,2,3,4],['a','b','c','d'])