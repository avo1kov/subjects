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
        this.groupColors = [
            '0, 122, 255',
            '40, 205, 65',
            '175, 82, 222',
            '255, 59, 48',
            '255, 149, 0',
            '142, 142, 147',
            '162, 132, 94',

        ];
        this.widths = [0, 1, 1, 1, 2, 2, 2, 2, 2, 5, 5];
        this.transparencies = [0, .07, .07, .07, .1, .1, .1, .1, .1, .3, .3];

    }

    componentDidMount() {
        this.fg.zoom(7);
    }

    render() {
      return (
          <ForceGraph2D
              ref={el => { this.fg = el; }}
              graphData={data}
              nodeLabel={"hello"}
              nodeColor={node => `rgb(${this.groupColors[node.group]})`}
              nodeCanvasObject={(node, ctx, globalScale) => {
                  const fontSize = 3;
                  ctx.font = `${fontSize}px Sans-Serif`;
                  const textWidth = ctx.measureText(node.id).width;
                  const bckgDimensions = [10, fontSize].map(n => n + fontSize * .2); // some padding
                  ctx.fillStyle = `rgb(${this.groupColors[node.group]})`;
                  ctx.strokeStyle = 'white';
                  ctx.lineWidth = 0.4;

                  ctx.beginPath();
                  ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.stroke();

                  ctx.textAlign = 'left';
                  ctx.textBaseline = 'middle';
                  ctx.fillStyle = node.color;
                  ctx.lineWidth = 0.7;
                  ctx.strokeText(node.id, node.x + 3, node.y);
                  ctx.fillText(node.id, node.x + 3, node.y);
              }}
              linkLabel={link => `${link.source.id} ⟹ ${link.target.id} = ${link.value}`}
              linkWidth={link => this.widths[link.value]}
              // linkColor={link => this.linkColors[Math.floor(link.value / 3)]}
              linkColor={link => `rgba(${this.groupColors[link.source.group]}, ${this.transparencies[link.value]})`}
              linkDirectionalArrowLength={link => this.widths[link.value]}
              linkDirectionalArrowRelPos={.5}
              // linkDirectionalParticles={3}
              linkCurvature={1}
              cameraPosition={{x: 1000}}
          />
      );
  }
}

export default App;
