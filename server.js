'use strict';

const app = require('./server/init');
const port = process.env.PORT || 3000;

if (app.get('env') === 'test') return;
app.listen(port);
console.log('Express app started in ' + app.get('env') + ' mode on port ' + port);
