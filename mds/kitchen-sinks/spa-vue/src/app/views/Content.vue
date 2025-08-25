<template>
  <section class="mds-content mds-grid mds-grid-cols-1">
    <div class="mds-flex mds-gap-400">
      <mc-button label="small" @click="onFitChanged('small')"></mc-button>
      <mc-button label="medium" @click="onFitChanged('medium')"></mc-button>
      <mc-button label="large" @click="onFitChanged('large')"></mc-button>
      <mc-button @click="toggleTab()">{{ showTab ? 'Hide tab' : 'Show tab' }}</mc-button>
    </div>
    <mc-file-upload
      :filesstatus="filesStatus"
      multiple="true"
      @input="onFileInput"
      @change="onFileChange"
    ></mc-file-upload>
    <mc-tab-bar @tabchange="onTabChange" :fit="fit">
      <!-- tab 0: -->
      <mc-tab slot="tab" label="Info" icon="info-circle" :fit="fit"></mc-tab>
      <div slot="panel">
        <mc-notification heading="Get in touch" icon="info-circle" :fit="fit">
          <div>
            <p>
              The best way to get in touch with us is via Microsoft Teams. We have a number of channels with specific
              purposes:
            </p>
            <ul>
              <li>
                <a href="https://designsystem.maersk.com/get-involved/get-in-touch">Designers</a>
                - help and support focussing on UX / designer support and feedback.
              </li>
              <li>
                <a href="https://designsystem.maersk.com/get-involved/get-in-touch">Developers</a>
                - help and support focussing on developer support and feedback.
              </li>
              <li>
                <a href="https://designsystem.maersk.com/get-involved/get-in-touch">General</a>
                - general chat and updates.
              </li>
            </ul>
          </div>
        </mc-notification>
      </div>
      <!-- tab 1: -->
      <mc-tab v-show="showTab" slot="tab" label="Work" icon="globe" :fit="fit"></mc-tab>
      <div v-show="showTab" slot="panel">
        <p>Work page that showcases our work.</p>
        <div id="tagsContainer">
          <mc-tag @dismiss="onTagDismiss" label="ui" withAction :fit="fit"></mc-tag>
          <mc-tag @dismiss="onTagDismiss" label="visual design" withAction :fit="fit"></mc-tag>
          <mc-tag @dismiss="onTagDismiss" label="engineering" withAction :fit="fit"></mc-tag>
          <mc-tag @dismiss="onTagDismiss" label="product" withAction :fit="fit"></mc-tag>
        </div>
      </div>
      <!-- tab 2: -->
      <mc-tab slot="tab" label="Hobby" icon="heart" :fit="fit"></mc-tab>
      <div slot="panel">
        <div>
          <p v-for="item in data" :key="item">{{ item }}</p>
        </div>
        <mc-loading-indicator v-if="loading" label="Fetching data ..." :fit="fit"></mc-loading-indicator>
      </div>
      <!-- tab 3: -->
      <mc-tab slot="tab" label="Contact" icon="envelope" :fit="fit"></mc-tab>
      <p slot="panel">Contact page that shows our contacts.</p>
      <!-- tab 4: -->
      <mc-tab slot="tab" label="Address" icon="warehouse" :fit="fit"></mc-tab>
      <p slot="panel">Address page that shows our addresses.</p>
    </mc-tab-bar>

    <mc-toast duration="500000">
      <mc-button label="Toast" slot="trigger"></mc-button>
      <mc-notification body="Body text"></mc-notification>
    </mc-toast>

    <mc-menu position="bottom-left">
      <mc-button slot="trigger" icon="bars-horizontal" hiddenlabel label="menu" variant="outlined" appearance="neutral">
      </mc-button>
      <mc-list>
        <mc-list-item label="One"></mc-list-item>
        <mc-list-item label="Two"></mc-list-item>
        <mc-list-item label="Three"></mc-list-item>
        <mc-list-item label="Four"></mc-list-item>
        <mc-list-item label="Five"></mc-list-item>
      </mc-list>
    </mc-menu>

    <mc-card
      :clickable="true"
      heading="Go to tab-bar-router"
      body="Navigate to tab-bar-router page using router link."
      @click="redirectToRoute"
    >
    </mc-card>
  </section>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import '@maersk-global/mds-components-core/mc-card';
import '@maersk-global/mds-components-core/mc-tab-bar';
import '@maersk-global/mds-components-core/mc-tab';
import '@maersk-global/mds-components-core/mc-loading-indicator';
import '@maersk-global/mds-components-core/mc-notification';
import '@maersk-global/mds-components-core/mc-tag';
import '@maersk-global/mds-components-core/mc-button';
import '@maersk-global/mds-components-core/mc-menu';
import '@maersk-global/mds-components-core/mc-list';
import '@maersk-global/mds-components-core/mc-list-item';
import '@maersk-global/mds-components-core/mc-toast';
import '@maersk-global/mds-components-core/mc-file-upload';

import { ref, Ref } from 'vue';

export default {
  setup() {
    type FileStatus = {
      fileName: string;
      status: string;
      hint: string;
      errorMessage: string;
    };
    const router = useRouter();
    const data: Ref<string[]> = ref([]);
    const loading: Ref<boolean> = ref(true);
    const fit: Ref<string> = ref('medium');
    const showTab: Ref<boolean> = ref(false);
    const files = ref();
    const filesStatus: Ref<FileStatus[]> = ref([]);
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
    const onTagDismiss = (e: Event) => {
      if (e) {
        const tag = e.target as HTMLElement;
        tag.classList.add('hide');
      }
    };
    const onTabChange = async (e: CustomEvent) => {
      const currentindex = e.detail;
      if (currentindex === 2) {
        loading.value = true;
        data.value = [];
        data.value = await fetchData();
        loading.value = false;
      }
    };
    const onFitChanged = (fitValue: string) => {
      fit.value = fitValue;
    };
    const toggleTab = () => {
      showTab.value = !showTab.value;
    };
    const onFileChange = (event: CustomEvent) => {
      const filesUpdated = Array.from(event.detail);
      filesStatus.value = filesUpdated.map((file: any) => {
        return {
          fileName: file.name,
          status: 'loading',
          hint: 'Uploading ...',
          errorMessage: '',
        };
      });
      setTimeout(() => {
        filesStatus.value = filesUpdated.map((file: any) => {
          const fileSizeMB = parseFloat((file.size / 1024 ** 2).toFixed(2));
          if (fileSizeMB > 2) {
            return {
              fileName: file.name,
              status: 'error',
              hint: `File size: ${fileSizeMB} MB`,
              errorMessage: 'File size exceeds 2 MB, please upload a smaller file.',
            };
          }
          return {
            fileName: file.name,
            status: 'success',
            hint: `File size: ${fileSizeMB}MB, last uploaded: ${new Date().toLocaleString()}`,
            errorMessage: '',
          };
        });
      }, 5000);
    };
    const onFileInput = (event: CustomEvent) => {
      files.value = event.detail;
    };
    const redirectToRoute = () => {
      router.push('/tab-bar-router/2');
    };
    return {
      data,
      loading,
      fit,
      showTab,
      onTagDismiss,
      onTabChange,
      onFitChanged,
      toggleTab,
      filesStatus,
      onFileChange,
      onFileInput,
      redirectToRoute,
    };
  },
};
</script>
