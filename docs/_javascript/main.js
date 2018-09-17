document.addEventListener('DOMContentLoaded', () => {
    // Sidebar links
    const $categories = getAll('#categories .rb-category');

    if ($categories.length > 0) {
        $categories.forEach(el => {
            const toggle_el = el.querySelector('.rb-category-toggle');

            toggle_el.addEventListener('click', event => {
                el.classList.toggle('is-active');
            });
        });
    }

    // Dropdowns

    const $dropdowns = getAll('.dropdown:not(.is-hoverable)');

    if ($dropdowns.length > 0) {
        $dropdowns.forEach($el => {
            $el.addEventListener('click', event => {
                event.stopPropagation();
                $el.classList.toggle('is-active');
            });
        });

        document.addEventListener('click', event => {
            closeDropdowns();
        });
    }

    function closeDropdowns() {
        $dropdowns.forEach($el => {
            $el.classList.remove('is-active');
        });
    }

    // Modals

    const rootEl = document.documentElement;
    const $modals = getAll('.modal');
    const $modalButtons = getAll('.modal-button');
    const $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');


    if ($modalButtons.length > 0) {
        $modalButtons.forEach($el => {
            $el.addEventListener('click', () => {
                const target = $el.dataset.target;
                openModal(target);
            });
        });
    }

    if ($modalCloses.length > 0) {
        $modalCloses.forEach($el => {
            $el.addEventListener('click', () => {
                closeModals();
            });
        });
    }

    function openModal(target) {
        const $target = document.getElementById(target);
        rootEl.classList.add('is-clipped');
        $target.classList.add('is-active');
    }

    function closeModals() {
        rootEl.classList.remove('is-clipped');
        $modals.forEach($el => {
            $el.classList.remove('is-active');
        });
    }

    document.addEventListener('keydown', event => {
        const e = event || window.event;
        if (e.keyCode === 27) {
            closeModals();
            closeDropdowns();
        }
    });

    // Functions

    function getAll(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
    }

    // Utils

    function removeFromArray(array, value) {
        if (array.includes(value)) {
            const value_index = array.indexOf(value);
            array.splice(value_index, 1);
        }

        return array;
    }

    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };

});
