import React from 'react';
import { useParameter } from 'storybook/manager-api';

const PARAM_KEY = 'cssParts';

export const DocsPanel = () => {
  const value = useParameter(PARAM_KEY, null);
  const cssParts = value && value.length > 0 ? value : null;

  return (
    <>
      <div
        style={{
          padding: '16px',
          backgroundColor: '#fff1c2',
          color: '#4d3e0c',
        }}
      >
        <b>Be very cautious!</b>
        <p>Excessive custom styling may cause components to diverge from the Maersk brand! </p>
        <p>
          Use CSS parts and overrides very sparingly, otherwise you will not be able to maintain alignment with the
          brand guidelines.
        </p>
      </div>
      <table aria-hidden="false" className="mds-docs">
        <thead>
          <tr>
            <th>
              <span>Name</span>
            </th>
            <th>
              <span>Code example</span>
            </th>
            <th>
              <span>Description</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3" className="section-heading">
              CSS Parts
            </td>
          </tr>
          {cssParts &&
            cssParts.map((part, index) => (
              <tr key={index}>
                <td className="name">{part.name}</td>
                <td>
                  <code>{part.example}</code>
                </td>
                <td dangerouslySetInnerHTML={{ __html: part.description }}></td>
              </tr>
            ))}
          {(!cssParts || cssParts.length === 0) && (
            <tr>
              <td colSpan="3">No CSS parts available for this component</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
