window.timeOutSearchForm = false
window.ajaxSearch = false

function _search_post_data(th) {
    if (window.ajaxSearch) window.ajaxSearch.abort()
    // if (th.val().length >= 4) {
    //     window.ajaxSearch = _ajax_post(th, th.data('path'), {
    //         query: th.val()
    //     })
    // } else
        if (typeof app == 'object') {
        app.$store.dispatch('setSearchProducts', {})
    }
    $(document).on('touch click', function (event) {
        if (!$(event.target).closest("#form-search").length) {
            if (typeof app == 'object') app.$store.dispatch('setSearchProducts', {})
        }
    });
}

// (function ($) {
//     $(document).ready(function () {
//         $('body').delegate('#form-search-field-query', 'keyup input', function (event) {
//             event.preventDefault()
//             let th = $(this)
//             if (typeof app == 'object') app.$store.dispatch('setSearchProducts', {})
//             clearTimeout(window.timeOutSearchForm)
//             window.timeOutSearchForm = setTimeout(function () {
//                 _search_post_data(th)
//             }, 500)
//         })
//         $('body').delegate('#form-search', 'submit', function (event) {
//             let th = $(this)
//             let inp = th.find('#form-search-field-query')
//             if (!inp.val()) {
//                 event.preventDefault()
//                 event.stopPropagation()
//                 inp.focus()
//             }
//         });
//     });
// })(jQuery)

