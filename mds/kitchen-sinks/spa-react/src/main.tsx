import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { MdsConfig } from '@maersk-global/mds-config';

import '@maersk-global/fonts/maeu/fonts.css';
import '@maersk-global/mds-design-tokens/maersk/light/css/design-tokens-px.css';
import '@maersk-global/mds-foundations/css/foundations.css';

import { McTopBar } from '@maersk-global/mds-react-wrapper/components-core/mc-top-bar';
import { McSideBar } from '@maersk-global/mds-react-wrapper/components-core/mc-side-bar';

import './app/app.css';
import Grid from './app/Grid';
import Content from './app/Content';
import Form from './app/Form';
import Typeahead from './app/Typeahead';
import TypeaheadMultiSelect from './app/TypeaheadMultiSelect';
import Validation from './app/Validation';
import TabBarRouter from './app/TabBarRouter';
import PaginationRouter from './app/PaginationRouter';
import MenuRouter from './app/MenuRouter';
import ButtonGroupRouter from './app/ButtonGroupRouter';
import SegmentedControlRouter from './app/SegmentedControlRouter';
import TableDynamicCellRenderer from './app/TableDynamicCellRenderer';
import TableCustomRenderers from './app/components/TableCustomRenderers';

MdsConfig.iconsDynamicImportPath = import.meta.env.MODE === 'development' ? '/node_modules/' : '/assets/node_modules/';

import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <div className="mds-layout">
    <StrictMode>
      <BrowserRouter>
        <McTopBar product="SPA React" productshort="React">
          <Link to="/home" slot="link">
            Home
          </Link>
        </McTopBar>
        <McSideBar>
          <nav role="navigation" aria-label="side navigation">
            <ul>
              <li>
                <Link to="/grid">Grid</Link>
              </li>
              <li>
                <Link to="/form">Form</Link>
              </li>
              <li>
                <Link to="/content">Content</Link>
              </li>
              <li>
                <Link to="/typeahead">Typeahead</Link>
              </li>
              <li>
                <Link to="/typeahead-multiselect">Typeahead Multiselect</Link>
              </li>
              <li>
                <Link to="/table-dynamic-cell-renderer">Table Dynamic Cell Renderer</Link>
              </li>
              <li>
                <Link to="/table-custom-renderers">Table Custom Renderers</Link>
              </li>
              <li>
                <Link to="/validation">Validation</Link>
              </li>
              <li>
                <Link to="/tabbarrouter/1">Tab Bar with Router</Link>
              </li>
              <li>
                <Link to="/paginationrouter/5">Pagination with Router</Link>
              </li>
              <li>
                <Link to="/menurouter/1">Menu with Router</Link>
              </li>
              <li>
                <Link to="/buttongrouprouter/1">Button group with Router</Link>
              </li>
              <li>
                <Link to="/segmentedcontrolrouter/1">Segmented control with Router</Link>
              </li>
            </ul>
          </nav>
        </McSideBar>
        <main className="mds-page mds-container">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="/grid" element={<Grid />} />
            <Route path="/form" element={<Form />} />
            <Route path="/content" element={<Content />} />
            <Route path="/typeahead" element={<Typeahead />} />
            <Route path="/typeahead-multiselect" element={<TypeaheadMultiSelect />} />
            <Route path="/table-dynamic-cell-renderer" element={<TableDynamicCellRenderer />} />
            <Route path="/table-custom-renderers" element={<TableCustomRenderers />} />
            <Route path="/validation" element={<Validation />} />
            <Route path="/tabbarrouter">
              <Route path=":id" element={<TabBarRouter />} />
            </Route>
            <Route path="/paginationrouter">
              <Route path=":id" element={<PaginationRouter />} />
            </Route>
            <Route path="/menurouter">
              <Route path=":id" element={<MenuRouter />} />
            </Route>
            <Route path="/buttongrouprouter">
              <Route path=":id" element={<ButtonGroupRouter />} />
            </Route>
            <Route path="/segmentedcontrolrouter">
              <Route path=":id" element={<SegmentedControlRouter />} />
            </Route>
          </Routes>
          <footer>SPA React code examples</footer>
        </main>
      </BrowserRouter>
    </StrictMode>
  </div>,
);
