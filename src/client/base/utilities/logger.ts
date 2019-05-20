import log4javascript from 'log4javascript';
export const logger = log4javascript.getLogger();

// Create the logger
let log = log4javascript.getLogger();

initAjaxAppender();
// initPopUpAppender();

function initAjaxAppender() {
  let protocol = (('https:' == document.location.protocol) ? 'https://' : 'http://');
  let host = location.host;
  let ajaxAppender = new log4javascript.AjaxAppender(`${protocol}${host}/api/log`);
  log.addAppender(ajaxAppender);
}

function initPopUpAppender() {
  // Create a PopUpAppender with default options
  let popUpAppender = new log4javascript.PopUpAppender();

  // Change the desired configuration options
  popUpAppender.setFocusPopUp(true);
  popUpAppender.setNewestMessageAtTop(true);

  // Add the appender to the logger
  log.addAppender(popUpAppender);
}
