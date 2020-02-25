// Using filesystem module to read the file
var fs = require('fs');   
async function readFile(filepath) {
    //Reading the file using async Promise
    return new Promise((resolve, reject)=>{
        fs.readFile(filepath, "utf8", function read(err, data) {
            if (err) {
                throw err;
            } else 
                resolve(data)
        })
    })
}

// Parsing the raw content to packages
function parsePackages(content) {
    // Standardizing linebreaks for different operating systems
    // regEx => "\r\n" or "\r"
    let standardized = content.replace(/(\r\n|\r)/g,"\n")

    // Content is split to packages based on subsequent 'Package: ' and pushed to packageArr
    // regEx => " Positive lookahead for 'Package: ' + Anything between + Positive lookahead for 'Package: ' " 
    let packagesArr = standardized.split(/(?:(?=Package:))(?:[\s\S]*?)(?=Package:)/g)

    // Packages are sorted to alphabetical order
    packagesArr.sort()

    // Returning the array
    return packagesArr
}


// Parsing the individual data for every package
function parseData(packages) {
    
// RegEx for finding the next match based on control files syntax
// (?:\\n)*        = Non-capturing group for linebreak, 0 or more (Matches when no labels found, for example in the end of package)
// (?:([A-Z].*-)   = Non-capturing group, matches when capital letter found + any characters + 0 or more '-', for example Pre-Depends
// *[A-Z]\w+\:\s)  = Matches when capital letter + word + ':' + whitespace, for example 'Depends: '
let getFollowing = /(?:\\n)*(?:([A-Z].*-)*[A-Z]\w+\:\s)/g

// Declaring array that is being returned
let packageArr = [];
    
    // Map through packages
    packages.map((package, i) =>{

        // Create ID
        let id = i;

        // Detailed information is being parsed with String.prototype.parse function, followed by additional methods depending on needs
       
        // Get Name
        let name = package.parse("Package: ", getFollowing)
                          // Additional methods for name:
                          // Removing linebreaks
                          .replace(/(?:(?:\n..\n)|\n)/g,"")

        // Get Description  
        let description = package.parse("Description: ", getFollowing)
                          // Additional methods for description:
                          // Capitalizing the first letter
                          // Replacing control syntaxes ' . ' linebreaks, just for the looks
                          .capitalize()
                          .replace(/(?:\n..\n)/g, "\n\n")
      

        // Get Dependies
        rawDepends = package.parse("Depends: ", getFollowing)

        // Dependies are not always mandatory, so check whether the function returned a value
        // If true --> split by ',' + using replace with regEx to remove version numbers + trim values
        rawDepends ? depends = rawDepends.split(",")
                                .map(item =>{return item.replace(/(?:\(.*?\)+[,' ]*)|(?:,|$)/g, "")})
                                .map(item => {return item.trim()})
                    : depends = null

        //Pushing all the information from single package to an object and then pushing it to packageArr
        packageArr.push(
                    {
                        id: id,
                        name: name,
                        description: description,
                        depends: depends   
                    }
        )
    })
    // After every package have been parsed, function returns array full of objects
    return(packageArr)
}

// indexOf with Regex support
String.prototype.indexOfRegex = function(regex, fromIndex){
    // Optional 'fromIndex' --> if true, string is being cut, making it function like second parameter in method .indexOf()
    var str = fromIndex ? this.substring(fromIndex) : this;
    var match = str.match(regex);
    // Finds the first match and returns the index, if not found --> -1
    return match ? str.indexOf(match[0]) + fromIndex : -1;
  }

// Parse function
// First parameter is the wanted information (for example 'Package: '),
// Second parameter is regex, that defines the way string is being cut (in this app only 'getFollowing' is being used)
String.prototype.parse = function(word, regex){
    // Find startIndex by finding first match
    let startIndex = this.indexOf(word)
        // If found --> continue, else return with null
        if(startIndex !== -1){
            // Find endIndex using the indexOfRegex
            let endIndex = this.indexOfRegex(regex, startIndex+1)
              // If endIndex returns match, return substring with both parameters and cut the title off
              // else the package is the last string in the package, endIndex not needed
              if(endIndex>0){
                  return this.substring(startIndex, endIndex).slice(word.length)
              }   else return this.slice(startIndex).slice(word.length)
        } return null
    }

// First character to uppercase + slice lowercase
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

// Exported to server.js
module.exports = {
    readFile,
    parsePackages,
    parseData
}