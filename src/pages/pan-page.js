import { LitElement, html } from '@polymer/lit-element';
import { productIcon, companyIcon, rulerIcon, volumeIcon, mixIcon, sprayIcon, airIcon} from '../components/app-icons.js';

import '../components/cards/basic-card.js';
import '../components/layouts/nav-page-layout.js';
import '../components/layouts/title-detail-layout.js';
import '../components/layouts/input-graphic-layout.js';
import '../components/layouts/two-column-input-layout.js';
import '../components/layouts/page-button-layout.js';
import '../components/texts/page-main-title.js';
import '../components/texts/page-description.js';
import '../components/texts/page-section-title.js';
import '../components/texts/page-section-description.js';
import '../components/texts/page-section-subtitle.js';
import '../components/inputs/text-input.js';
import '../components/inputs/length-input.js';
import '../components/inputs/airflow-input.js';
import '../components/inputs/dropdown-input.js';
import '../components/texts/length-text.js';
import '../components/texts/description-text.js';
import '../components/texts/volume-text.js';
import '../components/buttons/next-page-button.js';
import '../components/buttons/last-page-button.js';
import '../components/pan-elements/pan-diameter-graphic.js';
import '../components/pan-elements/pan-depth-graphic.js';

const perforationOptions = ["", "Fully", "Partially", "Solid", "Other"];
const baffleOptions = ["", "Ploughshare", "Rabbit", "Helical", "Sharkfin", "Other"];
const gunOptions = ["", "Spraying System", "Schlick", "Freund", "Other"];


class PanPage extends LitElement {
  
  static get properties() {
    return {
      lengthUnits: String,
      dimensionsLine: String
    };
  }
  
  constructor() {
    super();
    this.lengthUnits = 'in';
  }
  _render({ lengthUnits, dimensionsLine }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        basic-card + basic-card {
          margin-top: 48px;
        }
        page-main-title,
        .page-description {
          color: var(--white-color);
        }
        
        title-detail-layout + title-detail-layout {
          border-top: 2px solid var(--border-color);
        }
        [hidden] {
          display: none;
        }
      </style>
      
      <nav-page-layout>
      
        <page-main-title slot='title'>Coating Equipment</page-main-title>
        
        <basic-card>
        
        <page-section-title>General Information</page-section-title>
          Coating pans come in different makes and models and each configured differently.
          Provide a description of the equipment and company for easy identifications.
        <page-section-description>
          
        </page-section-description>
      
      <two-column-input-layout>
      
        <page-section-subtitle title>${ productIcon } Make & Model</page-section-subtitle>
      
        <text-input 
          wide 
          label='Name' 
          path='pan.nickname'
          action='SET_PAN_NICKNAME'>
        </text-input>
          
        <text-input 
          label='Manufacturer' 
          path='pan.manufacturerName'
          action='SET_PAN_MANUFACTURER_NAME'>
        </text-input>
        
        <text-input 
          label='Formulation' 
          path='pan.modelName'
          action='SET_PAN_MODEL_NAME'>
        </text-input>
    </two-column-input-layout>
        
    <two-column-input-layout>
    
      <page-section-subtitle title>${ companyIcon } Company Information</page-section-subtitle>
      
      <text-input 
        label='Company' 
        path='pan.companyName'
        action='SET_PAN_COMPANY_NAME'>
      </text-input>
      
      <text-input 
        label='Location' 
        path='pan.companyLocation'
        action='SET_PAN_COMPANY_LOCATION'>
      </text-input>
      
      <text-input 
        label='Contact' 
        path='pan.contactName'
        action='SET_PAN_CONTACT_NAME'>
      </text-input>
      
      <text-input 
        label='Email' 
        path='pan.contactEmail'
        action='SET_PAN_CONTACT_EMAIL'>
      </text-input>
    </two-column-input-layout>
    
  </basic-card>
  
  <basic-card>
        
        <page-section-title>Coating Pan Dimensions</page-section-title>
        
        <page-section-description>
          Provide the following dimensions of the coating pan:
          <ul>
            <li><b>Drum Diameter - </b> The main diameter of the coating pan drum.</li>
            <li><b>Opening Diameter - </b> The diameter of the coating pan's opening.</li>
            <li><b>Brim Depth - </b> The length from the pan opening (ie brim) to the back wall.</li>
            <li><b>Wall Depth - </b> The length from front to back of the perforated pan wall.</li>
          </ul>
        </page-section-description>
        
        <input-graphic-layout>
        
        <page-section-subtitle title>${ rulerIcon } Pan Height</page-section-subtitle>
        
          <length-input
            label='Drum Diameter'
            path='pan.mainDiameter'
            action='SET_PAN_MAIN_DIAMETER'
              unit='${ lengthUnits }'
            on-click=${() => this.dimensionsLine = 'main'}
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
          </length-input>
          
          <length-input
            label='Opening Diameter'
            path='pan.openingDiameter'
            action='SET_PAN_OPENING_DIAMETER'
              unit='${ lengthUnits }'
            on-click=${() => this.dimensionsLine = 'opening'}
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
          </length-input>
          
          <pan-diameter-graphic line='${ dimensionsLine }' graphic></pan-diameter-graphic>
        
        </input-graphic-layout>
        
        <input-graphic-layout>
        
  
  
        
        <page-section-subtitle title>${ rulerIcon } Pan Depth</page-section-subtitle>
        
          <length-input
            label='Brim Depth'
            path='pan.brimWidth'
            action='SET_PAN_BRIM_WIDTH'
              unit='${ lengthUnits }'
            on-click=${() => this.dimensionsLine = 'brim'}
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
          </length-input>
          
          <length-input
            label='Wall Depth'
            path='pan.wallWidth'
            action='SET_PAN_WALL_WIDTH'
              unit='${ lengthUnits }'
            on-click=${() => this.dimensionsLine = 'wall'}
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
          </length-input>
          
          <pan-depth-graphic  line='${ dimensionsLine }' graphic></pan-depth-graphic>
        
        </input-graphic-layout>
  
  
  
  </basic-card>
  
          <basic-card>
        
        <page-section-title>Coating Pan Configuration</page-section-title>
        
        <page-section-description>
          Details on the spray guns, airflow and baffles which make this equipment unique 
          and can be used to provide guidance to optimize the process.
        </page-section-description>
      
      <two-column-input-layout>
      
        <page-section-subtitle title>${ airIcon } Airflow</page-section-subtitle>
      
            
            
      
          <text-input 
            label='Airflow Direction' 
            path='pan.airflowType'
            action='SET_PAN_AIRFLOW_TYPE'>
          </text-input>
            
            <dropdown-input 
              label='Perforation Type' 
              path='pan.perforationType'
              action='SET_PAN_PERFORATION_TYPE'
              options='${perforationOptions}'>
            </dropdown-input>
            
            <airflow-input 
              label='Max Airflow' 
              path='pan.maxAirflow'
              action='SET_PAN_MAX_AIRFLOW'
              unit='CFM'>
            </airflow-input>
      
      
    </two-column-input-layout>
        
    <two-column-input-layout>
    
      <page-section-subtitle title>${ mixIcon } Baffles</page-section-subtitle>
      
      
            
            <dropdown-input 
              label='Baffle Type' 
              path='pan.baffleType'
              action='SET_PAN_BAFFLE_TYPE'
              options='${baffleOptions}'>
            </dropdown-input>
            
            <unit-input 
              label='# of Baffles' 
              path='pan.baffleCount'
              action='SET_PAN_BAFFLE_COUNT'
              unit='baffles'
            _units='${ [{unit: 'baffles', text: 'baffles', multiplier: 1}] }'>
            </unit-input>
            
            <length-input 
              label='Baffle Height' 
              path='pan.baffleHeight'
              action='SET_PAN_BAFFLE_HEIGHT'
              unit='${ lengthUnits }'
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
            </length-input>
            
    </two-column-input-layout>
        
    <two-column-input-layout>
    
      <page-section-subtitle title>${ sprayIcon } Spray Guns</page-section-subtitle>
      
            <dropdown-input 
              label='Manufacturer' 
              path='pan.gunMake'
              action='SET_PAN_GUN_MAKE'
              options='${gunOptions}'>
            </dropdown-input>
            
            
      
          <text-input 
            label='Model' 
            path='pan.model'
            action='SET_PAN_GUN_MODEL'>
          </text-input>
      
          <unit-input 
            label='Gun Count' 
            path='pan.gunCount'
            action='SET_PAN_GUN_COUNT'
            unit='guns'
            _units='${ [{unit: 'guns', text: 'guns', multiplier: 1}] }'>
          </unit-input>
            
            <length-input 
              label='Gun to Gun Distance' 
              path='pan.gunToGunDistance'
              action='SET_PAN_GUN_DISTANCE'
              unit='${ lengthUnits }'
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
            </length-input>
    
    </two-column-input-layout>
  </basic-card>
  
  <basic-card>
          
          <page-section-title>Calculated Properties</page-section-title>
          
          <page-section-description>
            Coating pans are often desribed by the pan diameter but the pan 
            volume provides a better understanding of the pans capacity. The following
            volumes are predecited from the dimensions provided.Array
            
          <ul>
            <li><b>Brim - </b> The pan volume upto the brim and before tablets would fall out.</li>
            <li><b>Max - </b> To leave room for when the pans are tumbling the max working
            volume is calcualted as one inch from the brim.</li>
            <li><b>Min - </b> Low pan loads are known to have negative effect of tablet mixing,
            so the minimum working volume is calculated based on the baffle height. If baffle height
            info is not available this is based on a 70% fill.</li>
          </ul>
          </page-section-description>
          
          <title-detail-layout>
          
            <page-section-subtitle slot='title' >${ volumeIcon } Pan Volume</page-section-subtitle>
          
              <volume-text unit='l' path='pan.brimVolume' label='Brim Volume' ></volume-text>
              <volume-text unit='l' path='pan.maxFillVolume' label='Max Volume' ></volume-text>
              <volume-text unit='l' path='pan.minFillVolume' label='Min Volume' ></volume-text>
            
          </title-detail-layout>
          
          </basic-card>

          
  <page-button-layout>
  
    <last-page-button page='#tablet'>Tablet Core</last-page-button>
    <next-page-button page='#coating'>Coating Formula</next-page-button>
  
  </page-button-layout>
        
  
</nav-page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-page', PanPage);