import * as React from 'react';
import renderer from 'react-test-renderer';

import { UserContext, IContextProps } from '../../context/user-context';
import { AppContainer } from '../../base/react/app-container';
import { ErrorBoundary } from '../../base/react/error-boundary';
import i18n from '../../localization/i18n';

import { configureStore } from '../../stores/guest-store';
import { GuestTop } from '../guest-top';

describe('Guest Top Component Test', () => {
  beforeAll(() => {
    let mockWindow: any = window;
    mockWindow.scrollTo = (x, y) => {
      console.log(`Scroll to (${x}, ${y})`);
    };
  });

  const store = configureStore();
  const userContext: IContextProps = {
    userType: 'guest',
  };

  test('renders correctly in English', () => {
    const i18nInstance = i18n.cloneInstance();
    i18nInstance.changeLanguage('en');
    const tree = renderer.create(
      <ErrorBoundary>
        <AppContainer i18n={i18nInstance} store={store} context={userContext}>
          <GuestTop />
        </AppContainer>
      </ErrorBoundary>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly in Japanese', () => {
    const i18nInstance = i18n.cloneInstance();
    i18nInstance.changeLanguage('ja');
    const tree = renderer.create(
      <ErrorBoundary>
        <AppContainer i18n={i18nInstance} store={store} context={userContext}>
          <GuestTop />
        </AppContainer>
      </ErrorBoundary>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly in not supported language', () => {
    const i18nInstance = i18n.cloneInstance();
    i18nInstance.changeLanguage('fr');
    const tree = renderer.create(
      <ErrorBoundary>
        <AppContainer i18n={i18nInstance} store={store} context={userContext}>
          <GuestTop />
        </AppContainer>
      </ErrorBoundary>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
