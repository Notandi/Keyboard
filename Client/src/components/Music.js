var React = require('react');
var PropTypes = React.PropTypes;
import EventListener from 'react-event-listener';

function Music (props) {
  return (
    <div>
      <EventListener
          target="window"
          onKeyDown={(e) => props.onPlayNote(e)}
          onKeyUp={(e) => props.onReleaseNote(e)}
        />
      <button type='button' className='btn btn-lg btn-success'> play Music</button>
    </div>
  )
}

Music.propTypes = {
  onPlayNote: PropTypes.func.isRequired,
  onReleaseNote: PropTypes.func.isRequired,
}

module.exports = Music;
