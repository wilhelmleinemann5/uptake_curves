export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import "@maersk-global/mds-components-core/mc-file-upload";

/** In the example, the file is created programmatically and added to the fileUpload component to show all the file statuses.
  In real life application, you can simply listen to the input event and save the FileList(from event.detail) in a variable/on a server.
  The filesstatus property is used to show the status, hint message or error message under each file name. 
   For example when you upload or scan a file with an API the loading status with optional hint message can be shown while the request is made. If the API returns an error, the file name element can show an error status in red with optional error message.
  The filesstatus can be updated dynamically The list of files that are updated can be retrieved by listening to the change event. **/

        const fileUploadComponent = document.querySelector('mc-file-upload');
          //show all files statuses
        const files = [
            new File(['file1'], 'file1.txt', { type: 'text/plain' }),
            new File(['file2'], 'file2.txt', { type: 'text/plain' }),
            new File(['file3'], 'file3.txt', { type: 'text/plain' }),
            new File(['file4'], 'file4.txt', { type: 'text/plain' }),
        ];
        const dataTransfer = new DataTransfer();
        files.forEach((file) => {
            dataTransfer.items.add(file);
        });
        fileUploadComponent.files = dataTransfer.files;
        const statuses = ['loading', 'success', 'error', 'error'];
        let filesStatus = files.map((file, index) => {
            return {
                fileName: file.name,
                status: statuses[index],
                hint: statuses[index] === 'loading' ? 'Scanning for viruses ...' : '',
                errorMessage: statuses[index] === 'error' ? 'The file size is too big!' : ''
            };
        });
        filesStatus[3].hint = 'File size: 10MB';
        fileUploadComponent.filesstatus = filesStatus;

        //listen to change event to simulate file upload and update the statuses
        fileUploadComponent.addEventListener('change', (event) => {
            const filesUpdated = Array.from(event.detail);
            filesUpdated.forEach((fileUpdated) => {
                filesStatus.push({
                    fileName: fileUpdated.name,
                    status: 'loading',
                    hint: 'File uploading to server ...',
                    errorMessage: ''
                });
            });
            document.querySelector('mc-file-upload').filesstatus = filesStatus;
            setTimeout(() => {
                filesStatus = filesStatus.map((file) => {
                    if (file.status === 'loading') {
                        return {
                            fileName: file.fileName,
                            status: 'success',
                            hint: 'File uploaded successfully',
                            errorMessage: ''
                        };
                    }
                    return file;
                });
                document.querySelector('mc-file-upload').filesstatus = filesStatus;
            }, 2000);
        });
   

// HTML
<mc-file-upload multiple="true">
  <span slot="file-url-1">
    <a href="https://maersk.com" target="_blank">file2.txt</a>
  </span>
</mc-file-upload>
  `,
    language: 'javascript',
    copy: true,
  },
];
