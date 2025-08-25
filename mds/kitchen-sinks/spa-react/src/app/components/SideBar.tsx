import { McSideBar } from '@maersk-global/mds-react-wrapper/components-core/mc-side-bar';

export const SideBar = () => {
  return (
    <McSideBar>
      <nav role="navigation" aria-label="side navigation">
        <ol>
          <li>
            <a className="mds-neutral__text-color" href="https://designsystem.maersk.com">
              Apple
            </a>
          </li>
          <li>
            <a className="mds-neutral__text-color" href="https://designsystem.maersk.com">
              Orange
            </a>
          </li>
          <li>
            <a className="mds-neutral__text-color" href="https://designsystem.maersk.com">
              Lemon
            </a>
          </li>
        </ol>
      </nav>
    </McSideBar>
  );
};
