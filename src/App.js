import React, { Component } from 'react';
import './App.css';

import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import data from './json_generator/data';

class App extends Component {
    constructor(props) {
        super(props);
        this.colors = [
            '#b8b8b8',
            '#00ffb3',
            '#0084ff',
            'rgba(127, 0, 255, 0.62, 0.5)'
        ];
        this.widths = [0, 1, 1, 1, 2, 2, 2, 2, 2, 5, 5];

    }

    componentDidMount() {
        this.fg.zoom(5);
    }

    render() {
      return (
          <ForceGraph2D
              ref={el => { this.fg = el; }}
              graphData={data}
              linkSource={"source"}
              linkTarget={"target"}
              nodeAutoColorBy="group"
              nodeThreeObject={node => {
                  const sprite = new SpriteText(node.id);
                  sprite.color = node.color;
                  sprite.textHeight = 1;
                  return sprite;
              }}
              linkLabel={link => link.value + ', ' + Math.floor(link.value / 3)}
              linkWidth={link => this.widths[link.value]}
              linkColor={link => this.colors[Math.floor(link.value / 3)]}
              linkDirectionalArrowLength={link => link.value * 0.5}
              linkDirectionalArrowRelPos={0.5}
              // linkDirectionalParticles={3}
              linkCurvature={0.5}
              cameraPosition={{x: 1000}}
          />
      );
  }
}

export default App;
