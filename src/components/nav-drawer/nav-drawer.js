
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
        color: var(--white-color);
      }
    </style>
    
      <nav-item link='/#overview' label='Overview'></nav-item>
  
      <nav-section label='Materials & Equipment'></nav-section>
      <nav-item link='/#tablet' label='Tablet Core' sub-item></nav-item>
      <nav-item link='/#pan' label='Coating Equipment' sub-item></nav-item>
      <nav-item link='/#coating' label='Coating Formula' sub-item></nav-item>
        
      <nav-section label='Trial Setup'></nav-section>
      <nav-item link='/' label='Coating Amount' sub-item></nav-item>
      <nav-item link='/' label='Dispersion' sub-item></nav-item>
      <nav-item link='/' label='Batch Size' sub-item></nav-item>
      
      <nav-item link='#/' label='Process Parameters'></nav-item>
      
    `;
  }
}


customElements.define('nav-drawer', NavDrawer);