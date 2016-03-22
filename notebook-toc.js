define(['base/js/namespace', 'base/js/utils', 'jquery'], function(Jupyter, utils, $) {
    function create_toc() {
        console.log('create_toc');
    }

    function place_toc_button() {
        if (!Jupyter.toolbar) {
            $([Jupyter.events]).on("app_initialized.NotebookApp", place_toc_button);
            return;
        }

        if ($("#create-toc-button").length == 0) {
            Jupyter.toolbar.add_buttons_group([
                {
                    'label': 'Create Table of Contents',
                    'icon': 'fa-table',
                    'callback': create_toc,
                    'id': 'create-toc-button'
                },
            ]);
        }
    }

    function load_ipython_extension() {
        console.log('Loading notebook-toc extension...');
        place_toc_button();
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
