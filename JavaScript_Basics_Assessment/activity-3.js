const name = prompt("please enter your name");
if (name.length > 4) {
    alert("Your name is greater than four characters");
} else {
    alert("Your name is less than four characters");
    // Note that this is wrong if their name is equal to four characters
}