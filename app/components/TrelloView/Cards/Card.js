import React from 'react';
import PropTypes from 'prop-types'
const propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

import galPng from './assets/images/gal.png';
import delPng from './assets/images/del.png';
import { connect } from 'react-redux';
import {getComments} from 'containers/App/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    lists: state.global.lists,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    getComments: (postId) => dispatch(getComments(postId)),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { style, item, getComments } = this.props;
    // <div className="item-name">{item.title}</div>

    return (
      <div style={style} onClick={() => getComments(item.id)} className="item" id={style ? item.id : null}>
        <div className="item-container">
          <div className="item-content">
            <div className="item-author">{item.title ? `${item.title}` : item.name}</div>
            <p>{item.body}</p>
          </div>
        </div>
      </div>
    );
  }
};

// <div className="item-perfomers">
//   <div className="add-perfomers">
//     <a href="#"><img src={galPng} alt="Add perfomers" /></a>
//     <div className="perfomer">
//       <img
//         src={`https://randomuser.me/api/portraits/thumb/men/${item.id + 1}.jpg`}
//         alt="Perfomer"
//       />
//     </div>
//     <div className="perfomer">
//       <img
//         src={`https://randomuser.me/api/portraits/thumb/men/${item.id + 2}.jpg`}
//         alt="Perfomer"
//       />
//     </div>
//     <div className="perfomer">
//       <img
//         src={`https://randomuser.me/api/portraits/thumb/men/${item.id + 3}.jpg`}
//         alt="Perfomer"
//       />
//     </div>
//   </div>
//   <div className="delete-perfomers">
//     <a href="#"><img src={delPng} alt="Delete perfomers" /></a>
//     <div className="perfomer">
//       <img
//         src={`https://randomuser.me/api/portraits/thumb/men/${item.id + 4}.jpg`}
//         alt="Perfomer"
//       />
//     </div>
//   </div>
// </div>
Card.propTypes = propTypes;
