import { parse } from 'qs';
import reLogin from '../src/utils/utils.js';

export default props => {
  const { children } = props;
  const params = parse(window.location.search.replace('?', ''));
  const isRenderChildren = reLogin({ params });
  if (isRenderChildren !== false) {
    return children;
  } else {
    return null;
  }
};
