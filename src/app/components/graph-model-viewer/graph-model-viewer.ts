import { Component, AfterViewInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import cytoscape, { Core, NodeSingular, EdgeSingular, ElementsDefinition } from 'cytoscape';
import tippy, { Instance as TippyInstance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

@Component({
  selector: 'app-graph-model-viewer',
  standalone: false,
  templateUrl: './graph-model-viewer.html',
  styleUrls: ['./graph-model-viewer.css']
})
export class GraphModelViewer implements AfterViewInit {

  @Input() elements: ElementsDefinition = { nodes: [], edges: [] };
  @Input() maxChatHistory: number = 50;

  @ViewChild('cyContainer', { static: true }) cyContainer!: ElementRef;
  @ViewChild('chatWindow') chatWindow!: ElementRef;

  chatMessages: { user: boolean, text: string }[] = [];
  userInput: string = '';
  private tippyInstances: TippyInstance[] = [];

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    const cy: Core = cytoscape({
      container: this.cyContainer.nativeElement,
      elements: this.elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(color)',
            'label': 'data(id)',
            'color': '#000',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': '80px',
            'height': '80px',
            'border-width': 2,
            'border-color': '#555',
            'shape': 'ellipse',
            'font-size': '14px',
            'text-wrap': 'wrap',
            'text-max-width': '70px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#888',
            'target-arrow-color': '#888',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(id)',
            'font-size': '12px',
            'color': '#555',
            'text-rotation': 'autorotate',
            'text-margin-y': -10
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: true,
        padding: 80,
        nodeRepulsion: 5000,
        idealEdgeLength: (edge: any) => 80 + (edge.data('id')?.length || 1) * 6,
        nodeDimensionsIncludeLabels: true
      },
      wheelSensitivity: 0.2,
      userZoomingEnabled: true,
      userPanningEnabled: true
    });

    setTimeout(() => {
      cy.resize();
      cy.layout({ name: 'cose', animate: true }).run();
    }, 150);

    const bbToClientRect = (bb: any): DOMRect => ({
      x: bb.x1, y: bb.y1, width: bb.w, height: bb.h,
      top: bb.y1, left: bb.x1, right: bb.x2, bottom: bb.y2,
      toJSON: () => ({ x: bb.x1, y: bb.y1, width: bb.w, height: bb.h })
    } as DOMRect);

    const safeProperties = (data: any) => {
      if (Array.isArray(data?.properties) && data.properties.length) {
        return `<ul style="margin:4px 0; padding-left:18px;">${data.properties.map((p: string) => `<li>${p}</li>`).join('')}</ul>`;
      }
      return "<i>No properties available</i>";
    };

    const createTooltip = (target: NodeSingular | EdgeSingular) => {
      const tip = tippy(document.body, {
        getReferenceClientRect: () => bbToClientRect(target.renderedBoundingBox()),
        allowHTML: true,
        trigger: 'manual',
        placement: 'top',
        interactive: true,
        theme: 'custom-tooltip',
        content: `
          <div style="
            padding: 10px;
            max-width: 220px;
            font-family: 'Inter', Arial, sans-serif;
            font-size: 13px;
            color: #222;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          ">
            <strong>${target.data('id')}</strong>
            ${safeProperties(target.data())}
          </div>
        `
      });

      target.on('click', () => {
        this.tippyInstances.forEach(t => t.hide());
        tip.show();
      });

      this.tippyInstances.push(tip);
    };

    cy.nodes().forEach(createTooltip);
    cy.edges().forEach(createTooltip);

    cy.on('tap', (event) => {
      if (event.target === cy) {
        this.tippyInstances.forEach(t => t.hide());
      }
    });

    // Default welcome chat message
    this.chatMessages.push({
      user: false,
      text: "Hello! I’m your Graph Query Assistant. Ask me anything about your data model."
    });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.chatMessages.push({ user: true, text: this.userInput });

    const question = this.userInput;
    this.userInput = '';

    const answer =
      `LLM will process your question: "${question}" using the graph’s meta-model to generate a Neptune query.`;

    this.chatMessages.push({ user: false, text: answer });

    if (this.chatMessages.length > this.maxChatHistory) {
      this.chatMessages = this.chatMessages.slice(-this.maxChatHistory);
    }

    setTimeout(() => {
      if (this.chatWindow) {
        const el = this.chatWindow.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
  }

  clearChat() {
    this.chatMessages = [];
  }
}
