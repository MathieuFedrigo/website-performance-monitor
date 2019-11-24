module.exports = (screen, websiteCount, pageIndex, selectWebsiteFunction) => {
  screen.key(['escape', 'q', 'C-c'], () => {
    return process.exit(0);
  });

  screen.key(['left', 'up'], () => {
    pageIndex-= 0.5;
    if (pageIndex === -1) pageIndex = websiteCount - 1;
    selectWebsiteFunction(Math.max(Math.floor(pageIndex), 0));
  });

  screen.key(['right', 'down'], () => {
    pageIndex+=0.5;
    if (pageIndex === websiteCount) pageIndex = 0;
    selectWebsiteFunction(Math.floor(pageIndex));
  });
};
