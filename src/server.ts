//server.js
const appt = require('./appt');
appt.listen(5678, () => {
    console.log('Example app listening on port 5678!');
});
