#!/usr/bin/env python3
"""
Generate Kepler.gl HTML with embedded CSV data
This converts the CSV to the format Kepler.gl expects (JavaScript array)
"""

import csv
import json

# Read CSV
with open('rejected_offer_value (29).csv', 'r') as f:
    reader = csv.reader(f)
    headers = next(reader)
    rows = []
    for row in reader:
        # Convert values to appropriate types
        converted_row = []
        for i, val in enumerate(row):
            if val == '' or val == 'null':
                converted_row.append(None)
            elif i in [0, 3]:  # departure_id, booked_spot_total_freight (integers)
                converted_row.append(int(float(val)) if val else None)
            elif i >= 2 and i <= 11:  # numeric fields
                converted_row.append(float(val) if val else None)
            else:  # string fields
                converted_row.append(val)
        rows.append(converted_row)

# Create Kepler.gl HTML template
html_template = '''<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Rejected Offer Value - Geospatial Map</title>
  <link rel="stylesheet" href="https://unpkg.com/kepler.gl@3.2.3/umd/keplergl.min.css">
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/redux@4.2.1/dist/redux.js"></script>
  <script src="https://unpkg.com/react-redux@8.1.2/dist/react-redux.min.js"></script>
  <script src="https://unpkg.com/styled-components@6.1.8/dist/styled-components.min.js"></script>
  <script src="https://unpkg.com/kepler.gl@3.2.3/umd/keplergl.min.js"></script>
  <style>body {{margin: 0; padding: 0; overflow: hidden;}}</style>
  <script>
    const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2lsaGVsbS1tYWVyc2siLCJhIjoiY2x0YzB6MngyMDdjNjJqcGQ4eTdpaW40diJ9.rJdvLdEbUb5p5SJTwZ0mZw';
  </script>
</head>
<body>
  <div id="app"></div>
  <script>
    (function() {{
      const reducers = Redux.combineReducers({{
        keplerGl: KeplerGl.keplerGlReducer.initialState({{
          uiState: {{ readOnly: true, currentModal: null }}
        }})
      }});
      const store = Redux.createStore(reducers);

      const App = () => {{
        const [dimension, setDimension] = React.useState({{
          width: window.innerWidth,
          height: window.innerHeight
        }});
        React.useEffect(() => {{
          const handleResize = () => setDimension({{
            width: window.innerWidth, height: window.innerHeight
          }});
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }}, []);
        return React.createElement('div', {{style: {{position: 'absolute', left: 0, width: '100vw', height: '100vh'}}}},
          React.createElement(KeplerGl.KeplerGl, {{
            mapboxApiAccessToken: MAPBOX_TOKEN,
            id: "map",
            width: dimension.width,
            height: dimension.height
          }})
        );
      }};

      const root = ReactDOM.createRoot(document.getElementById('app'));
      root.render(React.createElement(ReactRedux.Provider, {{store}}, React.createElement(App)));

      const datasets = [{{
        "version": "v1",
        "data": {{
          "id": "data",
          "label": "Rejected Offers",
          "color": [192, 108, 132],
          "allData": {all_data},
          "fields": {fields}
        }}
      }}];

      const config = {{
        "version": "v1",
        "config": {{
          "visState": {{
            "layers": [{{
              "id": "h3-layer",
              "type": "hexagonId",
              "config": {{
                "dataId": "data",
                "label": "Rejected Offers",
                "columns": {{"hex_id": "hex_h3_r2"}},
                "isVisible": true,
                "visConfig": {{
                  "opacity": 0.8,
                  "colorRange": {{
                    "name": "Uber Viz Diverging",
                    "type": "diverging",
                    "category": "Uber",
                    "colors": ["#00939C","#5DBABF","#BAE1E2","#F8C0AA","#DD7755","#C22E00"]
                  }},
                  "coverage": 0.95,
                  "enable3d": false
                }},
                "colorField": {{"name": "rejected_offer_value_vessel_sold_out", "type": "real"}},
                "colorScale": "quantile"
              }}
            }}]],
            "interactionConfig": {{
              "tooltip": {{
                "fieldsToShow": {{
                  "data": [
                    {{"name": "hex_h3_r2", "format": null}},
                    {{"name": "booked_spot_total_freight", "format": null}},
                    {{"name": "rejected_offer_value_vessel_sold_out", "format": null}},
                    {{"name": "booked_ffe", "format": null}},
                    {{"name": "rejected_ffe", "format": null}}
                  ]
                }},
                "enabled": true
              }}
            }}
          }},
          "mapState": {{
            "latitude": 30,
            "longitude": 20,
            "zoom": 2
          }},
          "mapStyle": {{"styleType": "dark"}}
        }}
      }};

      window.setTimeout(() => {{
        const loadedData = KeplerGl.KeplerGlSchema.load(datasets, config);
        store.dispatch(KeplerGl.addDataToMap({{
          datasets: loadedData.datasets,
          config: loadedData.config
        }}));
      }}, 500);
    }})();
  </script>
</body>
</html>'''

# Create fields array
fields = [
    {"name": h, "type": "string" if h in ["hex_role"] else ("integer" if h in ["departure_id", "booked_spot_total_freight"] else ("h3" if h == "hex_h3_r2" else "real")), "format": "", "analyzerType": "STRING" if h in ["hex_role"] else ("INT" if h in ["departure_id", "booked_spot_total_freight"] else ("H3" if h == "hex_h3_r2" else "FLOAT"))}
    for h in headers
]

# Write output
html = html_template.format(
    all_data=json.dumps(rows),
    fields=json.dumps(fields)
)

with open('kepler-final.html', 'w') as f:
    f.write(html)

print(f"Generated kepler-final.html with {len(rows)} data rows")
print("Open kepler-final.html in your browser to view the map")

