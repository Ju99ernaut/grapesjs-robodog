import Robodog from '@uppy/robodog';
import en from './locale/en';

export default (editor, opts = {}) => {
  const options = {
    ...{
      i18n: {},
      // default options
      // default options
      // Custom button element which triggers Uppy modal
      btnEl: '',

      // Text for the button in case the custom one is not provided
      btnText: 'Upload images',

      // File picker theme
      theme: 'dark',

      // Uppys's options
      uppyOpts: {
        autoProceed: false,
        restrictions: {
          maxFileSize: 2000000,
          maxNumberOfFiles: 10,
          minNumberOfFiles: 1,
          allowedFileTypes: ['image/*']
        }
      },

      // Uppy dashboard options
      dashboardOpts: {
        showProgressDetails: true,
        note: 'Images only, 1–10 files, up to 2 MB',
        height: 470,
        metaFields: [
          { id: 'name', name: 'Name', placeholder: 'file name' },
          { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
        ],
        browserBackButtonClose: false
      },

      // Custom companion
      companionUrl: '',

      // On complete upload callback
      // assets - Array of assets, eg. [{url:'...', filename: 'name.jpeg', ...}]
      // for debug: console.log(assets);
      onComplete(assets) {
        console.log('successful files:', assets);
      },

      // On failed upload callback
      // assets - Array of assets, eg. [{url:'...', filename: 'name.jpeg', ...}]
      // for debug: console.log(assets);
      onFailed(assets) {
        console.log('failed files:', assets);
      },
    }, ...opts
  };

  // Load i18n files
  editor.I18n && editor.I18n.addMessages({
    en,
    ...options.i18n,
  });

  let btnEl;
  let uppy;
  const pfx = editor.getConfig('stylePrefix');
  const { $ } = editor;
  const { uppyOpts, dashboardOpts, params, theme, companionUrl } = options;

  // When the Asset Manager modal is opened
  editor.on('run:open-assets', () => {
    const modal = editor.Modal;
    const modalBody = modal.getContentEl();
    const uploader = modalBody.querySelector(`.${pfx}am-file-uploader`);
    const assetsHeader = modalBody.querySelector(`.${pfx}am-assets-header`);
    const assetsBody = modalBody.querySelector(`.${pfx}am-assets-cont`);

    uploader && (uploader.style.display = 'none');
    assetsBody.style.width = '100%';

    // Instance button if not yet exists
    if (!btnEl) {
      btnEl = options.btnEl ? $(options.btnEl) : $(`<button class="${pfx}btn-prim ${pfx}btn-uppy">
                ${options.btnText}
            </button>`);
    }

    if (!uppy) {
      uppy = Robodog.dashboard('body', {
        params,
        theme,
        inline: false,
        trigger: btnEl.get(0),
        providers: [
          'dropbox',
          'google-drive',
          'instagram',
          'url',
          'webcam',
          'onedrive',
          'facebook',
          'box',
          'unsplash',
          'screen-capture'
        ],
        ...uppyOpts,
        ...dashboardOpts
      });

      //uppy.use(Unsplash, { target: Dashboard, companionUrl });

      uppy.on('transloadit:result', result => {
        addAssets(result.successful);
        options.onComplete(result.successful);
        options.onFailed(result.failed);
      })
    }

    assetsHeader.appendChild(btnEl.get(0));
  });

  /**
   * Add new assets to the editor
   * @param {Array} files
   */
  const addAssets = (files) => {
    const urls = files.map((file) => {
      return {
        id: file.id,
        name: file.name,
        caption: file.meta.caption || '',
        size: file.size,
        src: file.uploadURL
      };
    });
    return editor.AssetManager.add(urls);
  };
};