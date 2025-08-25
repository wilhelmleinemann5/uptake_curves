export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-select";
import '@maersk-global/mds-components-core/mc-option';
import '@maersk-global/mds-components-core/mc-input';

// CSS
fieldset div{
  display: flex;
  align-items: center;
  gap: 4px;
}
legend {
  margin-bottom: 4px;
}
mc-select {
  width: 86px;
}
mc-input {
  width: 252px;
}

// HTML
<fieldset>
  <legend>Phone number</legend>
  <div>
    <mc-select hiddenlabel label="country code">
      <mc-option value="+40">+40</mc-option>
      <mc-option value="+41">+41</mc-option>
      <mc-option value="+42">+42</mc-option>
      <mc-option value="+43">+43</mc-option>
      <mc-option value="+44">+44</mc-option>
      <mc-option value="+45">+45</mc-option>
      <mc-option value="+46">+46</mc-option>
    </mc-select>
    <mc-input hiddenlabel label="phone"></mc-input>
  </div>
</fieldset>`,
    language: 'javascript',
    copy: true,
  },
];
