const helloWorld = (req,res) => {
    res.send("Hello, World");
    res.end();
}

module.export = {
    helloWorld
}