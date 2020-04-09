const http_function = async (req, res) => {
    res.send('Hello, World');
}

const background_function = async (event, context) => {
    console.log('Hello, World');
}

module.exports = {
    http_function,
    background_function
}