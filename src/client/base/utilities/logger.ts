export function getLogger() {
  const log4javascript = require('log4javascript');
  let logger = log4javascript.getLogger();
  initAjaxAppender(logger);
  initPopUpAppender(logger);
  return logger;
}

function initAjaxAppender(logger) {
  const log4javascript = require('log4javascript');
  let protocol = (('https:' == document.location.protocol) ? 'https://' : 'http://');
  let host = location.host;
  let ajaxAppender = new log4javascript.AjaxAppender(`${protocol}${host}/api/log`);
  logger.addAppender(ajaxAppender);
}

function initPopUpAppender(logger) {
  const log4javascript = require('log4javascript');
  // Create a PopUpAppender with default options
  let popUpAppender = new log4javascript.PopUpAppender();

  // Change the desired configuration options
  popUpAppender.setFocusPopUp(true);
  popUpAppender.setNewestMessageAtTop(true);

  // Add the appender to the logger
  logger.addAppender(popUpAppender);
}
