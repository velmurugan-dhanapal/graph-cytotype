import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-graph',
  standalone:false,
  templateUrl: './d3-graph.html',
  styleUrls: ['./d3-graph.css']
})
export class D3Graph implements OnInit {
  @ViewChild('graphContainer', { static: true }) graphContainer!: ElementRef;
  selectedNode: any = null;
  objectKeys = Object.keys;

  nodes = [
    { id: '1', name: 'Alice', type: 'Person', age: 30, city: 'New York' },
    { id: '2', name: 'Bob', type: 'Person', age: 40, country: 'USA' },
    { id: '3', name: 'Acme Corp', type: 'Company', industry: 'Tech', revenue: '1B' },
    { id: '4', name: 'Charlie', type: 'Person', hobby: 'Cycling', city: 'London' }
  ];

  links = [
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    { source: '3', target: '4' },
    { source: '1', target: '4' }
  ];

  ngOnInit(): void {
    this.createGraph();
  }

  createGraph(): void {
    const element = this.graphContainer.nativeElement;
    const width = 700;
    const height = 500;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const simulation = d3.forceSimulation(this.nodes as any)
      .force('link', d3.forceLink(this.links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(this.links)
      .enter().append('line')
      .attr('stroke', '#aaa')
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(this.nodes)
      .enter().append('circle')
      .attr('r', 15)
      .attr('fill', d => d.type === 'Company' ? 'orange' : 'steelblue')
      .on('click', (event, d) => this.selectedNode = d);

    // Fix for TS typing on drag
    (node as d3.Selection<SVGCircleElement, any, SVGGElement, unknown>)
      .call(d3.drag<SVGCircleElement, any>()
        .on('start', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    const label = svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(this.nodes)
      .enter().append('text')
      .text(d => d.name || d.id)
      .attr('font-size', 12)
      .attr('dx', 20)
      .attr('dy', 4);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });
  }
}
