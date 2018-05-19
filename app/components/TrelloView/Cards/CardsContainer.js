import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { DropTarget, DragSource } from 'react-dnd';
import { Form, Input, Icon } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;

import Cards from './Cards';
import { connect } from 'react-redux';
import {searchLists, deleteComments} from 'containers/App/actions';

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  },
  endDrag(props) {
    props.stopScrolling();
  }
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
    if (!props.isScrolling) {
      if (window.innerWidth - monitor.getClientOffset().x < 200) {
        props.startScrolling('toRight');
      } else if (monitor.getClientOffset().x < 200) {
        props.startScrolling('toLeft');
      }
    } else {
      if (window.innerWidth - monitor.getClientOffset().x > 200 &&
          monitor.getClientOffset().x > 200
      ) {
        props.stopScrolling();
      }
    }
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      props.moveList(listId, props.x);
    }
  }
};


const mapStateToProps = (state, ownProps) => {
  return {
    lists: state.global.lists,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    searchLists: (value) => dispatch(searchLists(value)),
    deleteComments: (value) => dispatch(deleteComments(value)),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@DropTarget('list', listTarget, connectDragSource => ({
  connectDropTarget: connectDragSource.dropTarget(),
}))
@DragSource('list', listSource, (connectDragSource, monitor) => ({
  connectDragSource: connectDragSource.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class CardsContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool
  }

  render() {
    const { connectDropTarget, connectDragSource, item, x, moveCard, isDragging, searchLists, deleteComments } = this.props;
    const {
      getFieldDecorator,
      getFieldsError,
      setFieldsValue,
      getFieldsValue,
    } = this.props.form
    const opacity = isDragging ? 0.5 : 1;
    return connectDragSource(connectDropTarget(
      <div className="desk" style={{ opacity }}>
        <div className="desk-head" style={{display: 'flex', justifyContent: 'space-between'}}>
          <div className="desk-name" style={{fontSize: '20px', margin: '10px auto 0 8px' }}>{item.name}</div>
          {item.id !== 0 &&
            <Icon onClick={() => deleteComments(item.id)} style={{fontSize: '20px',  margin: '10px auto 0 8px', cursor: 'pointer'}} type="delete"/>
          }
        </div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('search', {
              initialValue: '',
              rules: [{ required: false, }],
            })(
              <Search
                placeholder="input search text"
                onSearch={value => searchLists(value)}
                onChange={() => searchLists(getFieldsValue().search)}
                enterButton
                style={{width: '243px', margin: '0 0 10px 15px' }}
              />
            )}
          </FormItem>
        </Form>
        <Cards
          moveCard={moveCard}
          x={x}
          listName={item.name}
          cards={item.cards}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
        />
      </div>
    ));
  }
}
CardsContainer = Form.create()(CardsContainer)
// class SearchInputForm extends React.Component {
//   render() {
//
//     return (
//
//     )
//   }
// }
