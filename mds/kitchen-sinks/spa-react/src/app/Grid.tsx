import { McSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-select';
import { McMultiSelect } from '@maersk-global/mds-react-wrapper/components-core/mc-multi-select';
import { McOption } from '@maersk-global/mds-react-wrapper/components-core/mc-option';

const Grid = () => {
  return (
    <div className="mds-grid">
      <div className="mds-grid-col-1 mds-grid-col-span-to-end">
        <h1>Select test with nested container/grids</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam bibendum est pharetra, ullamcorper nulla eget,
          vestibulum ex. Sed a est sed mi viverra malesuada. Donec vitae tortor odio. Pellentesque rhoncus orci et
          varius lacinia. Mauris lobortis odio quis sapien auctor imperdiet. Nam cursus ante id malesuada fringilla.
          Nullam ut erat lacus. Nullam a felis sed dolor elementum tempus a sed ante. Phasellus mattis sit amet tellus a
          pharetra. Mauris vitae varius lorem. Suspendisse facilisis interdum cursus. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Morbi laoreet vulputate justo quis iaculis.
        </p>

        <div className="mds-container">
          <div className="mds-grid mds-grid-cols-3">
            <div>
              <h4>Second nested mds-container/mds-grid:</h4>
              <McMultiSelect>
                <small>Dry Containers</small>
                <McOption value="20' Dry Standard">20' Dry Standard</McOption>
                <McOption value="40' Dry Standard">40' Dry Standard</McOption>
                <McOption value="40' Dry High">40' Dry High</McOption>
                <McOption value="45' Dry High">45' Dry High</McOption>
                <hr />
                <small>Reefer Containers</small>
                <McOption value="20' Reefer Standard">20' Reefer Standard</McOption>
                <McOption value="40' Reefer Standard">40' Reefer Standard</McOption>
              </McMultiSelect>
            </div>
            <div
              style={{
                alignItems: 'center',
                background: 'orange',
                borderRadius: '6px',
                border: '1px solid #000',
                display: 'flex',
                height: '300px',
                justifyContent: 'center',
                overflow: 'hidden',
                padding: '20px',
              }}
            >
              <div>
                <h4>Second nested mds-container/mds-grid:</h4>
                <div>Centered content using flexbox and overflow hidden</div>
                <McSelect>
                  <small>Dry Containers</small>
                  <McOption value="20' Dry Standard">20' Dry Standard</McOption>
                  <McOption value="40' Dry Standard">40' Dry Standard</McOption>
                  <McOption value="40' Dry High">40' Dry High</McOption>
                  <McOption value="45' Dry High">45' Dry High</McOption>
                  <hr />
                  <small>Reefer Containers</small>
                  <McOption value="20' Reefer Standard">20' Reefer Standard</McOption>
                  <McOption value="40' Reefer Standard">40' Reefer Standard</McOption>
                </McSelect>
              </div>
            </div>
            <div
              style={{
                background: 'red',
                borderRadius: '6px',
                border: '1px solid #000',
                height: '300px',
                overflow: 'hidden',
                padding: '20px',
              }}
            >
              <div style={{ width: '100%' }}>
                <h4>Third nested mds-container/mds-grid with overflow hidden example:</h4>
                <div className="mds-container">
                  <div className="mds-grid mds-grid-cols-2">
                    <div className="mds-grid-col-1">
                      <McSelect>
                        <small>Dry Containers</small>
                        <McOption value="20' Dry Standard">20' Dry Standard</McOption>
                        <McOption value="40' Dry Standard">40' Dry Standard</McOption>
                        <McOption value="40' Dry High">40' Dry High</McOption>
                        <McOption value="45' Dry High">45' Dry High</McOption>
                        <hr />
                        <small>Reefer Containers</small>
                        <McOption value="20' Reefer Standard">20' Reefer Standard</McOption>
                        <McOption value="40' Reefer Standard">40' Reefer Standard</McOption>
                      </McSelect>
                    </div>
                    <div>
                      For making this work, add this: .mds .mds-container .mds-container .mds-container container-type:
                      normal; contain: size;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <McSelect>
          <small>Dry Containers</small>
          <McOption value="20' Dry Standard">20' Dry Standard</McOption>
          <McOption value="40' Dry Standard">40' Dry Standard</McOption>
          <McOption value="40' Dry High">40' Dry High</McOption>
          <McOption value="45' Dry High">45' Dry High</McOption>
          <hr />
          <small>Reefer Containers</small>
          <McOption value="20' Reefer Standard">20' Reefer Standard</McOption>
          <McOption value="40' Reefer Standard">40' Reefer Standard</McOption>
        </McSelect>

        <p>
          Morbi at ipsum id neque ullamcorper vestibulum. Etiam vel dolor a orci pulvinar lacinia nec quis sem.
          Phasellus semper tellus id congue rutrum. Curabitur sed sagittis erat. Fusce eget purus ornare, imperdiet dui
          ut, tincidunt turpis. Vivamus efficitur tincidunt elit in varius. Aliquam condimentum, nisi id suscipit
          consequat, ligula dui tempor mi, vel lacinia urna lectus eu augue. Maecenas in facilisis arcu. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla luctus aliquet est,
          eget consequat velit faucibus vitae. Curabitur eu enim a libero sagittis mattis. Etiam justo urna, tristique
          eu ultricies sollicitudin, vestibulum vitae sem.
        </p>

        <p>
          Fusce lacinia pulvinar elit ac dapibus. Fusce consectetur tempor mi, ac interdum lorem congue eget. Fusce
          faucibus cursus luctus. Ut elementum dui sem, non vehicula sapien gravida sit amet. In quis consequat magna.
          Maecenas semper sem eu lectus sagittis mollis id et lectus. Praesent et nunc justo. Fusce et mollis nunc.
          Donec consequat sem eget erat pharetra scelerisque.
        </p>
      </div>
    </div>
  );
};

export default Grid;
