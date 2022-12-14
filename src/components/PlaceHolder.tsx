import React from 'react';
import ContentLoader from 'react-content-loader';

const PlaceHolder: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="286" rx="15" ry="15" width="280" height="30" />
    <rect x="0" y="326" rx="10" ry="10" width="280" height="60" />
    <rect x="0" y="398" rx="15" ry="15" width="95" height="30" />
    <rect x="134" y="395" rx="20" ry="20" width="146" height="36" />
  </ContentLoader>
);

export default PlaceHolder;
