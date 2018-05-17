const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./bundleLoader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

app.use('/restaurants', express.static(path.join(__dirname, 'public')));

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    const sidebar = require(path.join(__dirname, '/templates/services/app-server.js')).default;
    const component = React.createElement(sidebar, props);
    return ReactDom.renderToString(component);
  });
};

app.get('/restaurants/:id', function (req, res) {
  const components = renderComponents(services, { itemID: req.params.id });
  res.end(Layout(
    'Apateez',
    App(components[0]),
    // App(...components),
    Scripts(Object.keys(services), { restaurantId: req.params.id, isModal: true, })
  ));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
