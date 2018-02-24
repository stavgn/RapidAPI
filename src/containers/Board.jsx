import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, DropTarget } from 'react-dnd';
import Grid from 'material-ui/Grid';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { Thumbnail } from '../components';
import { saveDragValue } from '../actions';
import './Board.css';

class Board extends Component {

  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired
  }

  constructor(props){
    super(props);
    const THUMBNAIL_WIDTH = 70;
    this.state = {
      top: 300,
      left: ((window.innerWidth - THUMBNAIL_WIDTH) / 2)
    };
  }



  componentWillMount() {
    const { top, left } = this.props;
    if (top && left)
      this.setState({top, left});
  }

  moveBox = (top, left) => {
    this.setState({ left, top }, () => {
      this.props.saveDragValue(top, left);
    });
  }

  render() {
    const { connectDropTarget, height } = this.props;
    const { top, left } = this.state;
    return (
      <Grid container>
        <Grid item xs={12} className="board">
        {
        connectDropTarget(
          <div style={{height: height}}>
            <Thumbnail hideSourceOnDrag top={top} left={left}/>
          </div>)
        }
        </Grid>
      </Grid>
    );
  }
}

const boxTarget = {
	drop(props, monitor, component) {
		const item = monitor.getItem();
		const delta = monitor.getDifferenceFromInitialOffset();
		const left = Math.round(item.left + delta.x);
		const top = Math.round(item.top + delta.y);
		component.moveBox(top, left);
	},
}

const collect = connect => ({	connectDropTarget: connect.dropTarget()});

const mapStateToProps = ({thumbnail: {top, left}}) => {
    return { top, left };
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveDragValue: bindActionCreators(saveDragValue, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(DropTarget('Thumbnail', boxTarget, collect)(Board))));
