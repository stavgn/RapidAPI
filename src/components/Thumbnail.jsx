import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import './Thumbnail.css';

export class Thumbnail extends PureComponent {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired,
  }

  render() {
    const {
			hideSourceOnDrag,
			left,
			top,
			connectDragSource,
			isDragging,
		} = this.props;

    if (isDragging && hideSourceOnDrag) {
			return null;
		}

    return connectDragSource(
      <div className="thumbnail" style={{left, top}}>
        Drag Me
      </div>);
  }
}

const beginDrag = (props) => {
  const { left, top } = props;
  return {left, top};
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DragSource('Thumbnail', {beginDrag}, collect)(Thumbnail);
