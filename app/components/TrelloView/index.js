import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import {getLists, moveCard, moveList} from '../../containers/App/actions';
import { Button, Row, Col, Select, Table } from 'antd';
import axios from 'axios'
const Option = Select.Option;
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CardsContainer from './Cards/CardsContainer';
import CustomDragLayer from './CustomDragLayer';

function handleChange(value) {
  // console.log(`selected ${value}`);
}

function handleBlur() {
  // console.log('blur');
}

function handleFocus() {
  // console.log('focus');
}

import './index.css'

const mapStateToProps = (state, ownProps) => {
  return {
    lists: state.global.lists,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
    getLists: (quantity) => dispatch(getLists(quantity)),
    moveCard: (lastX, nextX) => dispatch(moveCard(lastX, nextX)),
    moveList: (lastX, lastY, nextX, nextY) => dispatch(moveList(lastX, lastY, nextX, nextY)),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class TrelloView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      page: 0,
      numberOfTopCoins: 100,
      pagination: {},
      loading: false,
      filteredInfo: null,
      sortedInfo: null,
    }
    props.getLists(10);
    this.moveCard = this.moveCard.bind(this);
    this.moveList = this.moveList.bind(this);
    this.findList = this.findList.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.stopScrolling = this.stopScrolling.bind(this);
    this.startScrolling = this.startScrolling.bind(this);
    this.state = { isScrolling: false };
  }

  componentDidMount() {
    // this.fetch();
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch = (params = {}) => {
    this.setState({ loading: true });
    // Optionally the request above could also be done as
    // console.log("fetch, limit", this.state.numberOfTopCoins, )
    axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          convert: 'EUR',
          start: 0,
          limit: this.state.numberOfTopCoins,
        }
      })
      .then((response) => {

          const pagination = { ...this.state.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          // pagination.total = 200;
          // this.props.setCoins(response.data)
          this.setState({
            loading: false,
            defaultData: response.data,
            data: response.data,
            pagination,
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  startScrolling(direction) {
    // if (!this.state.isScrolling) {
    switch (direction) {
      case 'toLeft':
        this.setState({ isScrolling: true }, this.scrollLeft());
        break;
      case 'toRight':
        this.setState({ isScrolling: true }, this.scrollRight());
        break;
      default:
        break;
    }
    // }
  }

  scrollRight() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft += 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  scrollLeft() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft -= 10;
    }
    this.scrollInterval = setInterval(scroll, 10);
  }

  stopScrolling() {
    this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
  }

  moveCard(lastX, lastY, nextX, nextY) {
    this.props.moveCard(lastX, lastY, nextX, nextY);
  }

  moveList(listId, nextX) {
    const { lastX } = this.findList(listId);
    this.props.moveList(lastX, nextX);
  }

  findList(id) {
    const { lists } = this.props;
    const list = lists.filter(l => l.id === id)[0];

    return {
      list,
      lastX: lists.indexOf(list)
    };
  }
  render() {
    const { lists } = this.props;
    console.log("props", this.props)
    return (
      <Row>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
          <CustomDragLayer snapToGrid={false} />
          { lists && lists.map((item, i) =>
            <CardsContainer
              key={item.id}
              id={item.id}
              item={item}
              moveCard={this.moveCard}
              moveList={this.moveList}
              startScrolling={this.startScrolling}
              stopScrolling={this.stopScrolling}
              isScrolling={this.state.isScrolling}
              x={i}
            />
          )}
        </Col>
      </Row>
    )
  }
}
TrelloView.propTypes = {
  getLists: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
}
