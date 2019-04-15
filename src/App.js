import React, { Component } from 'react';
import './App.css';

import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import data from './json_generator/data';

const distance = 1000;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.fg.cameraPosition({ x: distance });

        let angle = 0;
        setInterval(() => {
            this.fg.cameraPosition({
                x: distance * Math.sin(angle),
            });
            angle += Math.PI / 300;
        }, 10);
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
              linkLabel={"value"}
              linkWidth={node => node.value}
              linkAutoColorBy={"value"}
              linkDirectionalArrowLength={node => node.value * 2}
              linkDirectionalArrowRelPos={0.5}
              // linkDirectionalParticles={3}
              linkCurvature={0.5}
              cameraPosition={{x: 1000}}
          />
      );
  }
}

export default App;
