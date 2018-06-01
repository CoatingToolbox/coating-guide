
import { LitElement, html } from '@polymer/lit-element';
import './nav-item.js';
import './nav-icon.js';
import './nav-section.js';

class NavDrawer extends LitElement{
  
  static get properties() {
    return {
      _isOpen: Boolean
    };
  }
  
  _shouldRender(props, changedProps, old) {
    // return props._isOpen;
    return true;
  }
  
  _render () {
    return html`
    
    <style>
      :host {
        display: block;
        min-width: 224px;
        color: var(--white-color);
      }
    </style>
    
      <nav-item link='/#overview' label='Overview'></nav-item>
  
      <nav-section label='Materials & Equipment'></nav-section>
      
      <nav-item link='/#tablet' label='Tablet' sub-item>
        <nav-icon link='/tablet-library' icon='app-icons:library'></nav-icon>
      </nav-item>
      
      <nav-item link='/pan-overview' label='Pan' sub-item>
        <nav-icon link='/pan-designer' icon='app-icons:edit'></nav-icon>
        <nav-icon link='/pan-library' icon='app-icons:library'></nav-icon>
      </nav-item>
      
      <nav-item link='/coating-overview' label='Coating' sub-item>
        <nav-icon link='/coating-designer' icon='app-icons:edit'></nav-icon>
        <nav-icon link='/coating-library' icon='app-icons:library'></nav-icon>
      </nav-item>
        
      <nav-section label='Trial Setup'></nav-section>
      <nav-item link='/' label='Coating Amount' sub-item></nav-item>
      <nav-item link='/' label='Disperson' sub-item></nav-item>
      <nav-item link='/' label='Batch Size' sub-item></nav-item>
      
      <nav-item link='#/' label='Process Parameters'></nav-item>
      
    `;
  }
}


customElements.define('nav-drawer', NavDrawer);