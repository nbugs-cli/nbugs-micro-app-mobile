import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = () => (
  <ContentLoader height={90} width={300} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="10" y="10" rx="3" ry="3" width="70" height="10" />
    <rect x="90" y="10" rx="3" ry="3" width="100" height="10" />
    <rect x="200" y="10" rx="3" ry="3" width="10" height="10" />
    <rect x="25" y="30" rx="3" ry="3" width="130" height="10" />
    <rect x="165" y="30" rx="3" ry="3" width="130" height="10" />
    <rect x="25" y="50" rx="3" ry="3" width="90" height="10" />
    <rect x="125" y="50" rx="3" ry="3" width="60" height="10" />
    <rect x="195" y="50" rx="3" ry="3" width="60" height="10" />
    <rect x="10" y="70" rx="3" ry="3" width="30" height="10" />
  </ContentLoader>
);

export default () => {
  return (
    <section>
      <Loader />
      <Loader />
      <Loader />
    </section>
  );
};
