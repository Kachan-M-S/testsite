(function ($) {
    $(document).ready(function (e) {
        $('.uk-modal-close').click(function(){
            $('.uk-select2').val(null).trigger('change');
        });
        if (exist('.uk-block-main')) {
            $('.uk-select2').select2({
                width: '100%',
                // dropdownAutoWidth: true,
                // dropdownParent: '.uk-choose-select-2'
                // dropdownPosition: 'below',
                // dropdownPosition: 'above '
                language: {
                    noResults: function (params) {
                        return "Не знайдено результатів";
                    }
                }
            }).on('select2:select', function (e) {
                var data = parseInt(e.currentTarget.dataset.step);
                var next = parseInt(data) + 1;
                // var step = $('.uk-choose-item-1').data('step', 2);
                $('#uk-choose-item-' + next).addClass('uk-active');
                // $('#uk-choose-item-' + next).find('.uk-select2').select2('destroy');

                var step = $('select[data-step="' + next + '"]');
                $.ajax({
                    type: 'GET',
                    url: '/callback/get_garage_params',
                    data: {
                        id: e.params.data.id,
                        step: data,
                        text: e.params.data.text,
                    },
                    success: function (response) {
                        if (data == 1) {
                            $(response).each(function (a, b) {
                                var option = new Option(b['model_name'], b['id'], false, false);
                                step.append(option).trigger('change');
                            });
                        }
                        if (data == 2) {
                            let minYearFrom = Infinity;
                            let maxYearTo = -Infinity;
                            response.forEach(item => {
                                if (item.year_from < minYearFrom) {
                                    minYearFrom = item.year_from;
                                }
                                if (item.year_to > maxYearTo) {
                                    maxYearTo = item.year_to;
                                }
                            });
                            var years = [];
                            for (let year = minYearFrom; year <= maxYearTo; year++) {
                                years.push(year);
                            }
                            $(years).each(function (a, b) {
                                var option = new Option(b, b, false, false);
                                step.append(option).trigger('change');
                            });
                        }
                        if (data == 3) {
                            $(response).each(function (a, b) {
                                var option = new Option(b['engine_name_edit']+', '+b['ls']+' к.с./'+b['kvt']+'Kw', b['id'], false, false);
                                step.append(option).trigger('change');
                            });
                        }
                        console.log(data);
                        if (data == 4) {
                            window.location.href = '/oleus';
                        }
                    },
                    error: function (xhr, status, error) {

                    }
                });
            });
        }
        if (exist('#modal-add-garage')) {
            $('.uk-select2').select2({
                width: '100%',
                // dropdownAutoWidth: true,
                // dropdownParent: '.uk-choose-select-2'
                // dropdownPosition: 'below',
                // dropdownPosition: 'above '
                dropdownParent: '#modal-add-garage',

                language: {
                    noResults: function (params) {
                        return "Не знайдено результатів";
                    }
                }

            }).on('select2:select', function (e) {
                var data = parseInt(e.currentTarget.dataset.step);
                var next = parseInt(data) + 1;
                // var step = $('.uk-choose-item-1').data('step', 2);
                $('#uk-choose-item-' + next).addClass('uk-active');
                // $('#uk-choose-item-' + next).find('.uk-select2').select2('destroy');

                var step = $('select[data-step="' + next + '"]');
                $.ajax({
                    type: 'GET',
                    url: '/callback/get_garage_params',
                    data: {
                        id: e.params.data.id,
                        step: data,
                        text: e.params.data.text,
                    },
                    success: function (response) {
                        if (data == 1) {
                            $(response).each(function (a, b) {
                                var option = new Option(b['model_name'], b['id'], false, false);
                                step.append(option).trigger('change');
                            });
                        }
                        if (data == 2) {
                            let minYearFrom = Infinity;
                            let maxYearTo = -Infinity;
                            response.forEach(item => {
                                if (item.year_from < minYearFrom) {
                                    minYearFrom = item.year_from;
                                }
                                if (item.year_to > maxYearTo) {
                                    maxYearTo = item.year_to;
                                }
                            });
                            var years = [];
                            for (let year = minYearFrom; year <= maxYearTo; year++) {
                                years.push(year);
                            }
                            $(years).each(function (a, b) {
                                var option = new Option(b, b, false, false);
                                step.append(option).trigger('change');
                            });
                        }
                        if (data == 3) {
                            $(response).each(function (a, b) {
                                var option = new Option(b['engine_name_edit']+', '+b['ls']+' к.с./'+b['kvt']+'Kw', b['id'], false, false);
                                step.append(option).trigger('change');
                            });
                        }
                        if (data == 4) {
                            location.reload();
                        }
                    },
                    error: function (xhr, status, error) {

                    }
                });

            });
        }

        $('div[data-car-id]').click(function (e) {
            var id = $(this).data('carId');
            $.ajax({
                type: 'GET',
                url: '/callback/get_garage_params',
                data: {
                    id: id,
                    param: 'active',
                },
                success: function (response) {
                    if (response) {
                        location.reload();
                    }
                },
                error: function (xhr, status, error) {

                }
            });
        });

        $('button[data-del]').click(function (e) {
            var id = $(this).data('del');
            $.ajax({
                type: 'GET',
                url: '/callback/get_garage_params',
                data: {
                    id: id,
                    param: 'del',
                },
                success: function (response) {
                    if (response) {
                        location.reload();
                    }
                },
                error: function (xhr, status, error) {

                }
            });
        });

        // $('body').delegate('.uk-rate-field input[type="radio"]', 'click change', function (e) {
        //     $('#uk-radio-rate').removeClass();
        //     $_value = $(this).val();
        //     $('#uk-radio-rate').addClass('rate-' + $_value);
        // });


        if (exist('.uk-app-pc')) {
            var height_sticky = $('header').outerHeight();
            var height_window = $(window).height();
            var height_drop = height_window - height_sticky - 30;
            $('.uk-drop-catalog-list').css('max-height', height_drop);

            $('body').delegate('.uk-catalog-menu button', 'click', function (event) {
                if ($(this).parent('.uk-catalog-menu').hasClass('open')) {
                    $(this).parent('.uk-catalog-menu').removeClass('open');
                //     $('.uk-children-body').removeClass('uk-hover');
                } else {
                    $(this).parent('.uk-catalog-menu').addClass('open');
                    // var height_drop_catalog = $('.uk-drop-catalog').outerHeight() - 44;
                    // $('.uk-children-catalog-list').css('height', height_drop_catalog);
                }
                // return false;
            });

            $('body').delegate('.uk-drop-catalog-list .level-item-1', 'mouseover', function (event) {
                event.preventDefault();
                $('.uk-children-body, .uk-drop-catalog-list .level-item-1').removeClass('uk-hover');
                $_id = $(this).data('id');
                $(this).addClass('uk-hover');
                $('#uk-id-' + $_id).addClass('uk-hover');
                return false;
            });

            $(document).on("mouseup", function (e) {
                var container = $(".uk-catalog-menu");
                if (container.has(e.target).length === 0) {
                    container.removeClass('open');
                    $('.uk-children-body').removeClass('uk-hover');
                }
            });

        }

        UIkit.util.on('#uk-garage-cars', 'show', function () {
            $('.uk-garage-cars').addClass('uk-open uk-box-shadow');
        });

        UIkit.util.on('#uk-garage-cars', 'hide', function () {
            $('.uk-garage-cars').removeClass('uk-open uk-box-shadow');
        });

            usePhoneMask($);

        $(document).ajaxComplete(function (event, request, settings) {
            usePhoneMask($);
        });

    });
})(jQuery);

function exist($target) {
    var $ = jQuery;
    return $($target).length ? true : false
}

function usePhoneMask($) {
    if (exist('input.phone-mask, input.uk-phoneMask')) {
        $('input.phone-mask, input.uk-phoneMask').inputmask('+38(999) 999-9999');
    }
}



