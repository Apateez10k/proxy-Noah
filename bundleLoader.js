const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');
const path = require('path');

const exists = Promise.promisify(fs.stat);

const loadBundle = function (cache, item, filename) {
  filename = path.join(__dirname, filename.substring(1));
  // add a small delay to ensure pipe has closed
  setTimeout(() => {
    console.log('loading:', filename);
    cache[item] = require(filename).default;
  }, 0);
};

const fetchBundles = (path, services, suffix = '', require = false) => {
  Object.keys(services).forEach((item) => {

    const filename = `${path}/${item}${suffix}.js`;

    exists(filename)
      .then(() => {
        require ? loadBundle(services, item, filename) : null;
      })
      .catch((err) => {
        if (err.code === 'ENOENT') {
          const url = `${services[item]}${suffix}.js`;
          console.log(`Fetching: ${url}`);
          fetch(url)
            .then((res) => {
              const dest = fs.createWriteStream(filename);
              res.body.pipe(dest);
              res.body.on('end', () => {
                require ? loadBundle(services, item, filename) : null;
              });
            });
        } else {
          console.log('WARNING: Unknown fs error');
        }
      });
  });
};

module.exports = (clientPath, serverPath, services) => {
  fetchBundles(clientPath, services);
  fetchBundles(serverPath, services, '-server', true);

  const filename = `${__dirname}/public/style.css`;
  fetch('http://localhost:1337/style.css')
    .then((res) => {
      const dest = fs.createWriteStream(filename);
      res.body.pipe(dest);
      res.body.on('end', () => {
        console.log('success');
      });
    });

  return { app: services.app };
};
