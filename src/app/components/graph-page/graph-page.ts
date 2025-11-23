import { Component, OnInit } from '@angular/core';
import { ElementsDefinition } from 'cytoscape';

@Component({
  selector: 'app-graph-page',
  standalone: false,
  templateUrl: './graph-page.html',
  styleUrls: ['./graph-page.css']
})
export class GraphPage implements OnInit {
  elements: ElementsDefinition = { nodes: [], edges: [] };

  ngOnInit(): void {

    // Hash a string to a hex color
    const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // generate HSL color with lightness 70%
  const h = hash % 360;          // hue
  const s = 60 + (hash % 20);    // saturation 60-80%
  const l = 70;                  // lightness 70% ensures pastel color

  return `hsl(${h}, ${s}%, ${l}%)`;
};


    this.elements = {
      nodes: [
        { data: { id: 'Person', properties: ['name', 'age', 'email'] } },
        { data: { id: 'Project', properties: ['title', 'budget', 'deadline'] } },
        { data: { id: 'Company', properties: ['name', 'industry', 'location'] } },
        { data: { id: 'Department', properties: ['name', 'floor', 'manager'] } },
        { data: { id: 'Task', properties: ['title', 'status', 'priority'] } },
        { data: { id: 'Client', properties: ['name', 'contact', 'industry'] } },
        { data: { id: 'Invoice', properties: ['amount', 'dueDate', 'status'] } },
        { data: { id: 'Contract', properties: ['startDate', 'endDate', 'terms'] } },
        { data: { id: 'Location', properties: ['city', 'country', 'zipcode'] } },
        { data: { id: 'Asset', properties: ['type', 'value', 'serialNumber'] } },
        { data: { id: 'Supplier', properties: ['name', 'rating', 'contact'] } },
        { data: { id: 'Product', properties: ['name', 'category', 'price'] } },
        { data: { id: 'Shipment', properties: ['date', 'status', 'trackingNumber'] } },
        { data: { id: 'Inventory', properties: ['quantity', 'location'] } },
        { data: { id: 'Payment', properties: ['amount', 'method', 'date'] } },
        { data: { id: 'Ticket', properties: ['issue', 'priority', 'status'] } },
        { data: { id: 'Event', properties: ['title', 'date', 'location'] } },
        { data: { id: 'Meeting', properties: ['topic', 'time', 'participants'] } },
        { data: { id: 'Role', properties: ['name', 'permissions'] } },
        { data: { id: 'Team', properties: ['name', 'lead', 'members'] } }
      ].map(node => ({
        data: { 
          ...node.data,
          color: stringToColor(node.data.id) // dynamically assign color
        }
      })),
      edges: [
        { data: { id: 'RAISED_BY', source: 'Ticket', target: 'Person', properties: ['date'] } },
        { data: { id: 'FOR_PROJECT', source: 'Ticket', target: 'Project', properties: ['priority'] } },
        { data: { id: 'ASSIGNED_TO', source: 'Ticket', target: 'Person', properties: ['assignedDate'] } },
        { data: { id: 'RELATED_TO_TASK', source: 'Ticket', target: 'Task', properties: [] } },
        { data: { id: 'WORKS_ON', source: 'Person', target: 'Project', properties: ['role', 'since'] } },
        { data: { id: 'MANAGES', source: 'Person', target: 'Department', properties: ['since'] } },
        { data: { id: 'BELONGS_TO', source: 'Department', target: 'Company', properties: [] } },
        { data: { id: 'LOCATED_AT', source: 'Company', target: 'Location', properties: ['address'] } },
        { data: { id: 'ASSIGNED', source: 'Task', target: 'Person', properties: ['deadline', 'priority'] } },
        { data: { id: 'PART_OF', source: 'Task', target: 'Project', properties: ['phase'] } },
        { data: { id: 'HAS_CLIENT', source: 'Company', target: 'Client', properties: ['since'] } },
        { data: { id: 'BILLED', source: 'Invoice', target: 'Client', properties: ['amount', 'status'] } },
        { data: { id: 'PAID_BY', source: 'Payment', target: 'Client', properties: ['amount'] } },
        { data: { id: 'SIGN_CONTRACT', source: 'Contract', target: 'Client', properties: ['startDate', 'endDate'] } },
        { data: { id: 'OWNS', source: 'Company', target: 'Asset', properties: ['purchaseDate'] } },
        { data: { id: 'SUPPLIES', source: 'Supplier', target: 'Product', properties: ['since'] } },
        { data: { id: 'DELIVERS', source: 'Shipment', target: 'Product', properties: ['quantity', 'date'] } },
        { data: { id: 'STOCKS', source: 'Inventory', target: 'Product', properties: ['quantity'] } },
        { data: { id: 'RELATED_TO_PROJECT', source: 'Product', target: 'Project', properties: ['usedIn'] } },
        { data: { id: 'PARTICIPATES_IN', source: 'Person', target: 'Team', properties: ['role'] } },
        { data: { id: 'LEADS', source: 'Person', target: 'Team', properties: [] } },
        { data: { id: 'HAS_ROLE', source: 'Person', target: 'Role', properties: ['permissions'] } },
        { data: { id: 'ORGANIZES', source: 'Team', target: 'Event', properties: [] } },
        { data: { id: 'SCHEDULED_FOR', source: 'Event', target: 'Meeting', properties: ['time'] } }
      ]
    };
  }
}
