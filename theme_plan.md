let's proceed with the plan for implementing the theme system focusing on items: 1 (Matrix BG), 4 (Block Colors), 7 (App BG), 8 (Panel BG), 9 (Primary Text), 10  
(Secondary Text), 11 (Panel Borders).                                                                                                                                   

Execution Plan & Validation:                                                                                                                                            

 1 Define CSS Variable Names: We'll establish specific CSS variable names for the chosen themeable aspects.                                                             
    • --app-bg-color: Main background (Item 7)                                                                                                                          
    • --panel-bg-color: Side panel background (Item 8)                                                                                                                  
    • --matrix-bg-color: Game grid background (Item 1)                                                                                                                  
    • --primary-text-color: Main labels ("Score", "Level") (Item 9)                                                                                                     
    • --secondary-text-color: Score/level numbers (Item 10)                                                                                                             
    • --panel-border-color: Borders around panels/screen (Item 11)                                                                                                      
    • --block-color-i, --block-color-o, --block-color-t, --block-color-s, --block-color-z, --block-color-j, --block-color-l: Individual block colors (Item 4 - assuming 
      standard Tetris block types)                                                                                                                                      
    • Validation: Having clear, descriptive names makes the CSS easier to understand and maintain.                                                                      
 2 Set up Redux State Management: Configure Redux to store and update the currently selected theme name.                                                                
    • Add SET_THEME action type constant.                                                                                                                               
    • Create setTheme action creator.                                                                                                                                   
    • Create a new theme reducer to handle the state changes.                                                                                                           
    • Combine the theme reducer into the root reducer.                                                                                                                  
    • Validation: Follows standard Redux patterns already used in the project, ensuring consistency.                                                                    
 3 Implement Theme Persistence: Modify the store setup to save the selected theme to localStorage and load it on startup.                                               
    • Validation: Provides a better user experience by remembering their preference.                                                                                    
 4 Apply Theme Class Globally: Modify the main App component (src/containers/index.js) to:                                                                              
    • Read the current theme name from the Redux store.                                                                                                                 
    • Dynamically apply a class like theme-classic or theme-neon to its root element.                                                                                   
    • Import a base CSS file that will contain default variable definitions.                                                                                            
    • Validation: This is the standard mechanism for activating the correct set of CSS variables based on the selected theme.                                           
 5 Create Theme CSS Files: Create new CSS files for each theme (classic, neon, dark) and a base file.                                                                   
    • base.css: Define the CSS variables with default/fallback values.                                                                                                  
    • classic.css, neon.css, dark.css: Define .theme-classic, .theme-neon, .theme-dark classes, each overriding the base variables with theme-specific colors.          
    • Validation: Isolates theme styles logically and leverages CSS variable cascading.                                                                                 
 6 Update Component Styles (Using CSS Variables): Modify the relevant .less files (matrix/index.less, decorate/index.less, point/index.less, etc.) to use               
   var(--variable-name) instead of hardcoded colors/borders.                                                                                                            
    • Validation: This step makes the components theme-aware by referencing the variables provided by the active theme class. Requires the .less files.                 
 7 Create Theme Switcher UI: Implement a new React component that allows the user to select a theme, dispatching the setTheme action.                                   
    • Validation: Provides the necessary user interaction to change themes. Requires a new component file.                                                              

File Changes:                                                                                                                                                           

Here are the detailed changes for the files you've provided and descriptions for the new files needed:                                                                  

 1 src/unit/reducerType.js (Existing)                                                                                                                                   
    • Change: Add the SET_THEME constant.                                                                                                                               
                                                                                                                                                                        
   // ... (other constants)                                                                                                                                             
   export const FOCUS = 'FOCUS';                                                                                                                                        
   export const SET_THEME = 'SET_THEME'; // Add this line                                                                                                               
                                                                                                                                                                        
 2 src/actions/index.js (Existing)                                                                                                                                      
    • Change: Add the setTheme action creator.                                                                                                                          
                                                                                                                                                                        
   // ... (other imports)                                                                                                                                               
   import * as reducerType from '../unit/reducerType';                                                                                                                  
   // ... (other action creators)                                                                                                                                       
                                                                                                                                                                        
   function focus(data) {                                                                                                                                               
     return {                                                                                                                                                           
       type: reducerType.FOCUS,                                                                                                                                         
       data,                                                                                                                                                            
     };                                                                                                                                                                 
   }                                                                                                                                                                    
                                                                                                                                                                        
   // Add this function                                                                                                                                                 
   function setTheme(themeName) {                                                                                                                                       
     return {                                                                                                                                                           
       type: reducerType.SET_THEME,                                                                                                                                     
       data: themeName, // e.g., 'classic', 'neon', 'dark'                                                                                                              
     };                                                                                                                                                                 
   }                                                                                                                                                                    
                                                                                                                                                                        
   export default {                                                                                                                                                     
     // ... (existing exports)                                                                                                                                          
     music,                                                                                                                                                             
     focus,                                                                                                                                                             
     setTheme, // Add export here                                                                                                                                       
   };                                                                                                                                                                   
                                                                                                                                                                        
 3 src/reducers/theme/index.js (New File)                                                                                                                               
    • Content: Reducer for managing theme state.                                                                                                                        
                                                                                                                                                                        
   import * as reducerType from '../../unit/reducerType';                                                                                                               
                                                                                                                                                                        
   // Define the initial theme (e.g., 'classic')                                                                                                                        
   const initialState = 'classic';                                                                                                                                      
                                                                                                                                                                        
   const theme = (state = initialState, action) => {                                                                                                                    
     switch (action.type) {                                                                                                                                             
       case reducerType.SET_THEME:                                                                                                                                      
         return action.data; // Payload should be the new theme name (string)                                                                                           
       default:                                                                                                                                                         
         return state;                                                                                                                                                  
     }                                                                                                                                                                  
   };                                                                                                                                                                   
                                                                                                                                                                        
   export default theme;                                                                                                                                                
                                                                                                                                                                        
 4 src/reducers/index.js (Existing)                                                                                                                                     
    • Change: Import and combine the new theme reducer.                                                                                                                 
                                                                                                                                                                        
   import { combineReducers } from 'redux-immutable';                                                                                                                   
   // ... (other reducer imports)                                                                                                                                       
   import focus from './focus';                                                                                                                                         
   import theme from './theme'; // <-- Import the new reducer                                                                                                           
                                                                                                                                                                        
   const rootReducer = combineReducers({                                                                                                                                
     // ... (existing reducers)                                                                                                                                         
     keyboard,                                                                                                                                                          
     focus,                                                                                                                                                             
     theme, // <-- Add the theme reducer here                                                                                                                           
   });                                                                                                                                                                  
                                                                                                                                                                        
   export default rootReducer;                                                                                                                                          
                                                                                                                                                                        
 5 src/store/index.js (Existing)                                                                                                                                        
    • Change: Add logic to load/save theme state from/to localStorage.                                                                                                  
                                                                                                                                                                        
   import { createStore } from 'redux';                                                                                                                                 
   // Import Map if your reducers expect an Immutable structure for initial state                                                                                       
   // import { Map } from 'immutable';                                                                                                                                  
   import rootReducer from '../reducers';                                                                                                                               
                                                                                                                                                                        
   const THEME_STORAGE_KEY = 'tetrisTheme'; // Key for localStorage                                                                                                     
                                                                                                                                                                        
   // Function to load the theme from localStorage                                                                                                                      
   const loadThemeState = () => {                                                                                                                                       
     try {                                                                                                                                                              
       const serializedTheme = localStorage.getItem(THEME_STORAGE_KEY);                                                                                                 
       if (serializedTheme === null) {                                                                                                                                  
         return undefined; // Let reducer provide initial state ('classic')                                                                                             
       }                                                                                                                                                                
       // Return the state slice structure expected by the root reducer                                                                                                 
       return {                                                                                                                                                         
           theme: JSON.parse(serializedTheme)                                                                                                                           
       };                                                                                                                                                               
     } catch (err) {                                                                                                                                                    
       console.error("Could not load theme state", err);                                                                                                                
       return undefined;                                                                                                                                                
     }                                                                                                                                                                  
   };                                                                                                                                                                   
                                                                                                                                                                        
   // Function to save the theme to localStorage                                                                                                                        
   const saveThemeState = (state) => {                                                                                                                                  
     try {                                                                                                                                                              
       // Extract the theme state - adjust if using Immutable.js: state.get('theme')                                                                                    
       const themeToSave = state.theme;                                                                                                                                 
       const serializedTheme = JSON.stringify(themeToSave);                                                                                                             
       localStorage.setItem(THEME_STORAGE_KEY, serializedTheme);                                                                                                        
     } catch (err) {                                                                                                                                                    
       console.error("Could not save theme state", err);                                                                                                                
     }                                                                                                                                                                  
   };                                                                                                                                                                   
                                                                                                                                                                        
   const preloadedState = loadThemeState();                                                                                                                             
                                                                                                                                                                        
   const store = createStore(                                                                                                                                           
       rootReducer,                                                                                                                                                     
       preloadedState, // Pass the loaded state slice                                                                                                                   
       window.devToolsExtension && window.devToolsExtension()                                                                                                           
   );                                                                                                                                                                   
                                                                                                                                                                        
   // Subscribe to store changes to save the theme                                                                                                                      
   let currentTheme = store.getState().theme; // Adjust if using Immutable: store.getState().get('theme')                                                               
   store.subscribe(() => {                                                                                                                                              
       let previousTheme = currentTheme;                                                                                                                                
       // Adjust if using Immutable: currentTheme = store.getState().get('theme');                                                                                      
       currentTheme = store.getState().theme;                                                                                                                           
                                                                                                                                                                        
       if (previousTheme !== currentTheme) {                                                                                                                            
           saveThemeState({ theme: currentTheme });                                                                                                                     
       }                                                                                                                                                                
   });                                                                                                                                                                  
                                                                                                                                                                        
   export default store;                                                                                                                                                
                                                                                                                                                                        
   (Note: This persistence assumes the theme state is a simple string directly under the root. If using Immutable.js for the root state, access would be                
   state.get('theme') and preloadedState might need conversion to an Immutable Map).                                                                                    
 6 src/containers/index.js (Existing)                                                                                                                                   
    • Change: Import base CSS, connect to theme state, add propType, apply dynamic theme class.                                                                         
                                                                                                                                                                        
   import React from 'react';                                                                                                                                           
   import { connect } from 'react-redux';                                                                                                                               
   import classnames from 'classnames';                                                                                                                                 
   import propTypes from 'prop-types';                                                                                                                                  
                                                                                                                                                                        
   import style from './index.less';                                                                                                                                    
   import '../themes/base.css'; // <-- Import base theme CSS                                                                                                            
                                                                                                                                                                        
   // ... (other imports)                                                                                                                                               
                                                                                                                                                                        
   class App extends React.Component {                                                                                                                                  
     // ... (constructor, lifecycle methods remain the same)                                                                                                            
                                                                                                                                                                        
     render() {                                                                                                                                                         
       let filling = 0;                                                                                                                                                 
       const size = (() => {                                                                                                                                            
         // ... (size calculation remains the same)                                                                                                                     
         return css;                                                                                                                                                    
       })();                                                                                                                                                            
                                                                                                                                                                        
       // Get theme from props                                                                                                                                          
       const { theme } = this.props;                                                                                                                                    
       const themeClassName = `theme-${theme || 'classic'}`; // Ensure default if theme is somehow undefined initially                                                  
                                                                                                                                                                        
       return (                                                                                                                                                         
         <div                                                                                                                                                           
           // Apply the dynamic theme class alongside existing ones                                                                                                     
           className={classnames(style.app, themeClassName)}                                                                                                            
           style={size}                                                                                                                                                 
         >                                                                                                                                                              
           <div className={classnames({ [style.rect]: true, [style.drop]: this.props.drop })}>                                                                          
             {/* Pass theme down if Decorate needs it directly, or rely on CSS vars */}                                                                                 
             <Decorate />                                                                                                                                               
             <div className={style.screen}>                                                                                                                             
               <div className={style.panel}>                                                                                                                            
                 {/* Matrix will be styled via CSS vars */}                                                                                                             
                 <Matrix                                                                                                                                                
                   matrix={this.props.matrix}                                                                                                                           
                   cur={this.props.cur}                                                                                                                                 
                   reset={this.props.reset}                                                                                                                             
                 />                                                                                                                                                     
                 <Logo cur={!!this.props.cur} reset={this.props.reset} />                                                                                               
                 <div className={style.state}>                                                                                                                          
                   {/* Point, Number, Next will be styled via CSS vars */}                                                                                              
                   <Point cur={!!this.props.cur} point={this.props.points} max={this.props.max} />                                                                      
                   <p>{ this.props.cur ? i18n.cleans[lan] : i18n.startLine[lan] }</p>                                                                                   
                   <Number number={this.props.cur ? this.props.clearLines : this.props.startLines} />                                                                   
                   <p>{i18n.level[lan]}</p>                                                                                                                             
                   <Number                                                                                                                                              
                     number={this.props.cur ? this.props.speedRun : this.props.speedStart}                                                                              
                     length={1}                                                                                                                                         
                   />                                                                                                                                                   
                   <p>{i18n.next[lan]}</p>                                                                                                                              
                   <Next data={this.props.next} />                                                                                                                      
                   <div className={style.bottom}>                                                                                                                       
                     <Music data={this.props.music} />                                                                                                                  
                     <Pause data={this.props.pause} />                                                                                                                  
                     <Number time />                                                                                                                                    
                   </div>                                                                                                                                               
                 </div>                                                                                                                                                 
               </div>                                                                                                                                                   
             </div>                                                                                                                                                     
           </div>                                                                                                                                                       
           {/* ThemeSelector could go here */}                                                                                                                          
           {/* <ThemeSelector /> */}                                                                                                                                    
           <Keyboard filling={filling} keyboard={this.props.keyboard} />                                                                                                
           <Guide />                                                                                                                                                    
         </div>                                                                                                                                                         
       );                                                                                                                                                               
     }                                                                                                                                                                  
   }                                                                                                                                                                    
                                                                                                                                                                        
   App.propTypes = {                                                                                                                                                    
     // ... (existing propTypes)                                                                                                                                        
     keyboard: propTypes.object.isRequired,                                                                                                                             
     theme: propTypes.string.isRequired, // <-- Add theme propType                                                                                                      
   };                                                                                                                                                                   
                                                                                                                                                                        
   const mapStateToProps = (state) => ({                                                                                                                                
     // ... (existing mappings)                                                                                                                                         
     // Adjust if using Immutable.js: theme: state.get('theme'),                                                                                                        
     keyboard: state.get('keyboard'),                                                                                                                                   
     theme: state.theme, // <-- Map theme state to props                                                                                                                
   });                                                                                                                                                                  
                                                                                                                                                                        
   export default connect(mapStateToProps)(App);                                                                                                                        
                                                                                                                                                                        
 7 src/themes/base.css (New File)                                                                                                                                       
    • Content: Define CSS variables with default fallbacks.                                                                                                             
                                                                                                                                                                        
   /* Defines default variables. Theme files will override these. */                                                                                                    
   :root {                                                                                                                                                              
     --app-bg-color: #f0f0f0; /* Light grey */                                                                                                                          
     --panel-bg-color: #dcdcdc; /* Slightly darker grey */                                                                                                              
     --matrix-bg-color: #ffffff; /* White */                                                                                                                            
     --primary-text-color: #333333; /* Dark grey */                                                                                                                     
     --secondary-text-color: #000000; /* Black */                                                                                                                       
     --panel-border-color: #000000; /* Black */                                                                                                                         
                                                                                                                                                                        
     /* Default Block Colors (Example: Grayscale) */                                                                                                                    
     --block-color-i: #aaaaaa;                                                                                                                                          
     --block-color-o: #bbbbbb;                                                                                                                                          
     --block-color-t: #cccccc;                                                                                                                                          
     --block-color-s: #dddddd;                                                                                                                                          
     --block-color-z: #eeeeee;                                                                                                                                          
     --block-color-j: #999999;                                                                                                                                          
     --block-color-l: #888888;                                                                                                                                          
     --block-color-locked: #777777; /* Color for blocks in the matrix */                                                                                                
     --block-color-empty: #f8f8f8; /* Color for empty cells in matrix */                                                                                                
   }                                                                                                                                                                    
                                                                                                                                                                        
 8 src/themes/classic.css (New File)                                                                                                                                    
    • Content: Override variables for the 'classic' theme.                                                                                                              
                                                                                                                                                                        
   /* src/themes/classic.css */                                                                                                                                         
   .theme-classic {                                                                                                                                                     
     --app-bg-color: #e0e0e0;                                                                                                                                           
     --panel-bg-color: #c0c0c0;                                                                                                                                         
     --matrix-bg-color: #fafafa;                                                                                                                                        
     --primary-text-color: #111111;                                                                                                                                     
     --secondary-text-color: #000000;                                                                                                                                   
     --panel-border-color: #000000;                                                                                                                                     
                                                                                                                                                                        
      /* Classic Tetris Colors (Approximate) */                                                                                                                         
      --block-color-i: #00ffff; /* Cyan */                                                                                                                              
      --block-color-o: #ffff00; /* Yellow */                                                                                                                            
      --block-color-t: #aa00ff; /* Purple */                                                                                                                            
      --block-color-s: #00ff00; /* Green */                                                                                                                             
      --block-color-z: #ff0000; /* Red */                                                                                                                               
      --block-color-j: #0000ff; /* Blue */                                                                                                                              
      --block-color-l: #ffaa00; /* Orange */                                                                                                                            
      --block-color-locked: inherit; /* Use the original color when locked */                                                                                           
      --block-color-empty: #f0f0f0;                                                                                                                                     
    }                                                                                                                                                                   
                                                                                                                                                                        
  9 src/themes/neon.css (New File)                                                                                                                                      
     • Content: Override variables for the 'neon' theme.                                                                                                                
                                                                                                                                                                        
    /* src/themes/neon.css */                                                                                                                                           
    .theme-neon {                                                                                                                                                       
      --app-bg-color: #1a1a1a;                                                                                                                                          
      --panel-bg-color: #0d0d0d;                                                                                                                                        
      --matrix-bg-color: #000000;                                                                                                                                       
      --primary-text-color: #00ffcc; /* Neon teal */                                                                                                                    
      --secondary-text-color: #ffffff; /* White */                                                                                                                      
      --panel-border-color: #00ffcc;                                                                                                                                    
                                                                                                                                                                        
      /* Neon Block Colors (Brighter versions) */                                                                                                                       
      --block-color-i: #00ffff; /* Cyan */                                                                                                                              
      --block-color-o: #ffff00; /* Yellow */                                                                                                                            
      --block-color-t: #cc00ff; /* Magenta */                                                                                                                           
      --block-color-s: #00ff00; /* Lime */                                                                                                                              
      --block-color-z: #ff0000; /* Red */                                                                                                                               
      --block-color-j: #0066ff; /* Bright Blue */                                                                                                                       
      --block-color-l: #ff9900; /* Bright Orange */                                                                                                                     
      --block-color-locked: #444444; /* Dark grey when locked */                                                                                                        
      --block-color-empty: #111111;                                                                                                                                     
    }                                                                                                                                                                   
                                                                                                                                                                        
 10 src/themes/dark.css (New File)                                                                                                                                      
     • Content: Override variables for the 'dark' theme.                                                                                                                
                                                                                                                                                                        
    /* src/themes/dark.css */                                                                                                                                           
    .theme-dark {                                                                                                                                                       
      --app-bg-color: #282c34; /* Dark grey-blue */                                                                                                                     
      --panel-bg-color: #21252b; /* Slightly darker */                                                                                                                  
      --matrix-bg-color: #3a3f4b; /* Medium dark */                                                                                                                     
      --primary-text-color: #abb2bf; /* Light grey */                                                                                                                   
      --secondary-text-color: #ffffff; /* White */                                                                                                                      
      --panel-border-color: #abb2bf;                                                                                                                                    
                                                                                                                                                                        
      /* Muted Block Colors */                                                                                                                                          
      --block-color-i: #61afef; /* Muted Blue */                                                                                                                        
      --block-color-o: #e5c07b; /* Muted Yellow */                                                                                                                      
      --block-color-t: #c678dd; /* Muted Purple */                                                                                                                      
      --block-color-s: #98c379; /* Muted Green */                                                                                                                       
      --block-color-z: #e06c75; /* Muted Red */                                                                                                                         
      --block-color-j: #56b6c2; /* Muted Cyan */                                                                                                                        
      --block-color-l: #d19a66; /* Muted Orange */                                                                                                                      
      --block-color-locked: #4b5263; /* Darker grey when locked */                                                                                                      
      --block-color-empty: #2f343d;                                                                                                                                     
    }                                                                                                                                                                   
                                                                                                                                                                        
 11 Component .less Files (e.g., src/components/matrix/index.less, src/components/decorate/index.less, src/components/point/index.less, etc.) (Existing - Need Content) 
     • Change: Replace hardcoded colors/borders with var() functions.                                                                                                   
     • Example (Conceptual - in matrix/index.less):                                                                                                                     
                                                                                                                                                                        
       // BEFORE                                                                                                                                                        
       .matrix {                                                                                                                                                        
         border: 2px solid #000; // Hardcoded border                                                                                                                    
         background-color: #fff; // Hardcoded background                                                                                                                
         // ... other styles                                                                                                                                            
         .cell {                                                                                                                                                        
            background-color: #eee; // Hardcoded empty cell                                                                                                             
         }                                                                                                                                                              
         .cell-type-i {                                                                                                                                                 
            background-color: cyan; // Hardcoded block color                                                                                                            
         }                                                                                                                                                              
       }                                                                                                                                                                
                                                                                                                                                                        
       // AFTER                                                                                                                                                         
       .matrix {                                                                                                                                                        
         border: 2px solid var(--panel-border-color); // Use variable                                                                                                   
         background-color: var(--matrix-bg-color); // Use variable                                                                                                      
         // ... other styles                                                                                                                                            
         .cell {                                                                                                                                                        
            background-color: var(--block-color-empty); // Use variable                                                                                                 
         }                                                                                                                                                              
         // Assuming you have classes for block types or apply styles directly                                                                                          
         .cell-type-i {                                                                                                                                                 
            background-color: var(--block-color-i); // Use variable                                                                                                     
         }                                                                                                                                                              
         // ... similar changes for other block types and locked blocks                                                                                                 
       }                                                                                                                                                                
                                                                                                                                                                        
     • Example (Conceptual - in decorate/index.less):                                                                                                                   
                                                                                                                                                                        
       // BEFORE                                                                                                                                                        
       .decorate {                                                                                                                                                      
         h1 {                                                                                                                                                           
           color: #333; // Hardcoded text color                                                                                                                         
         }                                                                                                                                                              
         .topBorder span {                                                                                                                                              
           background: #000; // Hardcoded border element color                                                                                                          
         }                                                                                                                                                              
       }                                                                                                                                                                
                                                                                                                                                                        
       // AFTER                                                                                                                                                         
       .decorate {                                                                                                                                                      
         h1 {                                                                                                                                                           
           color: var(--primary-text-color); // Use variable                                                                                                            
         }                                                                                                                                                              
         .topBorder span {                                                                                                                                              
           // Decide if this should be panel border or text color, etc.                                                                                                 
           background: var(--panel-border-color); // Use variable                                                                                                       
         }                                                                                                                                                              
       }                                                                                                                                                                
                                                                                                                                                                        
     • (Similar changes needed for text in Point, Number components, backgrounds/borders in panels, etc.)                                                               
 12 src/components/ThemeSelector/index.js (New File)                                                                                                                    
     • Content: A simple component to dispatch the theme change action.                                                                                                 
                                                                                                                                                                        
    import React from 'react';                                                                                                                                          
    import { useDispatch } from 'react-redux';                                                                                                                          
    import actions from '../../actions'; // Assuming default export from actions/index.js                                                                               
                                                                                                                                                                        
    const themes = ['classic', 'neon', 'dark']; // Available themes                                                                                                     
                                                                                                                                                                        
    const ThemeSelector = () => {                                                                                                                                       
      const dispatch = useDispatch();                                                                                                                                   
                                                                                                                                                                        
      const handleThemeChange = (themeName) => {                                                                                                                        
        dispatch(actions.setTheme(themeName));                                                                                                                          
      };                                                                                                                                                                
                                                                                                                                                                        
      // Basic styling example (inline, replace with CSS/LESS)                                                                                                          
      const buttonStyle = {                                                                                                                                             
          margin: '0 5px',                                                                                                                                              
          padding: '5px 10px',                                                                                                                                          
          cursor: 'pointer',                                                                                                                                            
          border: '1px solid #ccc',                                                                                                                                     
          background: '#eee',                                                                                                                                           
      };                                                                                                                                                                
                                                                                                                                                                        
      return (                                                                                                                                                          
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 100 }}>                                                                              
          <span>Theme: </span>                                                                                                                                          
          {themes.map(theme => (                                                                                                                                        
            <button                                                                                                                                                     
              key={theme}                                                                                                                                               
              onClick={() => handleThemeChange(theme)}                                                                                                                  
              style={buttonStyle} // Apply basic style                                                                                                                  
              title={`Switch to ${theme} theme`}                                                                                                                        
            >                                                                                                                                                           
              {theme.charAt(0).toUpperCase() + theme.slice(1)} {/* Capitalize */}                                                                                       
            </button>                                                                                                                                                   
          ))}                                                                                                                                                           
        </div>                                                                                                                                                          
      );                                                                                                                                                                
    };                                                                                                                                                                  
                                                                                                                                                                        
    export default ThemeSelector;                                                                                                                                       
                                                                                                                                                                        
     • (Remember to import and render <ThemeSelector /> within the App component in src/containers/index.js if you want it visible).                                    

This completes the plan and provides the necessary code changes for the files we have and the structure for the new files. The next critical step is getting the content
of the .less files to apply the var() changes.  