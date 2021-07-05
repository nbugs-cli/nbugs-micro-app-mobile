import React, { Component } from 'react';
import qs from 'qs';
import store from 'store2';
import styles from './index.less';

class BasicLayout extends Component {
  state = {
    authcenterIsReady: false,
  };

  constructor(props) {
    super(props);

    this.corpid = store.session('corpid') || qs.parse(window.location.search.slice(1)).corpid;
    store.session('corpid', this.corpid);
  }

  componentDidMount() {
    if (window.history.length === 1) {
      window.history.pushState({}, 'title', '#');
    }

    window.addEventListener('popstate', function() {
    }, false);

    if (store.session('authcenterIsReady') === null) {
      window.authcenter.ready(() => {
        store.session('authcenterIsReady', true);
        this.setState({ authcenterIsReady: true });
      });
    } else {
      this.setState({ authcenterIsReady: true });
    }

    if (store.session('isFirst') !== true) {
      store.session('isFirst', true);
    } else {
      store.session('isFirst', false);
    }
  }

  renderChildren = () => {
    const { children } = this.props;
    return (
      <div
        className="children-wrap"
      >
        {children}
      </div>
    );
  };

  render() {
    const { authcenterIsReady } = this.state;
    if (!authcenterIsReady) {
      return null;
    }

    return (
      <div className={styles.root}>
        {this.renderChildren()}
      </div>
    );
  }
}

export default BasicLayout;
