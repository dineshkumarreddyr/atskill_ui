import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Base from "./app/containers/Base";

import { IntlProvider } from "react-intl";

import AppLocale from "./lang/index";

class App extends Component {
  render() {
    const defaultLocale = "en";
    const currentAppLocale = AppLocale[defaultLocale];

    return (
      <Fragment>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <Fragment>
            <Switch>
              <Route path="/" component={Base} />
            </Switch>
          </Fragment>
        </IntlProvider>
      </Fragment>
    );
  }
}

export default App;
