import React from 'react';
import { useParameter } from 'storybook/manager-api';

const PARAM_KEY = 'slots';

export const SlotsPanel = () => {
  const value = useParameter(PARAM_KEY, null);
  const slots = value && value && value.length > 0 ? value : null;
  const slotsDefault = slots ? slots.filter((slot) => slot.type === 'default') : null;
  const slotsNamed = slots ? slots.filter((slot) => slot.type === 'named') : null;

  return (
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
            Default slots
          </td>
        </tr>
        {slotsDefault &&
          slotsDefault.length > 0 &&
          slotsDefault.map((slot, index) => (
            <tr key={index}>
              <td className="name">{slot.name}</td>
              <td>
                <code>{slot.example}</code>
              </td>
              <td dangerouslySetInnerHTML={{ __html: slot.description }}></td>
            </tr>
          ))}
        {(!slotsDefault || slotsDefault.length === 0) && (
          <tr>
            <td colSpan="3">No default slots available for this component</td>
          </tr>
        )}
        <tr>
          <td colSpan="3" className="section-heading">
            Named slots
          </td>
        </tr>
        {slotsNamed &&
          slotsNamed.length > 0 &&
          slotsNamed.map((slot, index) => (
            <tr key={index}>
              <td className="name">{slot.name}</td>
              <td>
                <code>{slot.example}</code>
              </td>
              <td dangerouslySetInnerHTML={{ __html: slot.description }}></td>
            </tr>
          ))}
        {(!slotsNamed || slotsNamed.length === 0) && (
          <tr>
            <td colSpan="3">No named slots available for this component</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
