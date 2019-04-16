import React, { Component } from 'react';
import './App.css';
import arrowPNG from './arrow.png'

import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
// import SpriteText from 'three-spritetext';
import data from './json_generator/data';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseX: 0,
            mouseY: 0,
            linkValue: 0,
        };

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

        this.darkGroupColors = [
            '77, 163, 255',
            '14, 237, 48',
            '218, 143, 255',
            '255, 107, 99',
            '255, 181, 77',
            '207, 207, 207',
            '227, 208, 184',
        ];

        this.widths = [0, 1.8, 2, 2.2, 2.4, 2.6, 2.8, 3, 4, 4.5, 5];
        this.transparencies = [0, .07, .07, .07, .1, .1, .1, .1, .1, .3, .3];
        this.particles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2];
        this.particleSpeeds = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001, 0.002];
        this.particleWidths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1.4, 1.8];
    }

    componentDidMount() {
        this.fg.zoom(7);
    }

    // mouseHandler = evt => {
    //     this.setState({
    //         mouseX: evt.clientX,
    //         mouseY: evt.clientY,
    //         linkValue: 0,
    //     });
    // };
    //
    // linkHoverHandler = link => {
    //     if (link !== null) {
    //         this.setState({
    //             linkValue: link.value,
    //         })
    //     }
    // };

    render() {
      return (
          <div className="App">
              <ForceGraph2D
                  ref={el => { this.fg = el; }}
                  onNode
                  graphData={data}
                  nodeColor={node => `rgb(${this.groupColors[node.group]})`}
                  nodeRelSize={1.3}
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
                  linkLabel={link => {
                      return `<div class="describer">
                                <div class="source-vertex">
                                    <div class="vertex" style="background: rgb(${this.darkGroupColors[link.source.group]})"></div>
                                    <img src=${arrowPNG} alt="arrow" class="arrow">  
                                </div>
                                <div class="target-vertex">
                                    <div class="vertex" style="background: rgb(${this.darkGroupColors[link.target.group]})"></div>
                                </div>
                                <div class="source" style="color: rgb(${this.darkGroupColors[link.source.group]})">${link.source.id}</div>
                                <div class="target" style="color: rgb(${this.darkGroupColors[link.target.group]})">${link.target.id}</div>
                                <div class="value" style='color: white'>${link.value}<span class="value-of">/10</span></div>
                            </div>`;
                  }}
                  linkWidth={link => this.widths[link.value]}
                  // linkColor={link => this.linkColors[Math.floor(link.value / 3)]}
                  linkColor={link => `rgba(${this.groupColors[link.source.group]}, ${this.transparencies[link.value]})`}
                  linkDirectionalArrowLength={link => this.widths[link.value]}
                  linkDirectionalArrowRelPos={.5}
                  // linkDirectionalParticles={3}
                  linkCurvature={0.7}
                  cameraPosition={{x: 1000}}
                  linkDirectionalParticles={link => this.particles[link.value]}
                  linkDirectionalParticleSpeed={link => this.particleSpeeds[link.value]}
                  linkDirectionalParticleWidth={link => this.particleWidths[link.value]}
              />
          </div>
      );
  }
}

export default App;
