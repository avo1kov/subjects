import React, { Component } from 'react';
import './App.css';

import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
import SpriteText from 'three-spritetext';
import data from './json_generator/data';

class App extends Component {
    constructor(props) {
        super(props);
        this.linkColors = [
            'rgba(201, 201, 201, 0.5)',
            'rgba(0, 255, 179, 0.5)',
            'rgba(0, 132, 255, 0.5)',
            'rgba(0, 26, 255, 0.5)'
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
              nodeLavel={"hello"}
              nodeAutoColorBy="group"
              nodeCanvasObject={(node, ctx, globalScale) => {
                  const label = node.id;
                  const fontSize = 4;
                  ctx.font = `${fontSize}px Sans-Serif`;
                  const textWidth = ctx.measureText(label).width;
                      const bckgDimensions = [10, fontSize].map(n => n + fontSize * 0.2); // some padding
                  // ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                  // ctx.fillStyle = "#000000";
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI);
                  // ctx.fill();
                  ctx.fill();
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillStyle = node.color;
                  ctx.fillText(label, node.x, node.y);
              }}
              linkLabel={link => `${link.source.id} ⟹ ${link.target.id} = ${link.value}`}
              linkWidth={link => this.widths[link.value]}
              linkColor={link => this.linkColors[Math.floor(link.value / 3)]}
              linkDirectionalArrowLength={link => this.widths[link.value]}
              linkDirectionalArrowRelPos={0.5}
              // linkDirectionalParticles={3}
              linkCurvature={1}
              cameraPosition={{x: 1000}}
          />
      );
  }
}

export default App;
