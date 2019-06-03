const fs = require('fs');
const beautify = require('js-beautify').js;

module.exports = ({ schema, logging, destination, name }) => {
  if (logging) console.log(`API => CRUD => GET ${name}`);
  const { uppercase } = require('../utils');
  schema = require(schema); // eslint-disable-line
  const controllerSubFolder = `${destination}/controller/${name}`;
  const createFile = `${controllerSubFolder}/index.js`;

  const code = `
  const create${uppercase(name)} = require('./create');
  const get${uppercase(name)} = require('./get');
  const getOne${uppercase(name)} = require('./getOne');
  const update${uppercase(name)} = require('./update');
  const delete${uppercase(name)} = require('./delete');

  module.exports = {
    create${uppercase(name)},
    get${uppercase(name)},
    getOne${uppercase(name)},
    update${uppercase(name)},
    delete${uppercase(name)},
  };

  `;
  const pretty = beautify(code, { indent_size: 2, space_in_empty_paren: true });
  fs.writeFileSync(createFile, pretty);
};