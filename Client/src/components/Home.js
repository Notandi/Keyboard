var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Home = React.createClass({
  render: function () {
    return (
      <div>
        <div className='jumbotron col-sm-12 text-center'>
          <h1>Keyboard</h1>
          <p className='lead'> “If I were not a physicist, I would probably be a musician. I often think in music. I live my daydreams in music. I see my life in terms of music.” ― Albert Einstein </p>
          <Link to='/playMusic'>
            <button type='button' className='btn btn-lg btn-success'>Make music</button>
          </Link>
        </div>
        <p>Velkominn á síðun key-board.herokuapp.com þessi síða var búinn til af Óskar Ólafssyni </p>
        <p> Hér er hægt að spila á virtual lyklaborð og leika sér með effect á því, þetta verkefni var unnið 9-12 Febrúar 2017  </p>
        <p>Þessi síða notast við <a href="https://tonejs.github.io/">Tone.js</a> frameworkið til þess að spila hljóð og gera effecta síðan sjálf notast líka við React á framendanum, síðan sjálf er aðalega framendi því ekki var neinn tilgangur fyrir því að hafa bakenda á henni</p>
      </div>
    )
  }
});

module.exports = Home;
