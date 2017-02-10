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
      <div className="piano">
        <div className="key">
          <div className="black-key"></div>
        </div>
        <div className="key">
          <div className="black-key"></div>
        </div>
        <div className="key"></div>
        <div className="key">
          <div className="black-key"></div>
        </div>
        <div className="key">
          <div className="black-key"></div>
        </div>
        <div className="key">
          <div className="black-key"></div>
        </div>
        <div className="key"></div>
        <div className="key"></div>
      </div>
    </div>
  )
}

Music.propTypes = {
  onPlayNote: PropTypes.func.isRequired,
  onReleaseNote: PropTypes.func.isRequired,
}

module.exports = Music;
