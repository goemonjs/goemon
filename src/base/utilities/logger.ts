import log4js from 'log4js';
import { isTestMode, isDevMode, isProductionMode } from './debug';

export const logger = log4js.getLogger();
if (isProductionMode) {
  logger.level = 'info';
} else if (isDevMode) {
  logger.level = 'debug';
} else if (isTestMode()) {
  logger.level = 'warn';
}
