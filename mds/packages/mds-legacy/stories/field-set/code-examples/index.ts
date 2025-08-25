const mdsFieldsetTemplate = `
<div>
  <fieldset class="form-fieldset">
    <legend class="mds-font--display-1">Shipping address</legend>
    <div class="form-group">
      <mc-input label="Name" placeholder="Name" name="shipping_name"></mc-input>
    </div>
    <div class="form-group">
      <mc-input label="Street" placeholder="Street" name="shipping_street"></mc-input>
    </div>
    <div class="form-group">
      <mc-input label="City" placeholder="City" name="shipping_city"></mc-input>
    </div>
    <div class="form-group">
      <mc-input label="Zip code" placeholder="ZIP" name="shipping_zip"></mc-input>
    </div>
  </fieldset>
  <fieldset class="form-fieldset">
    <legend class="mds-font--display-1">Billing address</legend>
     <div class="form-group">
      <mc-input label="Name" placeholder="Name" name="billing_name"></mc-input>
    </div>
    <div class="form-group">
      <mc-input label="Street" placeholder="Street" name="billing_street"></mc-input>
    </div>
    <div class="form-group">
      <mc-input label="City" placeholder="City" name="billing_city"></mc-input>
    </div>
    <div class="form-group">
      <mc-input label="Zip code" placeholder="ZIP" name="billing_zip"></mc-input>
    </div>
  </fieldset>
</div>`.replace(/\n\s*\n/g, '\n');

export const preview = [
  {
    tab: 'HTML',
    template: mdsFieldsetTemplate,
    language: 'html',
    copy: true,
  },
];
