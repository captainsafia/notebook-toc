define(['base/js/namespace', 'base/js/utils', 'jquery'], function(Jupyter, utils, $) {
    function create_toc() {
        var toc_text = "# Table of Contents\n";
        var cells = Jupyter.notebook.get_cells();
        var heading_count = 0;
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            if (cell.cell_type == "markdown") {
               var cell_content = cell.get_text(); 
               if (cell_content.startsWith("#")) {
                   // Increment the heading count
                   heading_count++;
                   // Get the heading title
                   var last_hash = cell_content.lastIndexOf("#");
                   var hash_num = last_hash + 1;
                   var heading_title = cell_content.substr(hash_num);
                   // Clean up the existing heading content
                   var first_tag = heading_title.indexOf("<");
                   console.log(first_tag);
                   heading_title = heading_title.slice(0, first_tag);
                   console.log(heading_title);
                   // Create a <a> tag for linking to fragment
                   var link_fragment_heading = heading_title.toLowerCase().replace(" ", "_");
                   var link_fragment = '<a name="' + link_fragment_heading + '"></a>';
                   console.log(link_fragment);
                   // Append the <a> tag to the heading cell
                   cell.set_text(cell.get_text() +  link_fragment);
                   cell.render();
                   // Add the heading to the TOC cell
                   toc_text += (heading_count + ". ");
                   toc_text += ("[" + heading_title + "](#" + link_fragment_heading + ") \n");
               }
            }
        }

        var toc_cell = Jupyter.notebook.insert_cell_at_index('markdown', 0);
        toc_cell.set_text(toc_text);
        toc_cell.render();
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
