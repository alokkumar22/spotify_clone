// import React from "react";
// import Tile from "../tile/Tile";
// import classes from "./TilesRenderer.module.css";
// import _ from 'lodash'

// const TilesRenderer = (props) => {
//   const renderFn = () => {
//     return props.data.map((item) => {
//       return (
//         <Tile
//           goToRouteOnImageClick={`${props.goToRouteOnImageClick}/${(_.compact([_.get(item, 'id'), _.get(item, 'album.id'), _.get(item, 'track.album.id')]))[0]}`}
//           key={item.id}
//           item={item}
//           //  type={props.type}
//           avatarShape={props.avatarShape}
//         />
//       );
//     });
//   };

//   return <div className={classes.TilesRenderer}>{renderFn()}</div>;
// };
// export default TilesRenderer;
import React from "react";
import Tile from "../tile/Tile";
import classes from "./TilesRenderer.module.css";
import _ from "lodash";

const TilesRenderer = (props) => {
  return (
    <div className={classes.TilesRenderer}>
      {props.data.map((item) => {
        return (
          <Tile
            goToRouteOnImageClick={`${props.goToRouteOnImageClick}/${
              _.compact([_.get(item, "id"), _.get(item, "album.id"),  _.get(item, "track.album.id")])[0]
            }`}
            key={item.id}
            item={item}
            avatarShape={props.avatarShape}
          />
        );
      })}
    </div>
  );
};
export default TilesRenderer;
