import React from 'react';
import { useNavigate } from 'react-router-dom';

import { McButton } from '@maersk-global/mds-react-wrapper/components-core/mc-button';
import { McTab } from '@maersk-global/mds-react-wrapper/components-core/mc-tab';
import { McTabBar } from '@maersk-global/mds-react-wrapper/components-core/mc-tab-bar';
import { McNotification } from '@maersk-global/mds-react-wrapper/components-core/mc-notification';
import { McTag } from '@maersk-global/mds-react-wrapper/components-core/mc-tag';
import { McLoadingIndicator } from '@maersk-global/mds-react-wrapper/components-core/mc-loading-indicator';
import { McToast } from '@maersk-global/mds-react-wrapper/components-core/mc-toast';
import { McMenu } from '@maersk-global/mds-react-wrapper/components-core/mc-menu';
import { McList } from '@maersk-global/mds-react-wrapper/components-core/mc-list';
import { McListItem } from '@maersk-global/mds-react-wrapper/components-core/mc-list-item';
import { McCard } from '@maersk-global/mds-react-wrapper/components-core/mc-card';

import { Fit } from '@maersk-global/mds-shared-types';

const Content = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [fit, setFit] = React.useState<Fit>('medium');
  const [tags, setTags] = React.useState([
    {
      label: 'ui',
      hidden: false,
      open: false,
    },
    {
      label: 'visual-design',
      hidden: false,
      open: false,
    },
    {
      label: 'engineering',
      hidden: false,
      open: false,
    },
    {
      label: 'product',
      hidden: false,
      open: false,
    },
  ]);
  const navigate = useNavigate();

  const onTabChange = async (e: any) => {
    const currentindex = e;
    if (currentindex === 2) {
      setLoading(true);
      setData(await fetchData());
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/?type=all-meat&paras=3&start-with-lorem=1', {
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
      return response.json();
    } catch (err) {
      return 'sorry, there are no results for your search';
    }
  };

  const onTagDismiss = (tag: any) => {
    setTags(
      [...tags].map((item) => {
        if (item.label === tag.label) {
          return {
            ...item,
            hidden: true,
            open: true,
          };
        } else return item;
      }),
    );
  };

  const onToastClose = (tag: any) => {
    setTags(
      [...tags].map((item) => {
        if (item.label === tag.label) {
          return {
            ...item,
            open: false,
          };
        } else return item;
      }),
    );
  };

  return (
    <div className="mds-grid mds-grid-cols-1">
      <McMenu position="bottom-left">
        <McButton
          slot="trigger"
          icon="bars-horizontal"
          hiddenlabel
          label="menu"
          variant="outlined"
          appearance="neutral"
        ></McButton>
        <McList>
          <McListItem label="One"></McListItem>
          <McListItem label="Two"></McListItem>
          <McListItem label="Three"></McListItem>
          <McListItem label="Four"></McListItem>
          <McListItem label="Five"></McListItem>
        </McList>
      </McMenu>
      <div className="mds-flex mds-gap-400">
        <McButton label="small" click={() => setFit('small')}></McButton>
        <McButton label="medium" click={() => setFit('medium')}></McButton>
        <McButton label="large" click={() => setFit('large')}></McButton>
      </div>
      <McTabBar tabchange={(e: any) => onTabChange(e)} fit={fit}>
        <McTab slot="tab" label="Info" icon="info-circle" fit={fit}></McTab>
        <div slot="panel">
          <McNotification heading="Get in touch" icon="info-circle" fit={fit}>
            <div>
              <p>
                The best way to get in touch with us is via Microsoft Teams. We have a number of channels with specific
                purposes:
              </p>
              <ul>
                <li>
                  <a href="https://designsystem.maersk.com/get-involved/get-in-touch">Designers</a>- help and support
                  focussing on UX / designer support and feedback.
                </li>
                <li>
                  <a href="https://designsystem.maersk.com/get-involved/get-in-touch">Developers</a>- help and support
                  focussing on developer support and feedback.
                </li>
                <li>
                  <a href="https://designsystem.maersk.com/get-involved/get-in-touch">General</a>- general chat and
                  updates.
                </li>
              </ul>
            </div>
          </McNotification>
        </div>
        <McTab slot="tab" label="Work" icon="globe" fit={fit}></McTab>
        <div slot="panel">
          <p>Work page that showcases our work.</p>
          <div id="tagsContainer">
            {tags.map((tag, index) => (
              <>
                {!tag.hidden && (
                  <McTag
                    key={index}
                    label={tag.label}
                    withaction
                    dismiss={(e: CustomEvent<string>) => {
                      console.log('Tag dismissed: ', e.detail);
                      onTagDismiss(tag);
                    }}
                    fit={fit}
                  ></McTag>
                )}
                <McToast
                  open={tag.open}
                  close={(e: CustomEvent<string>) => {
                    console.log('On Toast close', e.detail);
                    onToastClose(tag);
                  }}
                >
                  <McNotification appearance="info">
                    <b>{tag.label}</b> has been dismissed
                  </McNotification>
                </McToast>
              </>
            ))}
          </div>
        </div>
        <McTab slot="tab" label="Hobby" icon="heart" fit={fit}></McTab>
        <div slot="panel">
          {loading && <McLoadingIndicator label="Fetching data ..." fit={fit}></McLoadingIndicator>}
          {data}
        </div>
        <McTab slot="tab" label="Contact" icon="envelope" fit={fit}></McTab>
        <p slot="panel">Contact page that shows our contacts.</p>
        <McTab slot="tab" label="Address" icon="warehouse" fit={fit}></McTab>
        <p slot="panel">Address page that shows our addresses.</p>
      </McTabBar>
      <McToast>
        <McButton label="Toast" slot="trigger"></McButton>
        <McNotification body="Body text" appearance="success"></McNotification>
      </McToast>
      <McCard
        clickable={true}
        heading="Go to tab-bar-router"
        body="Navigate to tab-bar-router page using router link."
        onClick={() => navigate('/tabbarrouter/2')}
      ></McCard>
    </div>
  );
};

export default Content;
