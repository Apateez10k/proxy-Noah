module.exports = (sidebar) => `
  <div id="app"></div>
  <div id="main-container">
    <div id="Sidebar"${sidebar}></div>
    <div id="sub-container">
      <div id="description"></div>
      <div id="reviews"></div>
    </div>
  </div>
  <div id="nearby-app"></div>
`;